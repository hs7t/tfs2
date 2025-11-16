import { Game, type GameType } from './game'

const fetchObjectFromLocalStorage = (id: string) => {
    const fetchedJSON = localStorage.getItem(id)

    if (fetchedJSON == null) {
        return undefined
    }

    return JSON.parse(fetchedJSON)
}

const saveObjectToLocalStorage = (obj: object, id: string) => {
    return localStorage.setItem(id, JSON.stringify(obj))
}

export const saveGame = (game: GameType) => {
    saveObjectToLocalStorage(game, 'game')
}
export const fetchGame = () => {
    const oldGame = fetchObjectFromLocalStorage('game') as Game
    const game = new Game()

    game.currentState.wealth = oldGame.currentState.wealth
    game.currentState.ticksElapsed = oldGame.currentState.ticksElapsed

    for (const effect of oldGame.currentState.effects.modifiers) {
        game.currentState.effects.register(effect)
    }
    for (const effect of oldGame.currentState.effects.schedules) {
        game.currentState.effects.register(effect)
    }

    game.currentState.news.updates = oldGame.currentState.news.updates
    game.currentState.news.availableNews =
        oldGame.currentState.news.availableNews

    return game
}
