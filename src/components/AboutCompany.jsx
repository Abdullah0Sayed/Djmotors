
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
import djLocation from '../images/DjMotorsLocation.jpg'
import djGoals from '../images/DjGoals.png'
import djMaintainance from '../images/DjMaintainance.jpg'
import companyFoundation from '../images/icons/companyFoundation.png'
import services from '../images/icons/Services.png'
import advantages from '../images/icons/badge.png'
import goals from '../images/icons/Goals.png'
import carIcon from '../images/icons/carIcon.png'
import safePayment from '../images/icons/safePayment.png'
import towing from '../images/icons/towing.svg'
import Cash from '../images/icons/Cash.png'
import stepOne from '../images/bookCarCycle/1.svg';
import stepTwo from '../images/bookCarCycle/2_1.svg';
import stepThree from '../images/bookCarCycle/3.svg';
import stepFour from '../images/bookCarCycle/4.svg';
import stepFive from '../images/bookCarCycle/5_1.svg';
// End

// Import Componets 
import Sectionheading from './SectionHeading';
import BreadCrump from './BreadCrump';
import CardForAboutCompany from './CardForAboutCompanyPage';
import BoxForAboutCompany from './BoxForAboutCompany';
import AdvantageCard from './AdvantageCard';
// End

// Import Css Files
import 'aos/dist/aos.css';
import '../css/aboutCompany.css';



// End

function AboutCompany() {
    const { t } = useTranslation();
    const lang = useSelector(state=>state.webLanguage);
    useEffect(()=>{
        Aos.init({
            duration:3000,
            delay: 200,
            once: true
        })
    } , []);

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | About DJ-MOTORS' : 'دي جي موتورز | عن دي جي موتورز'}</title>
            </Helmet>

            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/about'} cuurentPage={t('about')}/>
            
            <div className='w-full image-hint flex flex-col justify-center items-center relative bg-black sm:h-[28rem] h-80'>
                           <div className='about-image-heading'></div>
                           <Sectionheading heading={t('AboutCompany')} textSize={'lg:text-6xl text-3xl'} textColor={'text-white'}/>

                    <div className="about-company sm:max-w-4xl md:max-w-5xl w-full mx-2 grid sm:grid-cols-4 grid-cols-4 justify-center items-center gap-4 bg-white shadow-md p-4 rounded-md absolute -bottom-16 lg:-bottom-14">
                        <HashLink to={'/about#foundation-section'} smooth>
                            <CardForAboutCompany cardDataHeading={t('foundation')} cardDataDescription={t('foundation')} cardIcon={companyFoundation} cardBG={'bg-blue-50'} cardIconBG={'bg-blue-100'} />
                        </HashLink>
                        <HashLink to={'/about#objective-section'} smooth>
                            <CardForAboutCompany cardDataHeading={t('vision')} cardDataDescription={t('vision')} cardIcon={goals} cardBG={'bg-orange-50'} cardIconBG={'bg-orange-100'} />
                        </HashLink>
                        <HashLink to={'/about#services-section'} smooth>
                            <CardForAboutCompany cardDataHeading={t('services')} cardDataDescription={t('services')} cardIcon={services} cardBG={'bg-red-50'} cardIconBG={'bg-red-100'} />
                        </HashLink>
                        <HashLink to={'/about#advantages-section'} smooth>
                            <CardForAboutCompany cardDataHeading={t('advantages')} cardDataDescription={t('advantages')} cardIcon={advantages} cardBG={'bg-green-50'} cardIconBG={'bg-green-100'} />
                        </HashLink>
                    </div>
            </div> 
            
           
            <div className="about-company-container mt-20">


                

                <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto'>
                    <Sectionheading heading={t('foundation')} textSize={'lg:text-4xl text-3xl'}/>

                    <BoxForAboutCompany boxDivId={'foundation-section'} boxDataTitle={t('FoundationTitle')} boxDataDescription={t('FoundationDescription')} boxImage={djLocation} width={'w-full'} overLayBg={'bg-black'} height={'h-full'} flexRowStyle={'flex-row'}/>
                    
                    <Sectionheading heading={t('vision')} textSize={'lg:text-4xl text-3xl'}/>
                    <BoxForAboutCompany boxDivId={'objective-section'} boxDataTitle={t('ObjectiveTitle')} boxDataDescription={t('ObjectiveDescription')} boxImage={djGoals} width={'w-full'} height={'h-full'} flexRowStyle={'flex-row'}/>
                    
                    <Sectionheading heading={t('services')} textSize={'lg:text-4xl text-3xl'} textColor={'text-gray-400'}/>
                    <BoxForAboutCompany boxDivId={'services-section'} boxDataTitle={t('ServiceTitle')} boxDataDescription={t('ServiceDescription')} boxImage={djMaintainance} width={'w-full'} height={'h-full'} overLayBg={'bg-black'} flexRowStyle={'flex-row'}/>
                    

                </div>

                <div className='w-full  p-6 flex justify-center' id='services-section'>
                    <div className='box-data flex flex-col gap-8 justify-center items-center'>
                        <p className='box-data-heading font-black text-mainRedColor text-2xl'>{t('bookCarOnline')}</p>
                        <div className='grid sm:grid-cols-5 grid-cols-1 justify-center items-center gap-4'>
                            <div className='p-4 bg-slate-200 rounded-md flex justify-center items-center h-48'>
                                <img src={stepOne} alt="" srcset=""  className='w-96 h-full'/>
                            </div>
                            <div className='p-4 bg-slate-200 rounded-md flex justify-center items-center h-48'>
                                <img src={stepTwo} alt="" srcset=""  className='w-96 h-full'/>
                            </div>
                            <div className='p-4 bg-slate-200 rounded-md flex justify-center items-center h-48'>
                                <img src={stepThree} alt="" srcset=""  className='w-96 h-full'/>
                            </div>
                            <div className='p-4 bg-slate-200 rounded-md flex justify-center items-center h-48'>
                                <img src={stepFour} alt="" srcset=""  className='w-96 h-full'/>
                            </div>
                            <div className='p-4 bg-slate-200 rounded-md flex justify-center items-center h-48'>
                                <img src={stepFive} alt="" srcset=""  className='w-96 h-full'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-8 '>
                    <Sectionheading heading={t('advantages')} textSize={'lg:text-4xl text-3xl'}/>

                    <div className='w-full my-4 grid sm:grid-cols-4 grid-cols-1 sm:p-0 p-4 justify-center items-center gap-4 bg-' id='advantages-section'>
                        <AdvantageCard bgColor={'bg-slate-100'} cardImage={carIcon} imgWidth={'w-16'}  textSize={'text-sm'} textColor={'text-gray-600 leading-8'} cardTitle={t('advantageTitleBuyCarFromMobile')}/>
                        <AdvantageCard bgColor={'bg-slate-100'} cardImage={towing} imgWidth={'w-16'} textSize={'text-sm'} textColor={'text-gray-600 leading-8'} cardTitle={t('advantageTitleCarDeliveryToHome')}/>
                        <AdvantageCard bgColor={'bg-slate-100'} cardImage={safePayment} imgWidth={'w-16'}  textSize={'text-sm'} textColor={'text-gray-600 leading-8'} cardTitle={t('advantageTitleSafePayment')}/>
                        <AdvantageCard bgColor={'bg-slate-100'} cardImage={Cash} imgWidth={'w-16'} textSize={'text-sm'} textColor={'text-gray-600 leading-8'} cardTitle={t('advantageTitleCarInstalment')}/>
                    </div>

                </div>
                        
                

               


            </div>

        </div>
    );

}

export default AboutCompany;