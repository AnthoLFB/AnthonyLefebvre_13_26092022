import '../styles/components/CustomBtn.css';

function CustomBtn({title, type, isActivated})
{
    if(isActivated)
    {
        return (
            <div className="field__container">
                <button className="field__container__button" type={type}>{title}</button>
            </div>
        )
    }

    return (
        <div className="field__container">
            <button className="field__container__button field__container__button--disabled" type={type} disabled>{title} - (disabled)</button>
        </div>
    )
}

export default CustomBtn;