import { CART_ACTION_TYPE } from "./cart.types"
import { createAction } from "../../utils/reducer/createAction.utils"

export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPE.IS_CART_OPEN, bool)
}

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity+1} : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id )
    }   
    
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
    {...cartItem, quantity: cartItem.quantity-1} : cartItem)
}

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id )
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}