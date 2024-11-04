import React from 'react'

// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// End

// Import Assets / Images
import membersIcon from '../images/icons/members.png';
import companiesIcon from '../images/icons/companies.png';
import indivImg from '../images/indivduals.jpeg';
import companyImg from '../images/companies.jpeg';
// End

// Import Componets 
import BreadCrump from './BreadCrump';
import Sectionheading from "./SectionHeading";
// End

// Import Css Files
import '../css/offerNav.css';
// End






const OfferNavigation = () => {

    const lang = useSelector(state=>state.webLanguage);
    const {t} = useTranslation();


  return (
    <div className='min-h-screen'>
        <Helmet>
            <title>{lang === 'en' ? 'DJ MOTORS | OFFERS' : 'دي جي موتورز | العروض'}</title>
        </Helmet>
        <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/offers'} cuurentPage={t('offers')}/>
            <Sectionheading heading={t('offersHeading')} />


            <div className='offers-container my-4'>
                
                <div className='offers sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto gap-4'>
                <div className='max-w-2xl mx-auto my-8'>
                        <p className='text-lg text-gray-500 leading-9 p-4'>
                            {t('offerNavigationDescription')}

                        </p>
                    </div>
                    <div className='flex sm:flex-row flex-col justify-center items-center gap-8 my-12 '>
                        <Link to={'/offers/funds'}>
                            <div className='offer-col w-56 md:w-56 lg:w-[32rem] lg:h-72 h-56 flex flex-col justify-center items-center hover:border-mainRedColor bg-black rounded-sm cursor-pointer relative overflow-hidden'>
                                <div className='funds-offer'>

                                </div>
                                <p className='text-4xl font-bold absolute text-white'>{t('funds_offers')}</p>
                            </div>
                        </Link>
                        <Link to={'/offers/cash'}>
                            <div className='offer-col w-56 md:w-56 lg:w-[32rem] lg:h-72 h-56 flex flex-col justify-center items-center hover:border-mainRedColor bg-black rounded-sm cursor-pointer relative overflow-hidden'>
                                <div className='cash-offer'>

                                </div>
                                <p className='text-4xl font-bold absolute text-white'>{t('cash_offers')}</p>
                            </div>
                        </Link>
                        
                    </div>
                </div>
            </div>
    </div>
  )
}

export default OfferNavigation
