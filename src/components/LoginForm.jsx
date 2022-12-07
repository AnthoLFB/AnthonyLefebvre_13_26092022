//React
import { useEffect } from 'react';

//Redux
import { getUserToken } from '../features/user';
import { useSelector, useStore } from 'react-redux'

//React-router
import { useNavigate } from 'react-router-dom';

//Components
import CustomInput from "./CustomInput";
import CustomBtn from "./CustomBtn";

//CSS
import '../styles/components/LoginForm.css';

//Selectors Redux
import {isUserLoggedIn, isThereAnError} from '../utils/selectors';

function LoginForm()
{
    const store = useStore();
    const loginStatus = useSelector(isUserLoggedIn);
    const errorStatus = useSelector(isThereAnError);
    const navigate = useNavigate();

    useEffect(() => {
        if(loginStatus && errorStatus == null)
        {
            navigate("/profile");
        }
        else if(errorStatus != null)
        {
            console.log(errorStatus);
        }
      }, [loginStatus, errorStatus, navigate]);

    return (
        <section className="login">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1 className="login__title">Sign in</h1>
            <form className="login__form" action="" onSubmit={(e) => getUserToken(e, store)}>
                <CustomInput title={"Username"} type={"email"} labelId={"userEmail"} isRequired={true}/>
                <CustomInput title={"Password"} type={"password"} labelId={"userPassword"} isRequired={true}/>
                <CustomInput title={"Remember me"} type={"checkbox"} labelId={"backupUserData"} isRequired={false}/>                
                <CustomBtn title={"Sign In"} type={"submit"} isActivated={true}/>
            </form>
        </section>
    )
}

export default LoginForm;