import React from 'react';
import {FrameWrapper, FramePinsWrapper, FrameNumber, StrikeThrow, SpareThrow, BonusThrow, FrameCurrentScore} from "./styles";

function Frame(props) {

    return (
        <FrameWrapper LastFrame={props.index === 10}>
            <FrameNumber>{props.index}</FrameNumber>
            <FramePinsWrapper>
                <StrikeThrow LastFrame={props.index === 10}>
                    {props.frame.getFirstThrowScore()}
                </StrikeThrow>
                <SpareThrow>
                    {props.frame.getSecondThrowScore()}
                </SpareThrow>
                {props.index===10 ?
                    <BonusThrow>
                        {props.frame.getThirdThrowScore()}
                    </BonusThrow> : null
                }
            </FramePinsWrapper>
            <FrameCurrentScore>
                {props.frame.getCurrentScore() }
            </FrameCurrentScore>
        </FrameWrapper>
    );
}

export default Frame;