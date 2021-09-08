export default function load (setGameSetting, setGamingData) {
    const gamePosition = JSON.parse(localStorage.getItem('myMathGame'));
    
    setGameSetting(gamePosition.gameSetting);
    setGamingData(gamePosition.gamingData);
}