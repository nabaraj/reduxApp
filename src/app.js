"use strict"

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import Menu from './components/menu';
import Footer from './components/footer';




//Step 3 define reducers
import reducers from './reducers';

//import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

// step 1 create the store\
const middleWare = applyMiddleware(logger);
//console.log(middleWare);
const store = createStore(reducers,middleWare);


import BooksList from './components/pages/booksList';

ReactDOM.render(
    <Provider store={store}>
    <div><Menu/><BooksList /><Footer/></div>
    </Provider>, document.getElementById('app')
)



// store.dispatch(addToCart([{id:1},{id:2}]))
//store.dispatch(postBooks());
// store.dispatch(deleteBooks({id:2}));
// store.dispatch(updateBooks({
//     id: 3,
//     title:'change title'
// }))

