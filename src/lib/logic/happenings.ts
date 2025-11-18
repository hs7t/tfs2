import {
    gameEvents,
    type GameAction,
    type GameActionTarget,
    type GameActionType,
    type GameEffect,
    type TubipProductionChangeGameAction,
} from './game.svelte'
import type { Tickstamp } from './time'

export type NewsUpdate = {
    headline: string
    effects: Array<GameEffect>
    maxRepetitions: number
    tickstamp?: Tickstamp | undefined
}

export type HappeningLog = {
    actionTarget: GameActionTarget
    actionType: GameActionType | undefined
    factor?: number
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
    repetitions: number
}

export const GENERIC_NEWS_UPDATES: Array<NewsUpdate> = [
    {
        headline: "Acclaimed human's tubip mention sparks purchasing craze",
        maxRepetitions: 5,
        effects: [
            {
                action: {
                    target: 'tubipProduction',
                    type: 'change',
                    actionOptions: {
                        amount: 2,
                    },
                } as TubipProductionChangeGameAction,
                kind: 'modifier',
            },
        ],
    } as NewsUpdate,
]

const newsUpdatesToConsumable = (
    newsUpdates: NewsUpdate[],
): ConsumableNewsUpdate[] => {
    let result: ConsumableNewsUpdate[] = []

    for (const update of newsUpdates) {
        const consumableUpdate: ConsumableNewsUpdate = {
            ...update,
            repetitions: 0,
        }
        result.push(consumableUpdate)
    }

    return result
}

export class NewsManager {
    availableNews: Array<ConsumableNewsUpdate> = [
        ...newsUpdatesToConsumable(GENERIC_NEWS_UPDATES),
    ]

    updates: Array<NewsUpdate> = []

    consumeRandom = (): ConsumableNewsUpdate => {
        let currentIndex = Math.floor(Math.random() * this.availableNews.length)
        let randomEntry = this.availableNews[currentIndex]

        let repetitionsLeft: boolean

        if (randomEntry.maxRepetitions == undefined) {
            repetitionsLeft = true
        } else if (randomEntry.maxRepetitions - randomEntry.repetitions <= 0) {
            repetitionsLeft = false
        } else {
            repetitionsLeft = true
        }

        if (!repetitionsLeft) {
            return this.consumeRandom()
        }

        randomEntry.repetitions += 1
        return randomEntry
    }

    update = (update: NewsUpdate) => {
        this.updates.push(update)
        console.info('Dispatched new update')
        gameEvents.dispatchEvent(new NewsUpdateEvent(update))
    }
}
