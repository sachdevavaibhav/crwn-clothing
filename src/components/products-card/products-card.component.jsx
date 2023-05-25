import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import {ProductCartContainer, Footer, Name, Price} from './product-card.styles'

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

const ProductsCard = ({product}) => {
    const {addItemToCart} = useContext(CartContext)
    const addToCart = () => addItemToCart(product)
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