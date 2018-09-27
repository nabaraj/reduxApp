"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//React-router
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

//Step 3 define reducers
import reducers from "./reducers";

//import actions
import { addToCart } from "./actions/cartActions";
import { postBooks, deleteBooks, updateBooks } from "./actions/booksActions";

// step 1 create the store\
const middleWare = applyMiddleware(logger);
//console.log(middleWare);
const store = createStore(reducers, middleWare);

import BooksList from "./components/pages/booksList";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/booksForm";
import Main from "./main";

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList} />
        <Route path="/admin" component={BooksForm} />
        <Route path="/cart" component={Cart} />
      </Route>
    </Router>
  </Provider>
);
ReactDOM.render(Routes, document.getElementById("app"));

// store.dispatch(addToCart([{id:1},{id:2}]))
//store.dispatch(postBooks());
// store.dispatch(deleteBooks({id:2}));
// store.dispatch(updateBooks({
//     id: 3,
//     title:'change title'
// }))
