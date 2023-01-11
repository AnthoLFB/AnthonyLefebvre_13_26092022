//CSS
import '../styles/components/CustomInput.css';

function CustomInput({title, type, labelId, isRequired})
{
    if(isRequired)
    {
        return (
            <div className="field-container">
                <label className="field-container__label" htmlFor={labelId}>{title}</label>
                <input className="field-container__input" type={type} id={labelId} required/>
            </div>
        )
    }

    return (
        <div className="field-container">
            <label className="field-container__label" htmlFor={labelId}>{title}</label>
            <input className="field-container__input" type={type} id={labelId} />
        </div>
    )
}

export default CustomInput;