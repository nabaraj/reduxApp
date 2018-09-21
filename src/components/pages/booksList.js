"use strict"
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Row, Button, Col} from 'react-bootstrap';

class BooksList extends Component{
    componentDidMount(){
        this.props.getBooks();
    }
    render(){
        const BooksItem = this.props.books.map(function(booksArr){
            return(
                <Col xs={12} md={4}>
                <div key={booksArr.id}>
                    <h6>{booksArr.title}</h6>
                    <p>{booksArr.descripttion}</p>
                    <h6>{booksArr.price}</h6>
                </div>
                <Button bsStyle="primary">Click</Button>
                </Col>
            );
        })
        return(<Grid><Row style={{marginTop:'15px'}}>{BooksItem}</Row></Grid>)
    }
}
function mapStateToProps(state){
    return{
        books:state.books.books
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBooks:getBooks
    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);