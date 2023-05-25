import {BaseButton, InvertedButton, GoogleSignInButton} from './button.styles'

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    inverted: 'inverted',
    googleSignIn: 'google-sign-in'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    return (
        {
            [BUTTON_TYPE_CLASSES.base]: BaseButton,
            [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
            [BUTTON_TYPE_CLASSES.googleSignIn]: GoogleSignInButton
        }[buttonType]
    )
}

const Button = ({children, buttonType, ...otherProps}) => {
    // The children prop is the content between the opening and closing tags of the component. It is a special prop.
    const CustomButton = getButton(buttonType)
    return <CustomButton {...otherProps}>{children}</CustomButton>
}

export default Button

/*
default
inverted
google sign in
*/