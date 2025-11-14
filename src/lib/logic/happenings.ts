import type { GameAction } from './game'
import type { Tickstamp } from './time'

export type NewsUpdate = {
    headline: string
    effects: Array<GameAction>
    tickstamp: Tickstamp | undefined
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
