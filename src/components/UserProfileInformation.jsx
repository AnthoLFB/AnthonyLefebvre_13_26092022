//React
import { useState } from 'react';

//CSS
import '../styles/components/UserProfileInformation.css';

function UserProfileInformation({name, lastname})
{
    const [isFormOpen, setIsFormOpen] = useState(false);

    if(isFormOpen)
    {
        
        return (
            <section className="profile">
                <h1 className="profile__title">Welcome back</h1>
                <form className="profile__update-form" action="" method="POST">
                    <div className='profile__update-form__fields-container'>
                        <input className='profile__update-form__fields-container__input' type="text" placeholder={name} required/>
                        <input className='profile__update-form__fields-container__input' type="text" placeholder={lastname} required/>
                    </div>
                    <div className='profile__update-form__fields-container'>
                        <button className='profile__update-form__fields-container__button' type="submit">Save</button>
                        <button className='profile__update-form__fields-container__button' type="button"  onClick={ () => setIsFormOpen(false)}>Cancel</button>
                    </div>
                </form>
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