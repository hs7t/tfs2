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
    let game = new Game()
    let oldGame = fetchObjectFromLocalStorage('game') as Game

    game.currentState = oldGame.currentState

    return game
}
