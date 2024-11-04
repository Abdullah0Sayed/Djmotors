
// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
// End

// Import Assets / Images
import corolla from '../images/cars/corollaCategories/blue.png'
import corollaBlack from '../images/cars/corollaCategories/black.png'
// End

// Import Componets 
import SearchInput from "./SearchInput";
import Sectionheading from './SectionHeading';
import BreadCrump from './BreadCrump';
import Loading from './Loading';
import According from './According';
// End

// Import Css Files
import 'aos/dist/aos.css';



// End


function CompareCars() {

    const {t} = useTranslation();
    const lang = useSelector(state=>state.webLanguage);
  return (
    <div className='min-h-screen'>
        <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | CARS' : 'دي جي موتورز | السيارات'}</title>
            </Helmet>

            
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/compare-cars'} cuurentPage={t('compareCars')}/>
        <div className='compare-cars-container'>
            <Sectionheading heading={t('ComapreCarsHeading')} />
            <div className='compare-cars sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto'>
                <div className='cars-heading flex flex-row gap-4 justify-center items-center my-4'>
                   
                        <div className='car-col flex flex-col gap-4'>
                            <div className='flex justify-center items-center p-4'>
                                <img src={corolla} alt="" srcset="" className=''/>
                            </div>
                            <div className='w-full grid grid-cols-1 gap-1'>
                                <According quesTitle={'معلومات السيارة'} quesAnswer={['ناقل حركة : أوتوماتيك' , 'سعة خزان الوقود : 47 لتر']}/>
                                <According quesTitle={'الأمان'} quesAnswer={['وسائد هوائية امامية' , 'فرامل ABS']}/>
                                <According quesTitle={'تقنيات'} quesAnswer={['مدخل USB' , 'مدخل AUX']}/>
                                <According quesTitle={'الراحة'} quesAnswer={['زجاج كهربائي' , 'تشغيل مفتاح']}/>
                                <According quesTitle={'التجهيزات الخارجية'} quesAnswer={['مصابيح هالوجين' , 'مزيل ضباب']}/>
                            </div>
                        </div>
                        <div className='car-col flex flex-col gap-4'>
                            <div className='flex justify-center items-center p-4'>
                                <img src={corollaBlack} alt="" srcset="" className=''/>
                            </div>
                            <div className='w-full grid grid-cols-1 gap-1'>
                                <According quesTitle={'معلومات السيارة'} quesAnswer={['ناقل حركة : أوتوماتيك' , 'سعة خزان الوقود : 47 لتر']}/>
                                <According quesTitle={'الأمان'} quesAnswer={['وسائد هوائية امامية' , 'فرامل ABS']}/>
                                <According quesTitle={'تقنيات'} quesAnswer={['مدخل USB' , 'مدخل AUX']}/>
                                <According quesTitle={'الراحة'} quesAnswer={['زجاج كهربائي' , 'تشغيل مفتاح']}/>
                                <According quesTitle={'التجهيزات الخارجية'} quesAnswer={['مصابيح هالوجين' , 'مزيل ضباب']}/>
                            </div>
                        </div>
                   
                </div>
            </div>
        </div>
    </div>  
  )
}

export default CompareCars
