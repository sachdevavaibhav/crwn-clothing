import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    inverted: 'inverted',
    googleSignIn: 'google-sign-in'
}

const Button = ({children, buttonType, ...otherProps}) => {
    // The children prop is the content between the opening and closing tags of the component. It is a special prop.
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
        {...otherProps}>{children}</button>
    )
}

export default Button

/*
default
inverted
google sign in
*/