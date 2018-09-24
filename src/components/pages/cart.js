"use strict"
import React,{Component} from 'react';
import {Well, Col, Panel, Row, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
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
                <Panel key={cartArr.id}>

                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6>
                        </Col>
                    </Row>
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