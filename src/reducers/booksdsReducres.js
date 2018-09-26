"use strict"

export function booksReducers(state={
    books:[{
        _id:1,
        title:'this is the book title1',
        descripttion:'this is description1',
        price: 34.33
    },{
        _id:2,
        title:'this is the book title 2',
        descripttion:'this is description 2',
        price:100
    },{
        _id:3,
        title:'this is the book title 3',
        descripttion:'this is description3',
        price:200
    }]
    },action){
    switch (action.type){
        case "POST_BOOK":
            return {books:[...state.books, ...action.payload]}
        break;
        case "GET_BOOKS":
            return {...state, books:[...state.books]}
        break;
        case "DELETE_BOOK":
            const currentBookToDelete = [...state.books];
            const indexToDelete = currentBookToDelete.findIndex(function(book){
                return book._id.toString() === action.payload._id;
            })
            
            return {books:[...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete+1)]}
        break;
        case "UPDATE_BOOK":
            const currentBookToUpdate = [...state.books];
            const indexToUpdate = currentBookToUpdate.findIndex(function(book){
                return book._id === action.payload._id;
            })
            console.log(indexToUpdate, action.payload._id);
            const newBookToUpdate={
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            }
            
            return {books:[...currentBookToUpdate.slice(0, indexToUpdate),newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]}
        break;
    }
    return state;
}