//Redux
import { getUserToken } from '../features/user';
import { useStore } from 'react-redux';

//Components
import CustomInput from "./CustomInput";
import CustomBtn from "./CustomBtn";
import Error from './Error';

//CSS
import '../styles/components/LoginForm.css';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function LoginForm({errorStatus})
{
    const store = useStore();
    
    // If there is an error when sending the form, or when logging in, this is displayed to the user.
    const errorToDisplay = (errorStatus ? <Error errorStatus={errorStatus} /> : null);

    return (
        <section className="login">
            <FontAwesomeIcon icon={faCircleUser}/>
            <h1 className="login__title">Sign in</h1>
            <form className="login__form" onSubmit={(e) => getUserToken(e, store)}>
                <CustomInput title={"Username"} type={"email"} labelId={"userEmail"} isRequired={true}/>
                <CustomInput title={"Password"} type={"password"} labelId={"userPassword"} isRequired={true}/>
                <div className="field-container--horizontal">
                    <input className="field-container__input" type="checkbox" id="backUpUserData" />
                    <label className="field-container__label" htmlFor="backUpUserData">Remember Me</label>
                </div>
                <CustomBtn title={"Sign In"} type={"submit"} isActivated={true}/>
            </form>
            {errorToDisplay}
        </section>
    )
}

export default LoginForm;