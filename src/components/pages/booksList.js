"use strict"
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';

class BooksList extends Component{
    componentDidMount(){
        this.props.getBooks();
    }
    render(){
        const BooksItem = this.props.books.map(function(booksArr){
            return(
                <li key={booksArr.id}>
                    <h3>{booksArr.title}</h3>
                    <div>{booksArr.descripttion}</div>
                    <div>{booksArr.price}</div>
                </li>
            );
        })
        return(<div><ul>{BooksItem}</ul></div>)
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