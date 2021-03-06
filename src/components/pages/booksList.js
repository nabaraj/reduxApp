"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBooks } from "../../actions/booksActions";
import { Grid, Row, Button, Col } from "react-bootstrap";
import BookItem from "./bookItem";
import BooksForm from "./booksForm";
import Cart from "./cart";

class BooksList extends Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    const BooksItem = this.props.books.map(function(booksArr) {
      return (
        <Col xs={12} md={6} key={booksArr._id}>
          <BookItem
            _id={booksArr._id}
            title={booksArr.title}
            description={booksArr.description}
            price={booksArr.price}
          />
        </Col>
      );
    });
    return (
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col xs={12} sm={6}>
            <BooksForm />
          </Col>
          <Col xs={12} sm={6}>
            {BooksItem}
          </Col>
        </Row>
      </Grid>
    );
  }
}
function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBooks: getBooks
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksList);
