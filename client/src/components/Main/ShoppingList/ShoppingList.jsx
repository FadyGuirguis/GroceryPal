import React from 'react';
import Aux from '../../Aux.jsx';
import ShoppingListItems from './ShoppingListItems/ShoppingListItems.jsx';
import {Row, Col} from 'reactstrap';
import ShoppingListAdd from './ShoppingListAdd/ShoppingListAdd.jsx';

const shoppingList = props=> {

    return (
        <Aux>
            <Row>
                <Col lg={{size: 3, offset: 2}}>
                    <ShoppingListAdd 
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
                        <ShoppingListItems 
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

export default shoppingList;