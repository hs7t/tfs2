import { gameEvents } from '$lib/logic/game'
import { fetchGame } from '$lib/logic/storage'

let game = fetchGame()

export { game, gameEvents }
