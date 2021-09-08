export default function save (gameSetting, gamingData) {
    const gamePosition = {
        gameSetting,
        gamingData
    }

    localStorage.setItem('myMathGame', JSON.stringify(gamePosition))
}