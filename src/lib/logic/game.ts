import {
    NewsManager,
    type HappeningLog,
    type NewsUpdateEvent,
} from './happenings'
import { fetchGame, saveGame } from './storage'
import type { Milliseconds, Ticks, Tickstamp } from './time'
import { tryChance } from './utilities'

type Currency = number
type Tubip = number
type Matter = number

class GameEvents extends EventTarget {}
export const gameEvents = new GameEvents()

export type GameAction = {
    type: GameActionType
    target: GameActionTarget
    actionOptions?: Record<string, unknown>
}

export type GameActionTarget = 'tubipProduction' | 'matterDerivation'
export type GameActionType = 'change'

export type TubipProductionChangeGameAction = GameAction & {
    actionId: 'change'
    actionTarget: 'tubipProduction'
    actionOptions: {
        amount: number
    }
}

export type MatterDerivationChangeGameAction = GameAction & {
    actionId: 'change'
    actionTarget: 'matterDerivation'
    actionOptions: {
        amount: number
    }
}

export type GameEffect = {
    action: GameAction
    lingering?: undefined | Ticks // ticks this is lingering for
    cadence?: undefined | Ticks
    kind: 'modifier' | 'schedule'
}

type ModifierGameEffect = GameEffect & {
    /* 
    Modifiers alter certain numbers, like 
    production qts., exchange rates, or entropy
    forever or for an amount of ticks. 
    */
    kind: 'modifier'
}

type ScheduleGameEffect = GameEffect & {
    /* 
    Actions in schedules are run every n ticks
    */

    kind: 'schedule'
    cadence: Ticks // how often to run
}

type EventListenersItem = {
    type: string
    function: (e: Event | any) => void
}

class GameEconomy {
    rates = {
        // in x, how many y?
        tubip: {
            matter: 5,
            currency: 2,
        } as Record<keyof any, Tubip>,
        currency: {
            tubip: 1 / 2,
        } as Record<keyof any, Currency>,
        matter: {
            tubip: 1 / 5,
        } as Record<keyof any, Matter>,
    }
    production = {
        perTick: {
            tubip: 0 as Tubip,
            matter: 10 as Matter,
        },
        perFabrication: {
            tubip: 1 as Tubip,
            matter: 0 as Matter,
        },
    }
    controls = {
        deviationFactor: 0.5, // randomness of prices and whatnot
    }
}

class GameEffects {
    modifiers = [] as Array<ModifierGameEffect>
    schedules = [] as Array<ScheduleGameEffect>

    register = (effect: GameEffect) => {
        switch (effect.kind) {
            case 'modifier':
                this.modifiers.push(effect as ModifierGameEffect)
                break
            case 'schedule':
                this.schedules.push(effect as ScheduleGameEffect)
                break
        }
    }

    getAll = () => {
        return [...this.modifiers, ...this.schedules]
    }

    getApplicable = () => {
        let result = []
        for (let effect of this.getAll()) {
            if (effect.lingering !== undefined && effect.lingering <= 0) {
                continue
            }
            if (
                effect.cadence &&
                game.currentState.ticksElapsed % effect.cadence != 0
            ) {
                continue
            }

            result.push(effect)
        }
        return result
    }
}

export class Game {
    currentState = {
        wealth: {
            currency: 0 as Currency,
            tubip: 0 as Tubip,
            matter: 10 as Matter,
        },

        economy: new GameEconomy(), // to be updated constantly and only by effects
        effects: new GameEffects(),

        news: new NewsManager(),
        happeningLogs: [] as Array<HappeningLog>,
        ticksElapsed: 0 as Ticks, // +1 on every tick
    }

    private tickInterval?: ReturnType<typeof setInterval>
    private tickFrequency = 3000 as Milliseconds

    private ticking = {
        start: () => {
            this.tickInterval = setInterval(() => {
                this.currentState.ticksElapsed += 1
                gameEvents.dispatchEvent(
                    new TickEvent(this.currentState.ticksElapsed),
                )
            }, this.tickFrequency)
        },
        end: () => {
            clearInterval(this.tickInterval)
        },
    }

    private runAction = (action: GameAction, logging: boolean = true) => {
        let happeningDetails = {
            actionTarget: action.target,
            actionType: action.type,
            tickstamp: this.currentState.ticksElapsed,
        } as HappeningLog

        if (action.type == 'change' && action.target == 'tubipProduction') {
            const actionInfo = action as TubipProductionChangeGameAction
            this.currentState.economy.production.perTick.tubip +=
                actionInfo.actionOptions.amount

            happeningDetails['factor'] = actionInfo.actionOptions.amount
        }

        if (logging == true) {
            this.currentState.happeningLogs.push(happeningDetails)
        }
    }

    private runEffects = (effects: Array<GameEffect>) => {
        for (let effect of effects) {
            this.runAction(effect.action)
        }
    }

    private eventListeners: Array<EventListenersItem> = []

    start = () => {
        this.ticking.start()

        this.eventListeners.push(
            {
                type: 'tick',
                function: (e) => {
                    let eventDetails = e as TickEvent

                    if (eventDetails.tickstamp % 3 == 0) {
                        // every three ticks
                        saveGame(this) // save game
                    }
                },
            },
            {
                type: 'tick',
                function: () => {
                    /*
                        Resets the economy and runs applicable effects on every tick
                    */

                    this.currentState.economy = new GameEconomy()
                    this.runEffects(this.currentState.effects.getApplicable())
                },
            },
            {
                type: 'tick',
                function: () => {
                    const isLuckyTick = tryChance(30) == true

                    if (isLuckyTick) {
                        this.currentState.news.update(
                            this.currentState.news.consumeRandom(),
                        )
                    }
                },
            },
            {
                type: 'newsUpdate',
                function: (e: NewsUpdateEvent) => {
                    for (const effect of e.newsUpdate.effects) {
                        this.currentState.effects.register(effect)
                    }
                },
            },
        )

        for (let item of this.eventListeners) {
            gameEvents.addEventListener(item.type, item.function)
        }
    }

    stop = () => {
        this.ticking.end()

        for (let item of this.eventListeners) {
            gameEvents.removeEventListener(item.type, item.function)
        }

        saveGame(this)
    }
}

const getGame = () => {
    const saved = fetchGame()

    if (saved == undefined) return new Game()
    else return saved
}

export type GameType = InstanceType<typeof Game>

export class TickEvent extends Event {
    static readonly eventName = 'tick'

    readonly tickstamp: Tickstamp

    constructor(tickstamp: Tickstamp) {
        super(TickEvent.eventName, { bubbles: true, composed: true })
        this.tickstamp = tickstamp
    }
}

export let game = getGame()
