import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';

import { isGamingState, gameSettingState, gamingDataState } from '../atom';
import load from '../utils/saveAndLoadGame/load';

export default function MainMenu() {
    const history = useHistory();

    const setIsGaming = useSetRecoilState(isGamingState);
    const setGameSetting = useSetRecoilState(gameSettingState);
    const setGamingData = useSetRecoilState(gamingDataState);

    const [hasNoSavedGame, setHasNoSavedGame] = useState(false);

    function startGame() {
        localStorage.clear();

        setIsGaming(true);

        history.push('/game')

    }

    function handleLoad() {
        let isSavedGame = true;

        if (localStorage.getItem('myMathGame') === null) {
            isSavedGame = false;
        }

        if (!isSavedGame) {
            setHasNoSavedGame(true);
            setTimeout(() => {
                setHasNoSavedGame(false);
            }, 2000);

            return
        }

        load(setGameSetting, setGamingData);

        setIsGaming(true);


        setTimeout(() => {
            history.push('/game');
        }, 0)
    }

    return (
        <Container className='main-menu'>
            <h3>Matekjáték</h3>
            <div className="main-menu-button-group">
                <Button onClick={startGame}>Új játék indítása</Button>
                <Link className="btn btn-warning" to="/quickset">Gyorsbeállítások</Link>
                <Link className="btn btn-warning" to="/gameset">Egyéni beállítások</Link>
                <Button variant="success" onClick={handleLoad}>Mentett játék betöltése</Button>
            </div>
            {hasNoSavedGame &&
                <Alert className="mb-3" variant="danger">
                    Nincs mentett játékod
                </Alert>
            }
        </Container>
    )
}