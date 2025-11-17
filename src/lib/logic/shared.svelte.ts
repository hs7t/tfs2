import { gameEvents } from '$lib/logic/game.svelte'
import { fetchGame } from '$lib/logic/storage'
import type { Game } from '$lib/logic/game.svelte'

let game = $state({
    current: undefined as Game | undefined,
})

class AppEvents extends EventTarget {}
let appEvents = new AppEvents()
let MainMountedEvent = new Event('mainMounted')

appEvents.addEventListener('mainMounted', () => {
    game.current = fetchGame()
})

export { gameEvents, game, appEvents, MainMountedEvent }
export type { Game }
