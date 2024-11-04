// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';

// End

// Import Assets / Images

// End

// Import Componets 

// End

// Import Css Files

// End


function AboutCard(props) {
    return (

        <div className='about-home-col flex flex-col gap-2 px-4' data-aos="fade-down">
                    <p className='text-lg font-bold text-gray-300'>{props.aboutHeading}</p>
                    <p className='w-full text-sm text-justify text-gray-600 leading-6'>{props.aboutDesc}</p>
        </div>
    );
}

export default AboutCard;