import type { Tickstamp } from './time'

export type NewsHappening = {
    headline: string
    effect: () => void
    tickstamp: Tickstamp | undefined
}

export type HappeningLog = {
    message: string
    tickstamp: Tickstamp
}
