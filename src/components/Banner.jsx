//Style
import '../styles/components/Banner.css';

//Responsive
import '../styles/responsive/components/Banner.css';

function Banner()
{
    return (
        <section className="banner">
            <section className="banner__text-container">
                <h2 className="banner__text-container__title screen-reader-only">Promoted Content</h2>
                <p className="banner__text-container__subtitle">No fees.</p>
                <p className="banner__text-container__subtitle">No minimum deposit.</p>
                <p className="banner__text-container__subtitle">High interest rates.</p>
                <p className="banner__text-container__text">Open a savings account with Argent Bank today!</p>
            </section>
        </section>
    )
}

export default Banner;