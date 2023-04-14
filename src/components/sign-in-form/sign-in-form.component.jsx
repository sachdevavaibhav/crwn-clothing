import { useState } from "react"

import {signInWithGooglePopup,signInUserFromEmailAndPassword} from '../../utils/firebase/firebase.utils'
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