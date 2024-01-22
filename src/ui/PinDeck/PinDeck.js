import React from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import {PinDeckWrapper, InstructionText} from "./styles";
import {uniqueId} from "lodash";

function PinDeck(props) {

    function handleBallThrow(e) {
        const pinsKnockedDown = e.target.value;
        props.throwBall(pinsKnockedDown)
    }

    return (
        <PinDeckWrapper>
            <InstructionText>Pins Knocked Down</InstructionText>
            <Button
                key={uniqueId('frame_')}
                size={"small"}
                title={"0"}
                onClick={handleBallThrow}
                value={'0'}>0
            </Button>
            {[...Array(props.pinsOntheDeck)].map((pin, index) =>
                <Button
                    key={uniqueId('pin_')}
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