import React from 'react';
import { Header, HeaderItemWrapper } from '@zendeskgarden/react-chrome'
import Frame from "./Frame";
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const ScoreWrapper = styled.div`
  display: flex;
  flex: 1;  
`;

const FinalScore = styled.div`
    align-self: flex-end;
    flex: 0;
    min-width: 110px;
    border: 1px solid grey;
    height: auto;
    margin: 20px 0;
    border-left: 0;
    height: 64px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 17px;
`;

const ScoreboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;  
`;

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
                    <Frame key={nanoid('frame_')}
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