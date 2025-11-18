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

    updates: Array<NewsUpdate> = $state([])

    consumeRandom = (): ConsumableNewsUpdate | undefined => {
        if (this.availableNews.length == 0) return undefined

        let currentIndex = Math.floor(Math.random() * this.availableNews.length)
        let currentEntry = this.availableNews[currentIndex]

        let result: ConsumableNewsUpdate

        const hasRepetitions = (entry: typeof currentEntry | undefined) => {
            if (entry == undefined) return false

            if (entry.maxRepetitions == undefined) {
                return true
            } else if (
                currentEntry.maxRepetitions - currentEntry.repetitions <=
                0
            ) {
                return false
            } else {
                return true
            }
        }

        if (!hasRepetitions(currentEntry)) {
            return this.consumeRandom()
        }

        currentEntry.repetitions += 1
        result = currentEntry

        if (!hasRepetitions(currentEntry)) {
            this.availableNews.splice(currentIndex)
        }
        return result
    }

    update = (update: NewsUpdate | undefined) => {
        if (update == undefined) return

        this.updates = [...this.updates, update]
        gameEvents.dispatchEvent(new NewsUpdateEvent(update))
    }
}
