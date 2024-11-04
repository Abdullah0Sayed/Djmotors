
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
import spare1 from '../images/spareparts/1.jpg';
import spare2 from '../images/spareparts/2.jpg';
import spare3 from '../images/spareparts/3.jpg';
import spare4 from '../images/spareparts/4.jpg';
// End

// Import Componets 
import Sectionheading from './SectionHeading';
import BreadCrump from './BreadCrump';
import Loading from './Loading';
// End

// Import Css Files
import 'aos/dist/aos.css';
import '../css/spareparts.css'


// End


function SpareParts(){

    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);



  return (
    <div className='min-h-screen'>
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | SPARE PARTS' : 'دي جي موتورز | قطع الغيار'}</title>
            </Helmet>

            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/spareparts'} cuurentPage={t('spareparts')}/>
            <Sectionheading heading={t('sparePartHeading')}/>
      <div className='spare-parts-container'>
        <div className='spare-parts sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto '>
                <div className='max-w-2xl mx-auto my-8'>
                        <p className='text-lg text-gray-500 leading-9 p-4'>
                            {t('sparePartsDescription')}
                        </p>
                </div>
                <div className='flex lg:flex-row flex-col justify-center items-center gap-8 my-12 '>
                        <Link to={'/spare-parts/store'}>
                            <div className='spare-part-col w-96 md:w-72 lg:w-[32rem] lg:h-64 h-48 flex flex-col justify-center items-center hover:border-mainRedColor bg-black rounded-sm cursor-pointer relative overflow-hidden'>
                                <div className='spare-parts-store'>

                                </div>
                                <p className='lg:text-4xl md:text-3xl sm:text-2xl font-bold absolute text-white'>{t('sparePartsStore')}</p>
                            </div>
                        </Link>
                        <Link to={'/spare-parts/learn-more'}>
                            <div className='spare-part-col w-96 md:w-72 lg:w-[32rem] lg:h-64 h-48 flex flex-col justify-center items-center hover:border-mainRedColor bg-black rounded-sm cursor-pointer relative overflow-hidden'>
                                <div className='spare-parts-learn-more'>

                                </div>
                                <p className='lg:text-4xl md:text-3xl sm:text-2xl font-bold absolute text-white'>{t('sparePartsLearnMore')}</p>
                            </div>
                        </Link>
                        
                    </div>
        </div>
      </div>
    </div>
  )
}

export default SpareParts
