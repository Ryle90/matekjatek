import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { gameSettingState } from '../atom';

export default function GameSet() {

    const [gameSetting, setGameSetting] = useRecoilState(gameSettingState);

    const [data, setData] = useState(gameSetting);

    const [hasSaved, setHasSaved] = useState(false);

    const [checkboxData, setCheckboxData] = useState({
        all: false,
        addition: gameSetting.possibleOperators.includes('addition'),
        subtraction: gameSetting.possibleOperators.includes('subtraction'),
        multiplication: gameSetting.possibleOperators.includes('multiplication'),
        division: gameSetting.possibleOperators.includes('division')
    })

    function handleChange(event) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    function handleCheckboxChange(event) {
        if (event.target.name === 'all') {
            if (event.target.checked) {
                setCheckboxData({
                    all: true,
                    addition: true,
                    subtraction: true,
                    multiplication: true,
                    division: true
                })
            } else {
                setCheckboxData({
                    all: false,
                    addition: false,
                    subtraction: false,
                    multiplication: false,
                    division: false
                })
            }
        } else {
            setCheckboxData({
                ...checkboxData,
                [event.target.name]: event.target.checked,
                all: false
            })
        }

    }

    function handleValidation(event) {
        if (parseInt(event.target.value) < 1) {
            setData({
                ...data,
                [event.target.name]: 1
            })
        }
    }

    function validateSmallestAndLargestNumbers() {
        if (parseInt(data['smallest-number']) >= parseInt(data['largest-number']) - 5) {
            /* eslint-disable */
            setData({
                ...data,
                ['smallest-number']: 0,
                ['largest-number']: 100
            })
            /* eslint-enable */
        }
    }

    function saveSettings() {

        const possibleOperators = [];

        for (let [key, value] of Object.entries(checkboxData)) {
            if (key === 'all') {
                continue
            }
            if (value === true) {
                possibleOperators.push(key)
            }
        }

        if (possibleOperators.length > 0) {
            setGameSetting({
                ...data,
                possibleOperators
            })
        } else {
            setGameSetting({
                ...data,
                possibleOperators: ['addition']
            })
        }

        setHasSaved(true);

        setTimeout(() => {
            setHasSaved(false);
        }, 2000)
    }

    return (
        <Container className="mt-3">
            <h3>Kérlek, add meg a beállításokat</h3>
            <Form className="mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Ennyi kört szeretnék játszani</Form.Label>
                    <Form.Control
                        name="rounds"
                        type="number"
                        min="1"
                        value={data.rounds}
                        onChange={handleChange}
                        onBlur={handleValidation}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ennyi műveleti jel legyen egy játékban</Form.Label>
                    <Form.Control
                        name="number-of-operations"
                        type="number"
                        min="1"
                        value={data['number-of-operations']}
                        onChange={handleChange}
                        onBlur={handleValidation}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ez legyen a legkisebb szám</Form.Label>
                    <Form.Control
                        name="smallest-number"
                        type="number"
                        min="1"
                        value={data['smallest-number']}
                        onChange={handleChange}
                        onBlur={validateSmallestAndLargestNumbers}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ez legyen a legnagyobb szám (a két szám különbsége legyen nagyobb, mint 5)</Form.Label>
                    <Form.Control
                        name="largest-number"
                        type="number"
                        min="1"
                        value={data['largest-number']}
                        onChange={handleChange}
                        onBlur={validateSmallestAndLargestNumbers}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Válaszd ki, milyen műveleti jelek szerepeljenek a játékban (ha nem jelölsz be semmit, csak összeadás lesz)</Form.Label>
                    <Form.Check
                        className='mb-2 all-operation-checkbox'
                        checked={checkboxData.all}
                        type='checkbox'
                        id='all'
                        name='all'
                        label='Mindet kijelöl'
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        checked={checkboxData.addition}
                        type='checkbox'
                        id='addition'
                        name='addition'
                        label='Összeadás'
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        checked={checkboxData.subtraction}
                        type='checkbox'
                        id='subtraction'
                        name='subtraction'
                        label='Kivonás'
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        checked={checkboxData.multiplication}
                        type='checkbox'
                        id='multiplication'
                        name='multiplication'
                        label='Szorzás'
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        checked={checkboxData.division}
                        type='checkbox'
                        id='division'
                        name='division'
                        label='Osztás'
                        onChange={handleCheckboxChange}
                    />
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