//CSS
import '../styles/components/CustomInput.css';

function CustomInput({title, type, labelId, isRequired})
{
    if(type === "checkbox")
    {
        if(isRequired)
        {
            return (
                <div className="field__container--horizontal">
                    <input className="field__container--horizontal__input" type={type} id={labelId} required/>
                    <label className="field__container--horizontal__label" htmlFor={labelId}>{title}</label>
                </div>
            )
        }

        return (
            <div className="field__container--horizontal">
                <input className="field__container--horizontal__input" type={type} id={labelId} />
                <label className="field__container--horizontal__label" htmlFor={labelId}>{title}</label>
            </div>
        )
    }

    if(isRequired)
    {
        return (
            <div className="field__container">
                <label className="field__container__label" htmlFor={labelId}>{title}</label>
                <input className="field__container__input" type={type} id={labelId} required/>
            </div>
        )
    }

    return (
        <div className="field__container">
            <label className="field__container__label" htmlFor={labelId}>{title}</label>
            <input className="field__container__input" type={type} id={labelId} />
        </div>
    )
}

export default CustomInput;