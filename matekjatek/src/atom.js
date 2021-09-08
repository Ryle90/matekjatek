import { atom } from 'recoil';

/*eslint-disable*/
const gameSettingState = atom({
    key: 'gameSettingState',
    default: {
        rounds: 15,
        ['number-of-operations']: 5,
        ['smallest-number']: 0,
        ['largest-number']: 100,
        possibleOperators: ['addition', 'subtraction', 'multiplication', 'division']  
    }
})
/*eslint-enable*/

const gamingDataState = atom({
    key: 'gamingDataState',
    default: {
        task: [],
        solution: '',
        rightSolution: null,
        isRightSolution: null,
        isSolved: false,
        actualRound: 1,
        rightAnswers: 0,
        isGameEnd: false,
        successIndicator: 0,
        messageToEndGameSuccessIndicator: ''
    }
})

const quickGameSettingState = atom({
    key: 'quickGameState',
    default: {
        length: 'middle-length',
        difficulty: 'middle'
    }
})

const isGamingState = atom({
    key: 'isGamingState',
    default: false
})

const isGameModalShowState = atom({
    key: 'isGameModalShowState',
    default: false
})

export { 
    gameSettingState, 
    gamingDataState, 
    quickGameSettingState, 
    isGamingState, 
    isGameModalShowState 
}