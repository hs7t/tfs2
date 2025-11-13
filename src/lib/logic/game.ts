import type { NewsEvent } from './news'
import type { Ticks } from './time'

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
    }
    currentState = {
        wealth: {
            currency: 0 as Currency,
            tubip: 0 as Tubip,
            matter: 10 as Matter,
        },
        economy: structuredClone(this.economy), // to be updated constantly and only by effects
        newsEvents: [] as Array<NewsEvent>,
    }
    effects = {
        modifiers: {} as Record<string, ModifierEffect>,
        schedules: {} as Record<string, ScheduleEffect>,
    }
}
