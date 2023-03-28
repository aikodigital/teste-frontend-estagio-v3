import './Button.css'

const Button = props =>{

    return (
        <button onClick={() => props.event()}>{props.children}</button>
    )
}

export default Button;