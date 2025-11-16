import {
    gameEvents,
    type GameEffect,
    type TubipProductionChangeGameAction,
} from './game'
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
                    actionId: 'tubipProductionChange',
                    actionOptions: {
                        amount: 2,
                    },
                } as TubipProductionChangeGameAction,
                kind: 'modifier',
            },
        ],
    } as ConsumableNewsUpdate,
] as Array<ConsumableNewsUpdate>

export class NewsManager {
    private availableNews: Array<ConsumableNewsUpdate> = [
        ...GENERIC_CONSUMABLE_NEWS_UPDATES,
    ]

    readonly updates: Array<NewsUpdate> = []

    consumeRandom = (): ConsumableNewsUpdate => {
        let currentIndex = Math.floor(Math.random() * this.availableNews.length)
        let randomEntry = this.availableNews[currentIndex]

        const entryHasepetitionsLeft =
            randomEntry.repetitionsLeft == undefined ||
            randomEntry.repetitionsLeft > 0

        if (!randomEntry.repeatable) {
            return this.consumeRandom()
        }
        if (!entryHasepetitionsLeft) {
            return this.consumeRandom()
        }

        return randomEntry
    }

    update = (update: NewsUpdate) => {
        this.updates.push(update)
        gameEvents.dispatchEvent(new NewsUpdateEvent(update))
    }
}
