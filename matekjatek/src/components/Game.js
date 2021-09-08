import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';

import { gameSettingState, gamingDataState, isGamingState } from '../atom';
import makeTask from '../utils/makeTask/makeTask';
import calculateSolution from '../utils/calculate/calculateSolution';

import Header from './Header';

export default function Game() {
    const gameSetting = useRecoilValue(gameSettingState);
    const [isGaming, setIsGaming] = useRecoilState(isGamingState);
    const [gamingData, setGamingData] = useRecoilState(gamingDataState);

    /* eslint-disable */
    useEffect(() => {
        if(gameSetting.rounds !== 0) {
            setGamingData({
                ...gamingData,
                isGameEnd: false
            })
            setIsGaming(true);
            getTask()
        }
    }, [])
    /* eslint-enable */

    const references = {
        solutionInputRef: useRef()
    }

    function getTask() {
        const task = makeTask(gameSetting['number-of-operations'], gameSetting['smallest-number'], gameSetting['largest-number'], gameSetting.possibleOperators);
        setGamingData({
            ...gamingData,
            task,
            solution: '',
            rightSolution: null,
            isRightSolution: null,
            isSolved: false
        })
    }

    function handleChange(event) {
        setGamingData({
            ...gamingData,
            [event.target.name]: event.target.value
        })
    }

    function checkSolution() {
        const rightSolution = calculateSolution(gamingData.task);
        const playerSolution = Number(gamingData.solution);
        const isGameEnd = checkIsGameEnd();

        if (rightSolution === playerSolution) {
            setGamingData({
                ...gamingData,
                rightSolution,
                isRightSolution: true,
                isSolved: true,
                isGameEnd
            })
        } else {
            setGamingData({
                ...gamingData,
                rightSolution,
                isRightSolution: false,
                isSolved: true,
                isGameEnd
            })
        }

    }

    function checkIsGameEnd() {
        return gamingData.actualRound === Number(gameSetting.rounds)
    }

    function handleNextTask() {
        references.solutionInputRef.current.value = '';

        const rightAnswers = calculateValueOfRightAnswers();

        getTask();

        setGamingData((prevGamingData) => ({
            ...prevGamingData,
            rightAnswers,
            actualRound: prevGamingData.actualRound + 1
        }))
    }

    function calculateValueOfRightAnswers() {
        if (gamingData.isRightSolution) {
            return gamingData.rightAnswers + 1
        } else {
            return gamingData.rightAnswers
        }
    }

    function handleEndGame() {
        const rightAnswers = calculateValueOfRightAnswers();
        const successIndicator = calculateSuccessIndicator(rightAnswers);
        const messageToEndGameSuccessIndicator = getMessageToEndGameSuccessIndicator(successIndicator);

        setGamingData({
            ...gamingData,
            task: [],
            rightAnswers,
            isGameEnd: true,
            successIndicator,
            messageToEndGameSuccessIndicator
        })

        setIsGaming(false)
    }

    function calculateSuccessIndicator(rightAnswers) {
        return Math.round(100 / gamingData.actualRound * rightAnswers)
    }

    function getMessageToEndGameSuccessIndicator(successIndicator) {
        if (successIndicator < 20) {
            return 'Még sokat kell gyakorolnod a számolást'
        }
        if (successIndicator >= 20 && successIndicator < 40) {
            return 'Egy kis gyakorlással jobb lesz ez'
        }
        if (successIndicator >= 40 && successIndicator < 60) {
            return 'Egész jó, közepes szintű matektudás'
        }
        if (successIndicator >= 60 && successIndicator < 80) {
            return 'Nagyon szép eredmény, jól számolsz fejben'
        }
        if (successIndicator >= 80 && successIndicator < 100) {
            return 'Igazán tehetséges fejszámoló vagy'
        }
        if (successIndicator === 100) {
            return 'Hibátlan számolás, szép volt'
        }
    }

    function startNewGame() {
        localStorage.clear();

        setIsGaming(true);
        getTask();

        setGamingData((prevGamingData) => ({
            ...prevGamingData,
            actualRound: 1,
            rightAnswers: 0,
            isGameEnd: false,
            successIndicator: 0,
            messageToEndGameSuccessIndicator: ''
        }))

    }

    return (
        <Container className="mt-3">
            {gameSetting.rounds !== 0 &&
                <>

                    <Header
                        handleNextTask={handleNextTask}
                        handleEndGame={handleEndGame}
                        checkIsGameEnd={checkIsGameEnd}
                    />
                    {isGaming &&
                        <>
                            <h3 className="under-header">Jó számolást ;)</h3>
                            <div className="task mt-5 mb-3">
                                {gamingData.task.map((operatorAndNumber, index) => (
                                    <div key={index}>
                                        <p>{operatorAndNumber.operator}</p>
                                        <p>{operatorAndNumber.number.toLocaleString()}</p>
                                    </div>
                                ))}
                                <p>=</p>
                                <input
                                    ref={references.solutionInputRef}
                                    disabled={gamingData.isSolved}
                                    type="number"
                                    className="form-control"
                                    value={gamingData.solution}
                                    name="solution"
                                    placeholder="?"
                                    onChange={handleChange}
                                />
                                <Button
                                    disabled={gamingData.isSolved}
                                    onClick={checkSolution}

                                >
                                    Ellenőrzés
                                </Button>
                            </div>
                            {gamingData.isSolved &&
                                <>
                                    <Alert
                                        variant={gamingData.isRightSolution ? 'success' : 'danger'}
                                    >
                                        {gamingData.isRightSolution
                                            ? 'Jó a megoldásod :)'
                                            : `Nem jó a megoldásod. A helyes megoldás: ${gamingData.rightSolution}`
                                        }
                                    </Alert>
                                    {!gamingData.isGameEnd &&
                                        <Button variant='success' onClick={handleNextTask}>Tovább</Button>
                                    }
                                    {gamingData.isGameEnd &&
                                        <Button variant='success' onClick={handleEndGame}>Játék vége, eredmények megtekintése</Button>
                                    }
                                </>
                            }
                        </>
                    }
                    {!isGaming &&
                        <div className="game-end-results under-header">
                            <p className="end-game-text">Játék vége :)</p>
                            <p className="rounds-text"><span className="rounds-text-inner">{gamingData.rightAnswers}/{gamingData.actualRound}</span> helyes válasz</p>
                            <p className="success-indicator-text">Eredményességi mutató: <span className="success-indicator-text-inner">{gamingData.successIndicator}%</span></p>
                            <p className="message-to-indicator-text">{gamingData.messageToEndGameSuccessIndicator}</p>
                            <Button onClick={startNewGame}>Új játék</Button>
                            <Link className="btn btn-success" to="/">Visszalépés a főmenübe</Link>
                        </div>
                    }
                </>
            }
            {gameSetting.rounds === 0 &&
                <>
                    <Alert variant="success">
                        Sajnálom, hogy nincs időd játszani a játékkal :(
                    </Alert>
                    <Link className="btn btn-warning" to="/">Vissza a főmenübe</Link>
                </>
            }
        </Container>
    )
}