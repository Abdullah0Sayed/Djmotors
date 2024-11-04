// Import React Package
import { useTranslation } from 'react-i18next'
import AboutCard from './AboutCard';


// End

// Import Assets / Images

// End

// Import Componets 

// End

// Import Css Files

// End


function AboutHomeContainer() {

    const {t} = useTranslation();
    return (
        <div className='about-home-container mb-4'>
            <div className='about-container sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                <AboutCard aboutHeading={t('about-us-heading')} aboutDesc={t('about-us-description')}/>
                <AboutCard aboutHeading={t('our-goal-heading')} aboutDesc={t('our-goal-description')}/>
                <AboutCard aboutHeading={t('our-mission-heading')} aboutDesc={t('our-mission-description')}/>
                
            </div>
        </div>
    );
}

export default AboutHomeContainer;