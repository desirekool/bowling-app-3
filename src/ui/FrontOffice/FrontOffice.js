import React, { useState } from "react";
import { Field, Input} from '@zendeskgarden/react-forms';
import { Row, Col } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';

//TODO : Further Improve the position and Styling of elements and controls display logic

function FrontOffice(props) {

    const [name, setName] = useState('');

    function handleNameSubmit(e) {
        e.preventDefault();
        props.addPlayer(name);
    }

    function handleStartGame(e) {
        e.preventDefault();
        props.startGame();
    }

    function handleResetGame(e) {
        e.preventDefault();
        props.stopGame();
    }

    return (
        <Row justifyContent="between" className={'button-bar'}>
            {(!props.gameStatus ?
            <Col><Button onClick={handleStartGame} value="start">Start Game »</Button></Col> : null
            )}
            {(props.gameStatus ?
                <Col><Button onClick={handleResetGame} value="stop">Stop Game »</Button></Col> : null
            )}
            {(!props.gameStatus ?
                <Col>
                    <Row justifyContent="between">
                        <Col>
                            <Button title="Click to create another game"
                                 onClick={handleNameSubmit}
                                 value="addPlayer">Add Player »
                            </Button>
                        </Col>
                        <Col>
                            <Field>
                                <Input
                                    placeholder="Name"
                                    onChange={e => setName(e.target.value)}
                                />
                            </Field>
                        </Col>
                    </Row>
                </Col>: null
            )}

        </Row>
    );
}

export default FrontOffice;