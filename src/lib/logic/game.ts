type Currency = number
type Tubip = number
type Matter = number

class Game {
    currentState = {
        wealth: {
            currency: 0 as Currency,
            tubip: 0 as Tubip,
            matter: 10 as Number,
        },
    }
    economy = {
        rates: {
            tubip: {
                matter: 5,
                currency: 2,
            } as Record<keyof any, Tubip>,
            currency: {
                tubip: 1 / 2,
                matter: 0.5,
            } as Record<keyof any, Currency>,
            matter: {
                tubip: 1 / 5,
            } as Record<keyof any, Matter>,
        },
    }
}
