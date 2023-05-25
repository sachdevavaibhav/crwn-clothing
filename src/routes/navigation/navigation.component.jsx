import { Fragment, useContext } from "react"
import { Outlet } from "react-router-dom"
import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import {ReactComponent as CrwbLogo} from '../../assets/crown.svg'

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx'

const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwbLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                    ):(
                        <NavLink to='/auth'>
                            Sign In
                        </NavLink>
                    )}
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation