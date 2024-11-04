
// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
// End

// Import Assets / Images

// End

// Import Componets 
import SearchInput from "./SearchInput";
import Sectionheading from './SectionHeading';
import According from './According';
// End

// Import Css Files
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import BreadCrump from './BreadCrump';
import Loading from './Loading';

// End


function TermsAndConditions(){

    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);

  return (
    <div className='min-h-screen'>
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | TERMS AND CONDITIONS' : 'دي جي موتورز | الشروط والأحكام'}</title>
            </Helmet>

            
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/terms-conditions'} cuurentPage={t('termsandconditions')}
            />

           
            
            

            <Sectionheading heading={t('termsandconditions')} />

            <div className='terms-conditions-container'>
              <div className='terms-condition sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto'>
                  <div className='w-full grid grid-cols-1 gap-1'>
                      <According quesTitle={'شروط وأحكام شهر سبتمبر'} quesAnswer={['ناقل حركة : أوتوماتيك' , 'سعة خزان الوقود : 47 لتر']}/>
                      <According quesTitle={'شروط وأحكام شهر أكتوبر'} quesAnswer={['وسائد هوائية امامية' , 'فرامل ABS']}/>
                      <According quesTitle={'شروط وأحكام شهر نوفمبر'} quesAnswer={['مدخل USB' , 'مدخل AUX']}/>
                      <According quesTitle={'شروط وأحكام شهر ديمسبر'} quesAnswer={['زجاج كهربائي' , 'تشغيل مفتاح']}/>
                      <According quesTitle={'شروط وأحكام شهر يناير'} quesAnswer={['مصابيح هالوجين' , 'مزيل ضباب']}/>
                  </div>
              </div>
            </div>
    </div>
  )
}

export default TermsAndConditions
