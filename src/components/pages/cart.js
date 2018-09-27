"use strict";
import React, { Component } from "react";
import {
  Col,
  Panel,
  Row,
  ButtonGroup,
  Button,
  Label,
  Modal
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteCartItem, updateCart } from "../../actions/cartActions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  onDelete(_id) {
    // Create a copy of the current array of books
    const currentBookToDelete = this.props.cart;
    // Determine at which index in books array is the book to be deleted
    const indexToDelete = currentBookToDelete.findIndex(function(cart) {
      return cart._id === _id;
    });
    //use slice to remove the book at the specified index
    let cartAfterDelete = [
      ...currentBookToDelete.slice(0, indexToDelete),
      ...currentBookToDelete.slice(indexToDelete + 1)
    ];

    this.props.deleteCartItem(cartAfterDelete);
  }
  onIncrement(_id) {
    this.props.updateCart(_id, 1);
  }
  openModal() {
    this.setState({
      showModal: true
    });
  }
  handleClose() {
    this.setState({
      showModal: false
    });
  }
  onDecrement(_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1);
    }
  }
  render() {
    if (this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty() {
    return <div />;
  }
  renderCart() {
    const cartItemsList = this.props.cart.map(function(cartArr) {
      return (
        <Panel.Body key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6> <span> </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>
                qty. <Label bsStyle="success">{cartArr.quantity}</Label>
              </h6>
            </Col>
            <Col xs={6} sm={4} className="text-right">
              <ButtonGroup>
                <Button
                  onClick={this.onDecrement.bind(
                    this,
                    cartArr._id,
                    cartArr.quantity
                  )}
                  bsStyle="default"
                  bsSize="small"
                >
                  -
                </Button>
                <Button
                  onClick={this.onIncrement.bind(this, cartArr._id)}
                  bsStyle="default"
                  bsSize="small"
                >
                  +
                </Button>
                <span> </span>
                <Button
                  bsStyle="danger"
                  bsSize="small"
                  onClick={this.onDelete.bind(this, cartArr._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel.Body>
      );
    }, this);
    return (
      <Panel header="Cart" bsStyle="primary">
        <Panel.Heading>Cart</Panel.Heading>
        {cartItemsList}
        <Panel.Footer>
          <Row>
            <Col xs={12}>
              <h6>
                Total Amount: $:
                {this.props.totalAmount}
              </h6>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={this.openModal.bind(this)}
              >
                Proceed to checkout
              </Button>
            </Col>
          </Row>
          <Modal
            show={this.state.showModal}
            onHide={this.handleClose.bind(this)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Your order has been saved</h4>
              <p>you will recieve an email confirmation</p>
            </Modal.Body>
            <Modal.Footer>
              <Col xs={6}>
                <h6>
                  total $:
                  {this.props.totalAmount}
                </h6>
              </Col>
              <Button onClick={this.handleClose.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Panel.Footer>
      </Panel>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteCartItem: deleteCartItem,
      updateCart: updateCart
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
