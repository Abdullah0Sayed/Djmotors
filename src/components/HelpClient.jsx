
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

import error from '../images/icons/problem.png'
import sparePart from '../images/icons/spareparts.png'
import question from '../images/icons/inqueryIcon.png'
import goals from '../images/icons/Goals.png'
import salesTeam from '../images/icons/salesTeam.png'
import djCallCenter from '../images/djCallCenter.svg'
// End

// Import Componets 
import Sectionheading from './SectionHeading';
import BreadCrump from './BreadCrump';
import CardForAboutCompany from './CardForAboutCompanyPage';

// End

// Import Css Files
import 'aos/dist/aos.css';
import '../css/aboutCompany.css';


// End

function HelpClient() {


    const {t} = useTranslation();
    const lang = useSelector(state=>state.webLanguage);


    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>{lang === 'en' ? 'DJ MOTORS | CONTACT WITH DJ MOTORS TEAM' : 'دي جي موتورز | تواصل مع فريق دي جي'}</title>
            </Helmet>
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/help-client'} cuurentPage={t('call us')} />
                <Sectionheading heading={t('HelpUserSectionHeading')} textSize={'lg:text-4xl text-3xl'} />

                <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto flex justify-center items-center my-4'>
                    <div className='p-4  flex justify-center items-center h-64'>
                        <img src={djCallCenter} alt="" srcset="" className='w-full h-full'/>
                    </div>
                </div>
                <div className='max-w-2xl mx-auto my-12'>
                        
                        <p className='text-lg text-gray-500 leading-9 p-2'>
                            {t('djMotorsTeamDescription')}
                        </p>
                       
                        <p className='text-sm text-gray-900 leading-9 p-2'>
                            {t('warrantyPrivaceyDescription')}
                        </p>
                       
                </div>
                <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto flex justify-center my-4'>
                    <div className="about-company sm:max-w-4xl md:max-w-5xl w-full mx-4 grid sm:grid-cols-3 grid-cols-1 justify-center items-center gap-4 bg-white shadow-md p-4 rounded-md">
                            <Link to={'/contact-with-sales'} smooth>
                                <CardForAboutCompany cardDataHeading={t('sales')} cardDataDescription={t('sales')} cardIcon={salesTeam} cardBG={'bg-blue-50'} cardIconBG={'bg-blue-100'} />
                            </Link>
                            {/* <Link to={'/'} smooth>
                                <CardForAboutCompany cardDataHeading={t('spareParts')} cardDataDescription={t('spareParts')} cardIcon={sparePart} cardBG={'bg-orange-50'} cardIconBG={'bg-orange-100'} />
                            </Link> */}
                            <Link to={'/contact-for-inquery'}>
                                <CardForAboutCompany cardDataHeading={t('inquery')} cardDataDescription={t('inquery')} cardIcon={question} cardBG={'bg-sky-50'} cardIconBG={'bg-sky-100'} />
                            </Link>
                            <Link to={'/contact-for-complaint'}> 
                                <CardForAboutCompany cardDataHeading={t('complaint')} cardDataDescription={t('complaint')} cardIcon={error} cardBG={'bg-red-50'} cardIconBG={'bg-red-100'} />
                            </Link>
                    </div>
                </div>
        </div>
    );
}

export default HelpClient;