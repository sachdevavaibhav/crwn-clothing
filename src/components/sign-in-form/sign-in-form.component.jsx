import { useState } from "react"

import {signInWithGooglePopup,signInUserFromEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component"
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"
import {SignInContainer, ButtonsContainer} from './sign-in-form.styles'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup()
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signInUserFromEmailAndPassword(email, password)
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
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>     
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.googleSignIn} onClick={logGoogleUser} >Google Sign In</Button>     
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm