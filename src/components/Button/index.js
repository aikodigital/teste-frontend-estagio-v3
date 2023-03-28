import './Button.css'

const Button = props =>{
    return (
        <button onClick={() => props.showHistory()}>{props.children}</button>
    )
}

export default Button;