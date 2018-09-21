"use strict"
//post a book
function postBooks(bookData){
    return {
        type:"POST_BOOK", 
        payload:bookData
    }
}
function getBooks(bookData){
    return {
        type:"GET_BOOKS"
    }
}

//delete a book
function deleteBooks(book){
    return{
        type:"DELETE_BOOK",
        payload:book
    }
};
//update a book
function updateBooks(book){
    return {
        type:"UPDATE_BOOK",
        payload:book
    }
}


export {postBooks, deleteBooks, updateBooks, getBooks}