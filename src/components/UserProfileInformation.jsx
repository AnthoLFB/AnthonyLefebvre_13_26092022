//React
import { useState } from 'react';

//Redux
import { useStore } from 'react-redux';

//Redux action
import { updateUserProfile } from '../features/user';

//Components
import Error from './Error';

//CSS
import '../styles/components/UserProfileInformation.css';

function UserProfileInformation({name, lastname, errorStatus})
{

    const store = useStore()

    const [isFormOpen, setIsFormOpen] = useState(false);

    // If there is an error when sending the form, or when logging in, this is displayed to the user.
    const errorToDisplay = (errorStatus ? <Error errorStatus={errorStatus} /> : null);

    if(isFormOpen)
    {
        return (
            <section className="profile">
                <h1 className="profile__title">Welcome back</h1>
                <form className="profile__update-form" action="" onSubmit={(e) => updateUserProfile(e, store)}>
                    <div className='profile__update-form__fields-container'>
                        <input className='profile__update-form__fields-container__input' id="update-form__firstName" type="text" placeholder={name} required/>
                        <input className='profile__update-form__fields-container__input' id="update-form__lastName" type="text" placeholder={lastname} required/>
                    </div>
                    <div className='profile__update-form__fields-container'>
                        <button className='profile__update-form__fields-container__button' type="submit">Save</button>
                        <button className='profile__update-form__fields-container__button' type="button"  onClick={ () => setIsFormOpen(false)}>Cancel</button>
                    </div>
                </form>
                {errorToDisplay}
            </section>
        )
    }

    return (
        <section className="profile">
            <h1 className="profile__title">Welcome back <br/> {name} {lastname} !</h1>
            <button className="profile__button" type="button" onClick={ () => setIsFormOpen(true)}>Edit Name</button>
        </section>
    )
}

export default UserProfileInformation;  