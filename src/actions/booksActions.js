"use strict";
import axios from "axios";
//post a book
function postBooks(book) {
  console.log(book);
  return function(dispatch) {
    axios
      .post("/api/books", book)
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
function getBooks() {
  return function(dispatch) {
    axios
      .get("/api/books")
      .then(function(response) {
        dispatch({ type: "GET_BOOKS", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "GET_BOOKS_REJECTED", payload: err });
      });
  };
}

//delete a book
function deleteBooks(book) {
  return function(dispatch) {
    axios
      .delete("/api/books/" + book._id)
      .then(function(response) {
        dispatch({ type: "DELETE_BOOK", payload: book });
      })
      .catch(function(err) {
        dispatch({ type: "DELETE_BOOK_REJECTED", payload: err });
      });
    // type: "DELETE_BOOK",
    // payload: book
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
