import React, {useState} from 'react';
import FrontOffice from "../FrontOffice/FrontOffice";
import PinDeck from "../PinDeck/PinDeck";
import Scorecard from "../../components/business/Scorecard/Scorecard";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import {isNil} from "lodash";

//TODO: Use useEffect Hook to simplify the code??

function BowlingGame() {
    const [gameInProgress, setGameInProgress] = useState(false);
    const [pinsOnTheDeck, setPinsOnTheDeck] = useState(10);
    const [scorecard, setScorecard] = useState(null);
    const [counter, setCounter] = useState(null);

    function startGame() {
        setGameInProgress(!isNil(scorecard.player) && scorecard.player.length ? true : false);
    }

    function stopGame() {
        setGameInProgress(false);
        setPinsOnTheDeck(10);
        setScorecard(null);
    }

    function UpdateGameInLastFrame(message) {
        if(message=== '') {
            setGameInProgress(false);
        } else {
            setPinsOnTheDeck(message);
        }
    }

    function handleAddPlayer(newPlayer) {
        const sc = new Scorecard();
        sc.setPlayer(newPlayer);
        setScorecard(sc);
    }

    function handleBallThrow(pinsKnockedDown) {
        let lastFramePlayed = scorecard.isLastFrame();
        setScorecard(scorecard.throwBall(pinsKnockedDown, UpdateGameInLastFrame));
        setCounter(counter + 1)
        if (!lastFramePlayed) {
            if (scorecard.getCurrentFrame().isNewFrame()) {
                setPinsOnTheDeck(10);
            } else {
                setPinsOnTheDeck(pinsOnTheDeck - pinsKnockedDown);
            }
        }
    }

    return (
        <div className={'game-wrapper'}>
            <FrontOffice
                startGame = {startGame}
                stopGame = {stopGame}
                addPlayer = {handleAddPlayer}
                gameStatus = {gameInProgress}
            />
            {(scorecard ?
                <ScoreBoard
                    score={scorecard}
                    counter={counter}
                /> : null
            )}

            {(gameInProgress ?
                <PinDeck
                    pinsOntheDeck={pinsOnTheDeck}
                    throwBall={handleBallThrow}
                /> : null
            )}
        </div>
    );
}

export default BowlingGame;