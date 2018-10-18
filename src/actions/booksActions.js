"use strict";
import axios from "axios";
//post a book
function postBooks(book) {
  console.log(book);
  return function(dispatch) {
    axios
      .post("/books", book)
      .then(function(response) {
        dispatch({ type: "POST_BOOK", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "POST_BOOK_REJECTED", payload: "there was an error" });
      });
  };
  // return {
  //     type:"POST_BOOK",
  //     payload:bookData
  // }
}
function getBooks(bookData) {
  return {
    type: "GET_BOOKS"
  };
}

//delete a book
function deleteBooks(book) {
  return {
    type: "DELETE_BOOK",
    payload: book
  };
}
//update a book
function updateBooks(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  };
}

export { postBooks, deleteBooks, updateBooks, getBooks };
