
// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
// End

// Import Assets / Images
import membersIcon from '../images/icons/members.png';
import companiesIcon from '../images/icons/companies.png';
import indivImg from '../images/indivduals.jpeg';
import companyImg from '../images/companies.jpeg';
// End

// Import Componets 
import BreadCrump from './BreadCrump';
// End

// Import Css Files
import '../css/buynow.css';
// End


import Sectionheading from "./SectionHeading";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BuyNowComponent(){

    const {t} = useTranslation();
    const lang = useSelector(state=>state.webLanguage);

    return (
       

        <div className="min-h-screen">
             <Helmet>
                <title>{lang == 'en' ? 'DJ-MOTORS | BUY NOW' : 'دي جي موتورز | شراء سيارة'}</title>
            </Helmet>
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/buy-now'} cuurentPage={t('buycar')} />
           
            <div className="buy-now-container">
                <div className="buy-now sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto">
                    <Sectionheading heading={t('buyNowHeading')}/>
                    <div className='max-w-2xl mx-auto my-8'>
                        <p className='text-lg text-gray-500 leading-9 p-4'>
                            {t('buyNowDescription')}

                        </p>
                    </div>
                    <div className='flex sm:flex-row flex-col justify-center items-center gap-8 my-12 '>
                        <Link to={'/buy-now/buy-now-members'}>
                            <div className='buy-now-col w-56 md:w-56 lg:w-[32rem] lg:h-72 h-56 flex flex-col justify-center items-center hover:border-mainRedColor bg-black rounded-sm cursor-pointer relative overflow-hidden'>
                                <div className='buy-now-individuals'>

                                </div>
                                <p className='text-4xl font-bold absolute text-white'>{t('members')}</p>
                            </div>
                        </Link>
                        <Link to={'/buy-now/buy-now-companies'}>
                            <div className='buy-now-col w-56 md:w-56 lg:w-[32rem] lg:h-72 h-56 flex flex-col justify-center items-center hover:border-mainRedColor bg-black rounded-sm cursor-pointer relative overflow-hidden'>
                                <div className='buy-now-company'>

                                </div>
                                <p className='text-4xl font-bold absolute text-white'>{t('companies')}</p>
                            </div>
                        </Link>
                        
                    </div>


                </div>

                
            </div>
        </div>
    );
}

export default BuyNowComponent;