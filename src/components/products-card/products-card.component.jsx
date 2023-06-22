import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

import {ProductCartContainer, Footer, Name, Price} from './product-card.styles'

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

const ProductsCard = ({product}) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const addToCart = () => dispatch(addItemToCart(cartItems, product))
    const {name, price, imageUrl} = product
    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name className='name'>{name}</Name>
                <Price className='price'>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart}>Add to cart</Button>
        </ProductCartContainer>
    )
}

export default ProductsCard