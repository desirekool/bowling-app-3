import React from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const PinDeckWrapper = styled.div`
  display: flex;  
  flex-direction: row;
`;

const InstructionText = styled.div`
  min-width: 300px;  
`;

function PinDeck(props) {

    function handleBallThrow(e) {
        const pinsKnockedDown = e.target.value;
        props.throwBall(pinsKnockedDown)
    }

    return (
        <PinDeckWrapper>
            <InstructionText>Pins Knocked Down</InstructionText>
            <Button
                key={nanoid()}
                size={"small"}
                title={"0"}
                onClick={handleBallThrow}
                value={'0'}>0
            </Button>
            {[...Array(props.pinsOntheDeck)].map((pin, index) =>
                <Button
                    key={nanoid('pin_')}
                    size={"small"}
                    title={index + 1}
                    onClick={handleBallThrow}
                    value={index + 1}>{index + 1}
                </Button>
            )}
        </PinDeckWrapper>
    );
}

export default PinDeck;