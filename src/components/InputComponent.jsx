

function InputComponent(props) {
    return (
        <div className={`${props.width ? props.width : ''} flex flex-col gap-2`}>
            <label htmlFor={props.labelInputID} className="font-bold text-sm text-gray-700">{props.inputLabel}</label>
            <input type={props.inputType} placeholder={props.inputPlaceHolder} required={props.required} name={props.inputName} id={props.inputID}  className={` ${props.width ? props.width : ''} ${props.height ? props.height : ''} p-4 border outline-none shadow text-sm focus:border-mainRedColor border-r-red-400 border-l-red-400 border-transparent`} onChange={props.onChangeHandler} onBlur={props.onBlurHandler} value={props.value} maxLength={props.maxLength}/>

            {props.error && props.touched && (
                <p className="text-red-500 text-sm">* {props.error}</p> // عرض رسالة الخطأ
            )}
        </div>
    );
}

export default InputComponent;