//Components
import CustomBtn from '../components/CustomBtn';

//CSS
import '../styles/components/Account.css';
import '../styles/responsive/components/Account.css';

function Account({title, amount, description})
{
    return (
        <section className='account'>
            <div className='account__informations'>
                <h3 className='account__informations__title'>{title}</h3>
                <p className='account__informations__amount'>${amount}</p>
                <p className='account__informations__description'>{description}</p>
            </div>
            <div className='account__transaction'>
                <CustomBtn title={"View Transactions"} type={"button"} isActivated={true}/>
            </div>
        </section>
    );
}

export default Account;