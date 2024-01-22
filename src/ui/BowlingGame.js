import React, {useState} from 'react';
import Header from "./Header";
import PinDeck from "./PinDeck";
import Scorecard from "../components/Scorecard";
import ScoreBoard from "./ScoreBoard";


//TODO: Use useEffect Hook to simplify the code??

function BowlingGame() {
    const [gameInProgress, setGameInProgress] = useState(false);
    const [pinsOnTheDeck, setPinsOnTheDeck] = useState(10);
    const [scorecard, setScorecard] = useState(null);
    const [counter, setCounter] = useState(null);

    function startGame() {
        setGameInProgress(scorecard.player?.length ? true : false);
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
            <Header
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