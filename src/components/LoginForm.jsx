//Redux
import { getUserToken } from '../features/user';
import { useStore } from 'react-redux';

//Components
import CustomInput from "./CustomInput";
import CustomBtn from "./CustomBtn";

//CSS
import '../styles/components/LoginForm.css';

function LoginForm({errorStatus})
{
    
    const store = useStore();

    // If there is an error when sending the form, or when logging in, this is displayed to the user.
    if(errorStatus != null)
    {
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
                <div className='warning-content'>
                    <p className='warning-content__message'>{errorStatus.message}</p>
                </div>
            </section>
        )
    }

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