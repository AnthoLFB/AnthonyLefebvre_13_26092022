//CSS
import '../styles/components/DisplayError.css';
import '../styles/responsive/components/DisplayError.css';

function Error({errorCode, errorMessage})
{
    return (
        <section className="error">
            <h1 className="error__title">Oops ! Something is wrong ...</h1>
            <h2 className="error__code">{errorCode}</h2>
            <p className="error__message">{errorMessage}</p>
        </section>
    )
}

export default Error;