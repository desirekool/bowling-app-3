//TODO: SCOPE / ADD Constants to Namespace
import {isNil} from "lodash";

export const ALL_PINS_STANDING = 'pins';
export const FRAME_IN_PROGRESS = 'inProgress';
export const STRIKE = 'strike';
export const LAST_FRAME_STRIKE_AND_SPARE = 'xs';
export const LAST_FRAME_STRIKE_AND_SPARE_AND_SPARE = 'xss';
export const LAST_FRAME_STRIKE_AND_PROGRESS_AND_SPARE = 'x0s';
export const LAST_FRAME_STRIKE_AND_SPARE_AND_MISS = 'xs0';
export const LAST_FRAME_STRIKE_AND_PROGRESS = 'xp';
export const LAST_FRAME_STRIKE_AND_MISS = 'x00';
export const LAST_FRAME_SPARE_AND_SPARE = '0ss';
export const LAST_FRAME_SPARE_AND_MISS = '0s0';
export const LAST_FRAME_MISS = '00';
export const SPARE = 'spare';
export const MISS = 'miss';
export const SCORE_PENDING = 'pending'

class FrameInfo {

    frameState = ALL_PINS_STANDING;
    pinsKnockedOnThrow = [];
    numberOfThrows = 0;
    currentScore = SCORE_PENDING;

    setFrameAsStrike() {
        this.frameState = STRIKE;
        this.pinsKnockedOnThrow.push(10);
        this.numberOfThrows = 1;
    }

    setFrameAsInProgress(pinsKnockedDown) {
        this.frameState = FRAME_IN_PROGRESS;
        this.pinsKnockedOnThrow.push(pinsKnockedDown);
        this.numberOfThrows = 1;
    }

    setFrameAsSpare(pinsKnockedDown) {
        this.frameState = SPARE;
        this.pinsKnockedOnThrow.push(pinsKnockedDown);
        this.numberOfThrows++;
    }

    setFrameAsMiss(pinsKnockedDown) {
        this.frameState = MISS;
        this.pinsKnockedOnThrow.push(pinsKnockedDown);
        this.numberOfThrows++;
    }

    updateLastFrameThrows(pinsKnockedDown, UpdateGameStatus) {
        let updateMessage = null;
        if(parseInt(pinsKnockedDown) === 10) {
            if(this.frameState === STRIKE) {
                this.frameState =  LAST_FRAME_STRIKE_AND_SPARE;
            } else if (this.frameState === SPARE) {
                this.frameState =  LAST_FRAME_SPARE_AND_SPARE ;
            } else if (this.frameState === LAST_FRAME_STRIKE_AND_SPARE) {
                this.frameState = LAST_FRAME_STRIKE_AND_SPARE_AND_SPARE ;
            } else if(this.frameState === ALL_PINS_STANDING) {
                this.frameState = STRIKE;
            }
            updateMessage = 10;
        } else {
            if(this.frameState === STRIKE) {
                this.frameState = LAST_FRAME_STRIKE_AND_PROGRESS;
                updateMessage = 10 - parseInt(pinsKnockedDown);
            } else if(this.frameState === FRAME_IN_PROGRESS) {
                this.frameState = this.allPinsDown(pinsKnockedDown) ? SPARE : LAST_FRAME_MISS;
                updateMessage = this.frameState === SPARE ? 10 : '';
            } else if (this.frameState === SPARE) {
                this.frameState = this.allPinsDown(pinsKnockedDown) ? LAST_FRAME_SPARE_AND_SPARE : LAST_FRAME_SPARE_AND_MISS;
                updateMessage = this.frameState === LAST_FRAME_SPARE_AND_SPARE ? 10 : '';
            } else if (this.frameState === LAST_FRAME_STRIKE_AND_SPARE) {
                this.frameState = LAST_FRAME_STRIKE_AND_SPARE_AND_MISS ;
            } else if (this.frameState === LAST_FRAME_STRIKE_AND_PROGRESS) {
                this.frameState = this.allPinsDown(pinsKnockedDown) ? LAST_FRAME_STRIKE_AND_PROGRESS_AND_SPARE : LAST_FRAME_STRIKE_AND_MISS;
            }else if(this.frameState === ALL_PINS_STANDING) {
                this.frameState = FRAME_IN_PROGRESS;
                updateMessage = 10 - parseInt(pinsKnockedDown);
            }
        }

        this.pinsKnockedOnThrow.push(pinsKnockedDown);
        this.numberOfThrows++;
        [
            LAST_FRAME_STRIKE_AND_SPARE_AND_SPARE,
            LAST_FRAME_STRIKE_AND_SPARE_AND_MISS,
            LAST_FRAME_STRIKE_AND_PROGRESS_AND_SPARE,
            LAST_FRAME_STRIKE_AND_MISS,
            LAST_FRAME_SPARE_AND_SPARE,
            LAST_FRAME_SPARE_AND_MISS,
            LAST_FRAME_MISS
        ].includes(this.frameState) ? UpdateGameStatus('') : UpdateGameStatus(updateMessage);
    }

    frameIsAStrike(pinsKnockedDown) {
        return parseInt(pinsKnockedDown) === 10 && this.frameState === ALL_PINS_STANDING && this.numberOfThrows === 0;
    }

    frameIsInProgress(pinsKnockedDown) {
        return parseInt(pinsKnockedDown) !== 10 && this.numberOfThrows === 0;
    }

    frameIsASpare(pinsKnockedDown) {
        return this.allPinsDown(pinsKnockedDown) && this.frameState === FRAME_IN_PROGRESS;
    }

    isNewFrame() {
        return this.frameState === ALL_PINS_STANDING;
    }

    isScorePending() {
        return this.currentScore === SCORE_PENDING;
    }

    hasStrike() {
        return this.frameState === STRIKE;
    }

    hasSpare() {
        return this.frameState === SPARE;
    }

    hasMiss() {
        return this.frameState === MISS;
    }

    getCurrentScore() {
        return this.currentScore=== SCORE_PENDING ? '' : this.currentScore;
    }

    allPinsDown(pinsKnockedDown) {
        return (parseInt(this.pinsKnockedOnThrow.slice(-1)[0]) + parseInt(pinsKnockedDown)) === 10;
    }

    getFirstThrowScore() {
        let pinsKnocked = !isNil(this.pinsKnockedOnThrow[0]) ? this.pinsKnockedOnThrow[0] : '';
        return parseInt(pinsKnocked) === 10 ? 'x' : pinsKnocked;
    }

    getSecondThrowScore() {
        let pinsKnocked = !isNil(this.pinsKnockedOnThrow[1]) ? this.pinsKnockedOnThrow[1] : '';
        return [SPARE, LAST_FRAME_STRIKE_AND_SPARE].includes(this.frameState) || parseInt(pinsKnocked) === 10 ? '/' : pinsKnocked;
    }

    getThirdThrowScore() {
        let pinsKnocked = !isNil(this.pinsKnockedOnThrow[2]) ? this.pinsKnockedOnThrow[2] : '';
        return parseInt(pinsKnocked) === 10 ? '/' : pinsKnocked;
    }
}

export default FrameInfo;