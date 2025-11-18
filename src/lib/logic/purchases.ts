import type { GameEffect, TubipGenerationGameAction } from './game.svelte'

export type ItemId = string

export type Item = {
    id: ItemId
    name: string
    description: string
    currencyCost: number
    maxLevel: number
    effects: Array<GameEffect>
}

export type ConsumableItem = Item & {
    currentLevel: number
}

export const ITEMS: Array<Item> = [
    {
        id: 'dohlwropAutomator',
        name: 'Dohlwrop Automator Machine',
        description: 'Derives tubip from thin air.',
        currencyCost: 20,
        maxLevel: 4,
        effects: [
            {
                kind: 'schedule',
                action: {
                    type: 'generate',
                    target: 'tubip',
                    actionOptions: {
                        amount: 3,
                    },
                } as TubipGenerationGameAction,
            },
        ],
    },
]
