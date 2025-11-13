import type { GameType } from './game'

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
    localStorage.setItem('game', JSON.stringify(game))
}

export const fetchGame = () => {
    return fetchObjectFromLocalStorage('game')
}
