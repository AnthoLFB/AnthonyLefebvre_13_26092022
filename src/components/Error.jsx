//CSS
import '../styles/components/Error.css';

function Error({errorStatus})
{

    const message = errorStatus.message;

    return (
        <div>
            <div className='warning-content'>
                <p className='warning-content__message'>{message}</p>
            </div>
        </div>
     )
}

export default Error;