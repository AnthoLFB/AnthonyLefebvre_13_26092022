//Components
import CustomInput from "./CustomInput";
import CustomBtn from "./CustomBtn";

//CSS
import '../styles/components/LoginForm.css';

function LoginForm()
{
    return (
        <section className="login">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1 className="login__title">Sign in</h1>
            <form className="login__form" method="post">
                <CustomInput title={"Username"} type={"email"} labelId={"userEmail"} isRequired={true}/>
                <CustomInput title={"Password"} type={"password"} labelId={"userPassword"} isRequired={true}/>
                <CustomInput title={"Remember me"} type={"checkbox"} labelId={"backupUserData"} isRequired={false}/>
                <CustomBtn title={"Sign In"} type={"submit"} isActivated={true}/>
            </form>
        </section>
    )
}

export default LoginForm;