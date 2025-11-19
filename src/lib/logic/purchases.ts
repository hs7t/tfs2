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
        name: 'Dohlwrop Simple Automator Machine',
        description:
            'A contraption that triggers fabrications periodically. Wonderful!',
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
    {
        id: 'alien',
        name: 'Tiny Green Creature',
        description: 'Definitely not an alien. Loves operating machinery.',
        currencyCost: 80,
        maxLevel: 10,
        effects: [], // todo
    },
    {
        id: 'refiner',
        name: 'TQ-1000 Enhanced Refining Module',
        description:
            'Extracts the B-particles in matter, improving fabrication efficiency. Is limited in the amount of matter it can handle.',
        currencyCost: 100,
        maxLevel: 2,
        effects: [], // todo
    },
    {
        id: 'bribe',
        name: 'Lobbying',
        description:
            'Gift an important person a beach vacation package. All-included!',
        currencyCost: 240,
        maxLevel: 1,
        effects: [], // todo
    },
    {
        id: 'sattelite',
        name: 'International Matter Increase Operation',
        description:
            "Fund the beaming of powerful rays that wear out the Earth's ozone layer in order to allow more tubip matter to enter.",
        currencyCost: 2100,
        maxLevel: 1,
        effects: [], // todo
    },
    {
        id: 'acquisition',
        name: 'Simuladorean Times Company',
        description:
            'A news conglomerate. Properties include The Simuladorean Times and the Concerned Citizen magazine.',
        currencyCost: 9910,
        maxLevel: 1,
        effects: [], // todo
    },
    {
        id: 'space',
        name: 'Space mission',
        description: 'Take yourself to space. Of no use, really, but fun.',
        currencyCost: 11320,
        maxLevel: 1000,
        effects: [], // yeah, does nothing
    },
]
