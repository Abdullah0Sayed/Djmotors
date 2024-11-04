
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

// End

// Import Componets 
import SearchInput from "./SearchInput";
import Sectionheading from './SectionHeading';
import Loading from './Loading';
import BreadCrump from './BreadCrump';
import Reviews from './Reviews';
// End

// Import Css Files
import 'aos/dist/aos.css';


// End

function ClientsReviews(){

    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);

    const reviews = [
        {
          username: 'Abdullah',
          review: 'المعرض جميل جدا و تعامل الموظفه رائع جدا هي تعطي معلومات كافيه و وافيه و بشكل ممتاز و اشكركم علي حسن انتقائكم لموظفيكم و تحديدا استشاريه مبيعات الاستاذه /جواهر . اوصي بالتعامل معاها شخصيه فاهمه و عمليه و تعطيكم المعلومة كامله و مختصره. و توضح تفاصيل السياره بشكل دقيق و رائع.'
        },
        {
          username: 'Sara',
          review: 'تجربة رائعة جداً! الموظفون ودودون والخدمة ممتازة. أشكر فريق العمل على كل المجهودات المبذولة.'
        },
        {
          username: 'Mohammed',
          review: 'المعرض نظيف ومرتب، والموظفين على دراية بكل التفاصيل. شكراً لكم على الخدمة المميزة.'
        },
        {
          username: 'Laila',
          review: 'التعامل راقي جداً. شكراً لكم على الاهتمام بجميع التفاصيل وتوفير كل المعلومات بشكل وافي.'
        },
        {
          username: 'Omar',
          review: 'تجربتي كانت ممتازة! السيارات متوفرة بجميع الأنواع والمعلومات التي أعطيت لي كانت دقيقة جداً.'
        },
        {
          username: 'Huda',
          review: 'الخدمة سريعة والموظفون محترفون جداً. أنصح الجميع بزيارة المعرض والتعامل مع الفريق الرائع.'
        }
      ];
      

  return (
    <div className='min-h-screen'>
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | CARS' : 'دي جي موتورز | السيارات'}</title>
            </Helmet>

            
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/clients-reviews'} cuurentPage={t('reviews')}/>

            <div className='reviews-container'>
                <Sectionheading heading={t('reviewsHeading')} />
                
                    <div className='p-12 flex justify-center items-center'>
                        <Reviews reviews={reviews}/>
                    </div>
                
            </div>

    </div>
  )
}

export default ClientsReviews