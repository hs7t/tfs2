export const tryChance = (percentageThreshold: number) => {
    if (percentageThreshold > 100) percentageThreshold = 100
    if (percentageThreshold < 0) percentageThreshold = 0

    const randomPercentage = Math.random() * 100

    if (randomPercentage >= percentageThreshold) return true
    else return false
}

export const deviateNumberWithFactor = (num: number, factor: number) => {
    const deviation = (Math.random() * 2 - 1) * factor

    return num + deviation
}

export const calculateConversion = (units: number, valuePerUnit: number) => {
    return units * valuePerUnit
}