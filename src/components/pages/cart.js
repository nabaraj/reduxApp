"use strict"
import React,{Component} from 'react';
import {Well, Col, Panel, Row, FormControl, FormGroup, ButtonGroup, Button, Label} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart} from '../../actions/cartActions';

class Cart extends Component{
    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        }else{
            return this.renderEmpty();
        }
    }
    renderEmpty(){
        return (<div></div>)
    }
    renderCart(){
        const cartItemsList = this.props.cart.map(function(cartArr){
            return(
                <Panel key={cartArr._id} style={{margin:'7px 15px'}}>
                <Panel.Body>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6> <span> </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success"></Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button bsStyle="default" bsSize="small">-</Button>
                                <Button bsStyle="default" bsSize="small">+</Button>
                                <span>     </span>
                                <Button bsStyle="danger" bsSize="small">Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel.Body>
                </Panel>
            )
        })
        return (
            <Panel header="Cart" bsStyle="primary">
                <Panel.Heading>Cart</Panel.Heading>
                {cartItemsList}
            </Panel>
        )
    }
}
function mapStateToProps(state){
    return {
        cart:state.cart.cart
    }
}
export default connect(mapStateToProps)(Cart);