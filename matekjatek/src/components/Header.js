import { useState } from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { gameSettingState, gamingDataState, isGamingState, isGameModalShowState } from '../atom';
import GameModal from './GameModal';
import save from '../utils/saveAndLoadGame/save';

export default function Header(props) {
    const { handleNextTask, handleEndGame, checkIsGameEnd } = props;

    const isGaming = useRecoilValue(isGamingState);
    const gameSetting = useRecoilValue(gameSettingState);
    const gamingData = useRecoilValue(gamingDataState);
    const setIsGameModalShow = useSetRecoilState(isGameModalShowState);
    const [operationForModal, setOperationForModal] = useState('');

    const [hasSaved, setHasSaved] = useState(false);

    function showModal() {
        setIsGameModalShow(true)
    }

    function giveUp() {
        setOperationForModal('give-up')
        showModal()
    }

    function endGame() {
        setOperationForModal('end-game')
        showModal()
    }

    function handleSave() {
        save(gameSetting, gamingData);
        
        setHasSaved(true);
        setTimeout(() => {
            setHasSaved(false)
        }, 2000)
    }

    return (
        <header className='gaming-header'>
            <div className="infos">
                <p>Kör: <span className="info-numbers">{gamingData.actualRound}/{gameSetting.rounds}</span></p>
                <p>Helyes válaszok: <span className="info-numbers">{gamingData.rightAnswers}/{isGaming ? gamingData.actualRound - 1 : gamingData.actualRound}</span></p>
            </div>
            {hasSaved &&
                <p>Játékállás mentve</p>
            }
            <div className="manage-buttons">
                <Button disabled={gamingData.isGameEnd} variant="success" onClick={handleSave}>Játékállás mentése</Button>
                <Button variant="warning" onClick={giveUp}>Feladás</Button>
                <Button variant="danger" onClick={endGame}>Játék befejezése</Button>
            </div>
            <NavDropdown className="manage-dropdown" id="manage-dropdown">
                <NavDropdown.Item disabled={gamingData.isGameEnd} className={`save ${gamingData.isGameEnd ? 'disabled' : ''}`} onClick={handleSave}>Játékállás mentése</NavDropdown.Item>
                <NavDropdown.Item className="give-up" onClick={giveUp}>Feladás</NavDropdown.Item>
                <NavDropdown.Item className="exit" onClick={endGame}>Játék befejezése</NavDropdown.Item>
            </NavDropdown>
            <GameModal
                operationForModal={operationForModal}
                handleNextTask={handleNextTask}
                handleEndGame={handleEndGame}
                checkIsGameEnd={checkIsGameEnd}
            />
        </header>
    )
}