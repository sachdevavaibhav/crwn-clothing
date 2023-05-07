import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../contexts/cart.context'

import './cart-dropdown.styles.scss'
import Button from '../button/button.component'

import CartItem from '../cart-items/cart-items.component'

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()
    const goToCheckoutHandler = () => navigate('/checkout')
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length?cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>):"Nothing in your cart"}
            </div>
            <Button onClick={goToCheckoutHandler}>Go TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown