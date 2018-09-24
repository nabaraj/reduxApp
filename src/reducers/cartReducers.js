"use strict"

export function cartReducers(state={cart:[]},action){
    switch (action.type){
        case "ADD_TO_CART":
            let cartItems = [...state.cart];
            //console.log(cartItems, [...action.payload]);
            return {cart:[...state.cart, ...action.payload]}
        break;
    }
    return state;
}