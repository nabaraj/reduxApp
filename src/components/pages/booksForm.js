"use strict"

import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks} from './../../actions/booksActions';
class BooksForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookId:null
        }
    }
    handleSelect(e){
        this.setState({
            bookId:e.target.value
        })
    }
    handleSubmit(){
        const book=[{
            title:findDOMNode(this.refs.title).value,
            description:findDOMNode(this.refs.description).value,
            price:findDOMNode(this.refs.price).value
        }];
        this.props.postBooks(book);
    }
    onDelete(){
        let _id=this.state.bookId;
        //console.log(bookId);
        if(_id){
            this.props.deleteBooks({_id});
        }
        
    }
    render(){
        const bookList = this.props.books.map((bookArr)=>(<option key={bookArr._id}>{bookArr._id}</option>))
        return(
            <Well>
                <Panel style={{padding:'10px'}}>
                    <FormGroup controlId = "title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Title"
                            ref="title"
                        />                        
                    </FormGroup>
                    <FormGroup controlId = "description">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Description"
                            ref="description"
                        />                        
                    </FormGroup>
                    <FormGroup controlId = "price">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Price"
                            ref="price"
                        />                        
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save book</Button>
                </Panel>
                <Panel style={{padding:'10px'}}>
                    <FormGroup controlId = "formControlSelect">
                        <ControlLabel>Select a book id to delete</ControlLabel>
                        <FormControl onChange={this.handleSelect.bind(this)} componentClass="select" ref="delete" placeholder="select">
                            <option>select</option>
                            {bookList}
                        </FormControl>
                    </FormGroup>
                    <Button bsStyle="danger" onClick={this.onDelete.bind(this)}>Delete Book</Button>
                </Panel>
            </Well>
        )
    }
}
function mapStateToProps(state){
    return {books:state.books.books}
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({postBooks,deleteBooks},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(BooksForm);