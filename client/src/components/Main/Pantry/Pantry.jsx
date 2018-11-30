import React from 'react';
import Aux from '../../Aux.jsx';
import PantryItems from './PantryItems/PantryItems.jsx';
import {Row, Col} from 'reactstrap';
import PantryAdd from './PantryAdd/PantryAdd.jsx';

const pantry = props=> {

    return (
        <Aux>
            <Row>
                <Col lg={{size: 3, offset: 2}}>
                    <PantryAdd 
                        searchString={props.searchString}
                        change={item => props.change(item)}
                        add={() => props.add()}
                        disabled={props.disabled}/>
                </Col>
                <Col lg={{size: 5, offset: 2}}>
                    <div style={{
                        height: '700px',
                        overflowY: 'scroll',
                    }}>
                        <PantryItems 
                            list={props.list}
                            delete={item => props.delete(item)}
                            move={item => props.move(item)}
                            disabled={props.disabled}/>
                    </div>
                </Col>
            </Row>
        </Aux>
        
    )
}

export default pantry;