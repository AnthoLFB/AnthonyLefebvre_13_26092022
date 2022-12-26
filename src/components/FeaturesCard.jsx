//Style
import '../styles/components/FeaturesCard.css';

function FeaturesCard({logo, altMessage, catchphrase, description})
{
    return (
        <section className="features__card">
            <img className='features__card__image' src={logo} alt={altMessage}/>
            <h3 className='features__card__title'>{catchphrase}</h3>
            <p className='features__card__description'>{description}</p>
        </section>
    )
}

export default FeaturesCard;