const EmailInput = ({label, name, placeholder, value, setValue}) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={name}>{label}</label>
            <input type="email" className="form-control" id={name} value={value} placeholder={placeholder}
            onChange = {(e) =>{
                setValue(e.target.value);
            }}/>
        </div>
    );
};


export default EmailInput;