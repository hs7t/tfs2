import type { GameEffect } from './game.svelte'

export type ItemId = string

export type Item = {
    id: ItemId
    name: string
    description: string
    currencyCost: number
    maxLevel: number
    effects: GameEffect
}
