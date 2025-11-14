import type { HappeningLog, NewsUpdate } from './happenings'
import { fetchGame, saveGame } from './storage'
import type { Milliseconds, Ticks, Tickstamp } from './time'

type Currency = number
type Tubip = number
type Matter = number

class GameEvents extends EventTarget {}
export const gameEvents = new GameEvents()

export type GameAction = {
    actionId: GameActionId
    actionOptions: object | undefined
}

type GameActionId = 'tubipProductionIncrease' | 'matterDerivationDecrease'

type TubipProductionIncreaseGameAction = GameAction & {
    actionId: 'tubipProductionIncrease'
    actionOptions: {
        amount: number
    }
}

type AmbientMatterDerivationDecrease = GameAction & {
    actionId: 'matterDerivationDecrease'
    actionOptions: {
        amount: number
    }
}

type Effect = {
    action: GameAction
    lingering?: undefined | Ticks // ticks this is lingering for
    cadence?: undefined | Ticks
}

type ModifierEffect = Effect & {
    /* 
    Modifiers alter certain numbers, like 
    production qts., exchange rates, or entropy
    forever or for an amount of ticks. 
    */
}

type ScheduleEffect = Effect & {
    /* 
    Actions in schedules are run every n ticks
    */

    cadence: Ticks // how often to run
}

type EventListenersItem = {
    type: string
    function: (e: Event | any) => void
}

class Game {
    economy = {
        rates: {
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
        },
        production: {
            perTick: {
                tubip: 0 as Tubip,
                matter: 10 as Matter,
            },
            perFabrication: {
                tubip: 1 as Tubip,
                matter: 0 as Matter,
            },
        },
        disorder: 0.5, // randomness of prices and whatnot
    }
    currentState = {
        wealth: {
            currency: 0 as Currency,
            tubip: 0 as Tubip,
            matter: 10 as Matter,
        },

        economy: structuredClone(this.economy), // to be updated constantly and only by effects
        effects: {
            modifiers: {} as Array<ModifierEffect>,
            schedules: {} as Array<ScheduleEffect>,
        },

        newsUpdates: [] as Array<NewsUpdate>,
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

    private runAction = (action: GameAction) => {
        if (action.actionId == 'tubipProductionIncrease') {
            const actionInfo = action as TubipProductionIncreaseGameAction
            this.currentState.economy.production.perTick.tubip +=
                actionInfo.actionOptions.amount
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
                        Runs this.currentState.effects on every tick
                    */

                    const runEffects = (effects: Array<Effect>) => {
                        for (let effect of effects) {
                            this.runAction(effect.action)
                        }
                    }

                    const getApplicableEffects = (effects: Array<Effect>) => {
                        let result = []
                        for (let effect of effects) {
                            if (!(effect?.lingering == 0)) {
                                break
                            }
                            if (
                                effect.cadence &&
                                effect.cadence %
                                    this.currentState.ticksElapsed !=
                                    0
                            ) {
                                break
                            }

                            result.push(effect)
                        }
                    }

                    const applicableEffects = Array.prototype.concat(
                        getApplicableEffects(
                            this.currentState.effects.modifiers,
                        ),
                        getApplicableEffects(
                            this.currentState.effects.schedules,
                        ),
                    )

                    runEffects(applicableEffects)
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
