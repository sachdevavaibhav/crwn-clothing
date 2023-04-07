import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import {ReactComponent as CrwbLogo} from '../../assets/crown.svg'

import './navigation.styles.scss'

const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const handleSignOut = async () => {
        console.log(await signOutUser())
        console.log('user signed out')
        setCurrentUser(null)
    }

    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwbLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={handleSignOut}>Sign Out</span>
                    ):(
                        <Link className="nav-link" to='/auth'>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation