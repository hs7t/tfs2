import type { GameEffect, TubipProductionChangeGameAction } from './game'
import type { Tickstamp } from './time'

export type NewsUpdate = {
    headline: string
    effects: Array<GameEffect>
    tickstamp?: Tickstamp | undefined
}

export type HappeningLog = {
    message: string
    tickstamp: Tickstamp
}

export class NewsUpdateEvent extends Event {
    static readonly eventName = 'newsUpdate'

    readonly newsUpdate: NewsUpdate

    constructor(newsUpdate: NewsUpdate) {
        super(NewsUpdateEvent.eventName, { bubbles: true, composed: true })
        this.newsUpdate = newsUpdate
    }
}

type ConsumableNewsUpdate = NewsUpdate & {
    repeatable: boolean
    repetitionsLeft: number
}

export const GENERIC_CONSUMABLE_NEWS_UPDATES = [
    {
        headline: "Acclaimed human's tubip mention sparks purchasing craze",
        repeatable: true,
        repetitionsLeft: 10,
        effects: [
            {
                action: {
                    actionId: 'tubipProductionIncrease',
                    actionOptions: {
                        amount: 2,
                    },
                } as TubipProductionChangeGameAction,
                kind: 'modifier',
            },
        ],
    } as ConsumableNewsUpdate,
] as Array<ConsumableNewsUpdate>
