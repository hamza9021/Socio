const Button = ({ onClick, children, className, ...props }) => {
    console.log('Button onClick prop:', onClick); 

    const handleOnClick = (e) => {
        console.log('Button clicked');
        onClick?.(e);
    };

    return (
        <button onClick={handleOnClick} className={className} {...props}>
            {children}
        </button>
    );
};


export default Button;