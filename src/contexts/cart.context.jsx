import { createContext,  useReducer } from "react"
import { createAction } from "../utils/reducer/createAction.utils"

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal:0
})

export const CART_ACTION_TYPE = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    IS_CART_OPEN: 'IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
    
        default:
            throw new Error(`Unhandled type ${type} in cartReduced`);
    }
}

const INITIAL_CART_STATE = {isCartOpen:false, cartItems: [], cartCount: 0, cartTotal:0}

export const CartProvider = ({children}) => {

    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE)

    const updateCartItems = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price,0)
        dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {cartItems:newCartItems, cartCount:newCartCount, cartTotal:newCartTotal}))
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPE.IS_CART_OPEN, bool))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItems(newCartItems)
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItems(newCartItems)
    }

    const clearItemFromCart = (productToRemove) => {
        const newCartItems = clearCartItem(cartItems, productToRemove)
        updateCartItems(newCartItems)
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart,cartItems, cartCount, cartTotal}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}