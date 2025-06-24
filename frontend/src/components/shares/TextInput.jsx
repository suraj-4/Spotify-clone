const TextInput = ({label, name, placeholder, value, setValue}) => {
    return (
        <div className="form-group mb-2">
            <label htmlFor={name}>{label}</label>
            <input type="text" className="form-control" id={name} value={value} placeholder={placeholder}
            onChange = {(e) =>{
                setValue(e.target.value);
            }}/>
        </div>
    );
};


export default TextInput;