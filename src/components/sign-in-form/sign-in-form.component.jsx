import { useState, useContext } from "react"
import { UserContext } from "../../contexts/user.context"

import {signInWithGooglePopup,signInUserFromEmailAndPassword,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    const {setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        setCurrentUser(user)  
        await createUserDocumentFromAuth(user)
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const {user} = await signInUserFromEmailAndPassword(email, password)
            setCurrentUser(user)
            resetFormFields()
        }
        catch(error){
            console.log('user sign in failed', error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target 
        setFormFields({...formFields, [name]:value})
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email"
                type="email" 
                required
                name="email" 
                onChange={handleChange} 
                value={email} />

                <FormInput label="Password" 
                type="password" 
                required 
                name="password" 
                onChange={handleChange} 
                value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>     
                    <Button type="button" buttonType="googleSignIn" onClick={logGoogleUser} >Google Sign In</Button>     
                </div>
            </form>
        </div>
    )
}

export default SignInForm