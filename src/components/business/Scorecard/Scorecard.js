import FrameInfo, {LAST_FRAME_MISS} from "../FrameInfo/FrameInfo";
import {isNil} from "lodash";

class Scorecard {

    constructor() {
        this.player = '';
        this.frames = [];
        [...Array(10)].map((x, i) =>
            this.frames.push(new FrameInfo())
        );
        this.currentFrame = 1;
        this.runningScore = 0;
    }

    throwBall(pinsKnockedDown, UpdateGameStatus) {
        let currentFrame = this.getCurrentFrame();
        if(this.isLastFrame()) {
            currentFrame.updateLastFrameThrows(pinsKnockedDown, UpdateGameStatus);
        } else if (currentFrame.frameIsAStrike(pinsKnockedDown)) {
            currentFrame.setFrameAsStrike();
            this.currentFrame++;
        } else if(currentFrame.frameIsInProgress(pinsKnockedDown)) {
            currentFrame.setFrameAsInProgress(pinsKnockedDown);
        } else if(currentFrame.frameIsASpare(pinsKnockedDown)) {
            currentFrame.setFrameAsSpare(pinsKnockedDown);
            this.currentFrame++;
        } else {
            currentFrame.setFrameAsMiss(pinsKnockedDown);
            this.currentFrame++;
        }
        this.calculateScore();
        return this;
    }

    isLastFrame() {
        return this.currentFrame === 10;
    }

    setPlayer(player) {
        this.player = player;
    }

    getCurrentFrame() {
        return this.frames[this.currentFrame -1];
    }

    getNext2Rolls(frameIndex) {
        let frameThrowList = this.frames[frameIndex + 1].pinsKnockedOnThrow.concat( (frameIndex !== 8 && !isNil(this.frames[frameIndex  + 2].pinsKnockedOnThrow)) ? this.frames[frameIndex  + 2].pinsKnockedOnThrow : []);
        let rolls = [];
        if (frameThrowList.length < 2) {
            rolls = null;
        } else {
            frameThrowList.map((ballThrow, index) => (rolls.length < 2 ? rolls.push(ballThrow) : null));
        }
        return !isNil(rolls) && rolls.length === 2  ? rolls : null;
    }

    getNextRoll(frameIndex) {
        return this.frames[frameIndex + 1].pinsKnockedOnThrow.length ? this.frames[frameIndex + 1].pinsKnockedOnThrow : null;
    }

    calculateScore() {
        let runningScore =0;
        this.frames.map((frame, index) => {
            if (frame.isScorePending) {
                let lastFrameScore = null;
                if (index === 9) {
                    lastFrameScore = (frame.pinsKnockedOnThrow.length > 2 || (frame.pinsKnockedOnThrow.length === 2 && frame.frameState === LAST_FRAME_MISS))
                        ? frame.pinsKnockedOnThrow.reduce((total, num) => parseInt(total) + parseInt(num)) : null;
                    if (!isNaN(lastFrameScore)) {
                        runningScore =  runningScore + parseInt(lastFrameScore);
                        frame.currentScore = isNaN(runningScore) ? '' : runningScore;
                    }

                } else {
                    if(frame.hasStrike()) {
                        let nextRolls = this.getNext2Rolls(index);
                        if(!isNil(nextRolls)) {
                            runningScore = runningScore + 10 + parseInt(nextRolls.reduce((total, num) => parseInt(total) + parseInt(num)), 0);
                            frame.currentScore = runningScore;
                        }
                    } else if(frame.hasSpare()) {
                        let nextRoll = this.getNextRoll(index);
                        if(nextRoll) {
                            runningScore = runningScore + 10 + parseInt(this.getNextRoll(index));
                            frame.currentScore = runningScore;
                        }

                    } else if(frame.hasMiss()) {
                        runningScore = runningScore + frame.pinsKnockedOnThrow.reduce((total, num) => parseInt(total) + parseInt(num), 0);
                        frame.currentScore = runningScore;
                    }
                }

            }
            return null;
        });
        this.runningScore = runningScore;
    }
}

export default Scorecard;