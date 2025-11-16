export const tryChance = (percentageThreshold: number) => {
    if (percentageThreshold > 100) percentageThreshold = 100
    if (percentageThreshold < 0) percentageThreshold = 0

    const randomPercentage = Math.random() * 100

    if (randomPercentage >= percentageThreshold) return true
    else return false
}
