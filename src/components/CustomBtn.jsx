import '../styles/components/CustomBtn.css';

function CustomBtn({title, type, isActivated})
{
    if(isActivated)
    {
        return (
            <div className="field-container">
                <button className="field-container__button" type={type}>{title}</button>
            </div>
        )
    }

    return (
        <div className="field-container">
            <button className="field-container__button field--container__button--disabled" type={type} disabled>{title} - (disabled)</button>
        </div>
    )
}

export default CustomBtn;