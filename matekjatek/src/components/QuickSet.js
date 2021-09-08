import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { gameSettingState, quickGameSettingState } from '../atom';

export default function QuickSet() {
    const [quickGameSetting, setQuickGameSetting] = useRecoilState(quickGameSettingState);
    const setGameSetting = useSetRecoilState(gameSettingState);

    const [data, setData] = useState(quickGameSetting);

    const [hasSaved, setHasSaved] = useState(false);

    function handleChange(event) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    function saveSettings() {
        const rounds = getNumberOfRounds(data.length);
        const difficultyValues = getDetailedDifficultyValues(data.difficulty);

        setQuickGameSetting(data);
        /*eslint-disable*/
        setGameSetting({
            rounds,
            ['number-of-operations']: difficultyValues.numberOfOperators,
            ['smallest-number']: 0,
            ['largest-number']: difficultyValues.max,
            possibleOperators: difficultyValues.possibleOperators
        })
        /*eslint-enable*/

        setHasSaved(true);

        setTimeout(() => {
            setHasSaved(false);
        }, 2000)
    }

    function getNumberOfRounds(length) {
        switch (length) {
            case 'no-game':
                return 0;
            case 'super-short-length':
                return 1;
            case 'short-length':
                return 5;
            case 'middle-length':
                return 15;
            case 'length-length':
                return 25;
            case 'super-length':
                return 50;
            case 'full-game':
                return 100;
            default:
                return 15
        }
    }

    function getDetailedDifficultyValues(difficulty) {
        let max;
        let possibleOperators;
        let numberOfOperators;

        if (difficulty === 'super-easy') {
            max = 10;
            possibleOperators = ['addition'];
            numberOfOperators = 1;
        }

        if (difficulty === 'easy') {
            max = 10;
            possibleOperators = ['addition', 'subtraction']
            numberOfOperators = 1;
        }

        if (difficulty === 'hard-easy') {
            max = 100;
            possibleOperators = ['addition', 'subtraction'];
            numberOfOperators = 1;
        }

        if (difficulty === 'easy-middle') {
            max = 100;
            possibleOperators = ['addition', 'subtraction', 'multiplication', 'division'];
            numberOfOperators = 1;
        }

        if (difficulty === 'middle') {
            max = 100;
            possibleOperators = ['addition', 'subtraction', 'multiplication', 'division'];
            numberOfOperators = 5;
        }

        if (difficulty === 'hard-middle') {
            max = 1000;
            possibleOperators = ['addition', 'subtraction', 'multiplication', 'division'];
            numberOfOperators = 5;
        }

        if (difficulty === 'easy-hard') {
            max = 1000;
            possibleOperators = ['addition', 'subtraction', 'multiplication', 'division'];
            numberOfOperators = 10;
        }

        if (difficulty === 'hard') {
            max = 10000;
            possibleOperators = ['addition', 'subtraction', 'multiplication', 'division'];
            numberOfOperators = 10;
        }

        if (difficulty === 'super-hard') {
            max = 20000;
            possibleOperators = ['addition', 'subtraction', 'multiplication', 'division'];
            numberOfOperators = 15;
        }

        return {
            max,
            possibleOperators,
            numberOfOperators
        }
    }

    return (
        <Container className="mt-3">
            <h3 className="mb-3">Kérlek, add meg a beállításokat</h3>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="length">
                    <Form.Label>Játék hosszúsága</Form.Label>
                    <Form.Select
                        name="length"
                        onChange={handleChange}
                        defaultValue={data.length}
                    >
                        <option value="no-game">Hagyjál már, nem érek rá</option>
                        <option value="super-short-length">Egyszer kipróbálom, de annyi</option>
                        <option value="short-length">Rövid játékra vágyom</option>
                        <option value="middle-length">Közepesen hosszú játékra vágyom</option>
                        <option value="length-length">Hosszú játékra vágyom</option>
                        <option value="super-length">Egész este ráérek</option>
                        <option value="full-game">Holnap is ráérek</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="difficulty">
                    <Form.Label>Játék nehézsége</Form.Label>
                    <Form.Select
                        onChange={handleChange}
                        name="difficulty"
                        defaultValue={data.difficulty}
                    >
                        <option value="super-easy">Mindig is hülye voltam matekból</option>
                        <option value="easy">Annyira nem voltam hülye matekból</option>
                        <option value="hard-easy">El vagyok a matekkal</option>
                        <option value="easy-middle">Szorzás, osztás is megy</option>
                        <option value="middle">Legyen kihívás, de azért annyira mégse</option>
                        <option value="hard-middle">Matekkirály vagyok</option>
                        <option value="easy-hard">Kihívásra vágyom</option>
                        <option value="hard">Vonzanak a magas számok</option>
                        <option value="super-hard">Én vagyok a világ legjobb matekosa</option>
                    </Form.Select>
                </Form.Group>
                <Button onClick={saveSettings}>
                    Beállítások mentése
                </Button>
                <Link className="btn btn-warning" to="/">Visszatérés a főmenübe</Link>
            </Form>
            {hasSaved && 
                <Alert variant="success">
                    Beállítások mentve
                </Alert>
            }
        </Container>
    )
}