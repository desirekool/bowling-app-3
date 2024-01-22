import React from 'react';
import { Header, HeaderItemWrapper } from '@zendeskgarden/react-chrome'
import Frame from "../Frame/Frame";
import {ScoreWrapper, FinalScore, ScoreboardWrapper} from "./styles";
import {uniqueId} from "lodash";

function ScoreBoard(props) {
    return (
        <ScoreboardWrapper>
            <Header isStandalone={true}>
                <HeaderItemWrapper maxX>
                    <span>{props.score.player}</span>
                </HeaderItemWrapper>
            </Header>
            <ScoreWrapper>
                {(props.score.frames.map((frame, index) =>
                    <Frame key={uniqueId('frame_')}
                        index={index + 1}
                        frame = {frame}
                    />
                ))}
                <FinalScore>
                    {!isNaN(props.score.runningScore) ? props.score.runningScore : ''}
                </FinalScore>
            </ScoreWrapper>
        </ScoreboardWrapper>
    );
}

export default ScoreBoard;