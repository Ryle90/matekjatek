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
            <h3 className="mb-3">K??rlek, add meg a be??ll??t??sokat</h3>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="length">
                    <Form.Label>J??t??k hossz??s??ga</Form.Label>
                    <Form.Select
                        name="length"
                        onChange={handleChange}
                        defaultValue={data.length}
                    >
                        <option value="no-game">Hagyj??l m??r, nem ??rek r??</option>
                        <option value="super-short-length">Egyszer kipr??b??lom, de annyi</option>
                        <option value="short-length">R??vid j??t??kra v??gyom</option>
                        <option value="middle-length">K??zepesen hossz?? j??t??kra v??gyom</option>
                        <option value="length-length">Hossz?? j??t??kra v??gyom</option>
                        <option value="super-length">Eg??sz este r????rek</option>
                        <option value="full-game">Holnap is r????rek</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="difficulty">
                    <Form.Label>J??t??k neh??zs??ge</Form.Label>
                    <Form.Select
                        onChange={handleChange}
                        name="difficulty"
                        defaultValue={data.difficulty}
                    >
                        <option value="super-easy">Mindig is h??lye voltam matekb??l</option>
                        <option value="easy">Annyira nem voltam h??lye matekb??l</option>
                        <option value="hard-easy">El vagyok a matekkal</option>
                        <option value="easy-middle">Szorz??s, oszt??s is megy</option>
                        <option value="middle">Legyen kih??v??s, de az??rt annyira m??gse</option>
                        <option value="hard-middle">Matekkir??ly vagyok</option>
                        <option value="easy-hard">Kih??v??sra v??gyom</option>
                        <option value="hard">Vonzanak a magas sz??mok</option>
                        <option value="super-hard">??n vagyok a vil??g legjobb matekosa</option>
                    </Form.Select>
                </Form.Group>
                <Button onClick={saveSettings}>
                    Be??ll??t??sok ment??se
                </Button>
                <Link className="btn btn-warning" to="/">Visszat??r??s a f??men??be</Link>
            </Form>
            {hasSaved && 
                <Alert variant="success">
                    Be??ll??t??sok mentve
                </Alert>
            }
        </Container>
    )
}