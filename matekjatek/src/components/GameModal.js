import { Modal, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';

import { isGameModalShowState } from '../atom';

export default function GameModal (props) {
    const { operationForModal, handleNextTask, handleEndGame, checkIsGameEnd } = props;

    const isGameEnd = checkIsGameEnd();

    const [isGameModalShow, setIsGameModalShow] = useRecoilState(isGameModalShowState);

    function handleClose() {
        setIsGameModalShow(false)
    }

    function handleGiveUp() {
        handleNextTask();
        handleClose();
    }

    function handleEnd() {
        handleEndGame();
        handleClose();
    }

    return(
        <Modal show={isGameModalShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {operationForModal === 'give-up' ? 'Feladás' : ''}
                    {operationForModal === 'end-game' ? 'Játék befejezése' : ''}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    {operationForModal === 'give-up' && 'Biztosan feladod, és tovább mész a következő feladatra?'}
                    {operationForModal === 'end-game' && 'Biztosan befejezed a játékot?'}
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Mégse</Button>
                <Button 
                    variant={/*eslint-disable*/ operationForModal === 'give-up' && 'warning' || operationForModal==='end-game' && 'danger'}
                    onClick={isGameEnd && handleEnd || operationForModal === 'give-up' && handleGiveUp || operationForModal=== 'end-game' && handleEnd /*eslint-enable*/}
                >
                    {operationForModal === 'give-up' && 'Feladás'}
                    {operationForModal === 'end-game' && 'Befejezés'}
                </Button>
            </Modal.Footer>
        </Modal>        
    )
}