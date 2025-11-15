const Input = ({ type = "text", id, className = "", autocomplete, ...props }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {id.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
            </label>
            <input
                type={type}
                className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
                id={id}
                autoComplete={autocomplete}
                {...props}
            />
        </div>
    )
}

export default Input;