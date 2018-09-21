"use strict"
import {combineReducers} from 'redux'
import {cartReducers} from './cartReducers';

import {booksReducers} from './booksdsReducres';
export default combineReducers({
    books: booksReducers,
    cart:cartReducers
})