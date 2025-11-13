import type { Tickstamp } from './time'

export type NewsEvent = {
    headline: string
    effect: () => void
}

export type EventLog = {
    message: string
    timestamp: Tickstamp
}
