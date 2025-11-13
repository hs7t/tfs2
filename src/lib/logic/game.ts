import type { HappeningLog, NewsHappening } from './happenings'
import type { Milliseconds, Ticks, Tickstamp } from './time'

type Currency = number
type Tubip = number
type Matter = number

type ModifierEffect = {
    /* 
    Modifiers alter certain numbers, like 
    production qts., exchange rates, or entropy
    forever or for an amount of ticks. 
    */

    action: () => void // runner for a modification or a series of them
    lingering: undefined | Ticks // ticks this is lingering for
}

type ScheduleEffect = {
    /* 
    Actions in schedules are run every n ticks
    */

    action: () => void // an action
    cadence: Ticks // how often to run
    lingering: undefined | Ticks // ticks this is lingering for
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
        newsHappenings: [] as Array<NewsHappening>,
        happeningLogs: [] as Array<HappeningLog>,
        ticksElapsed: 0 as Ticks, // +1 on every tick
    }
    effects = {
        modifiers: {} as Record<string, ModifierEffect>,
        schedules: {} as Record<string, ScheduleEffect>,
    }

    private tickInterval?: ReturnType<typeof setInterval>
    private tickFrequency = 3000 as Milliseconds

    ticking = {
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

    start = () => {
        this.ticking.start()
    }
    stop = () => {
        this.ticking.end()
    }
}

export type GameType = InstanceType<typeof Game>

class GameEvents extends EventTarget {}

export class TickEvent extends Event {
    static readonly eventName = 'tick'

    readonly tickstamp: Tickstamp

    constructor(tickstamp: Tickstamp) {
        super(TickEvent.eventName, { bubbles: true, composed: true })
        this.tickstamp = tickstamp
    }
}

export const gameEvents = new GameEvents()
