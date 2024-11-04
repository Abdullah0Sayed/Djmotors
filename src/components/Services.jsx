// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
// End

// Import Assets / Images
import satha from '../images/services/satha.jpg'
import fix from '../images/services/fix.jpg'
// End

// Import Componets 
import Sectionheading from './SectionHeading';
import BreadCrump from './BreadCrump';
import ServiceCard from './ServiceCard';
// End

// Import Css Files
import 'aos/dist/aos.css';

// End


function Services(){

    const {t} = useTranslation();
    const lang = useSelector(state=>state.webLanguage);

  return (
    <div className='min-h-screen'>

           
            <div className='services-container'>

                <Helmet>
                    <title>{lang === 'en' ? 'DJ-MOTORS | Services' : 'دي جي موتورز | الخدمات '}</title>
                </Helmet>
                <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/services'} cuurentPage={t('services')}/>
                <Sectionheading heading={t('servicesHeading')} />
            <div className='services sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center'>

                <ServiceCard serviceTitle={'خدمات سطحة'} serviceImage={satha} serviceDescription={'نقدم لك من دي جي موتورز خدمة سطحة من أي مكان ولأي مكان - فقط قم بالإستفسار عن الخدمة من خلال التواصل مع فريق الإستفسارات'} service_id={2} />
                <ServiceCard serviceTitle={'خدمات الصيانة الدورية'} serviceImage={fix} serviceDescription={'نقدم لك من دي جي موتورز خدمة الصيانة الدورية لجميع ماركات السيارات سواءً كانت سياراتك من الموديلات الحديثة وحتى 1990 - فقط قم بالإستفسار عن الخدمة من خلال التواصل مع فريق الإستفسارات'} service_id={2} />
                <ServiceCard serviceTitle={'خدمات سطحة'} serviceImage={satha} serviceDescription={'نقدم لك من دي جي موتورز خدمة سطحة من أي مكان ولأي مكان - فقط قم بالإستفسار عن الخدمة من خلال التواصل مع فريق الإستفسارات'} service_id={2} />
                <ServiceCard serviceTitle={'خدمات الصيانة الدورية'} serviceImage={fix} serviceDescription={'نقدم لك من دي جي موتورز خدمة الصيانة الدورية لجميع ماركات السيارات سواءً كانت سياراتك من الموديلات الحديثة وحتى 1990 - فقط قم بالإستفسار عن الخدمة من خلال التواصل مع فريق الإستفسارات'} service_id={2} />
                <ServiceCard serviceTitle={'خدمات الصيانة الدورية'} serviceImage={fix} serviceDescription={'نقدم لك من دي جي موتورز خدمة الصيانة الدورية لجميع ماركات السيارات سواءً كانت سياراتك من الموديلات الحديثة وحتى 1990 - فقط قم بالإستفسار عن الخدمة من خلال التواصل مع فريق الإستفسارات'} service_id={2} />
                <ServiceCard serviceTitle={'خدمات سطحة'} serviceImage={satha} serviceDescription={'نقدم لك من دي جي موتورز خدمة سطحة من أي مكان ولأي مكان - فقط قم بالإستفسار عن الخدمة من خلال التواصل مع فريق الإستفسارات'} service_id={2} />
            </div>
        </div>
    </div>
  )
}

export default Services