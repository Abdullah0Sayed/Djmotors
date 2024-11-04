// Import React Package
import { useTranslation } from 'react-i18next';
import Aos from 'aos';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

// End

// Import Components 
import BrandsSlider from './BrandsSlider';
import HomeFeature from './HomeFeature';
import Sectionheading from './SectionHeading';
import RecentCarsHomePage from './RecentCars.HomePage';
import HitBuyBanner from './HitBuyBanner';
import AboutHomeContainer from './AboutHomeContainer';
import SwiperHomeComponenet from './SwiperHomeComponenet';
// End

// Import Css Files
import 'aos/dist/aos.css';
// End

function Home() {
    const { t } = useTranslation();

    // Select offers, status, and error from Redux state
  
    // Initialize AOS for animations
    useEffect(() => {
        Aos.init({
            duration: 3000,
            delay: 200
        });
    }, []);

    // Get the current language from Redux state
    const lang = useSelector(state => state.webLanguage);

   

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | HOME' : 'دي جي موتورز | الرئيسية'}</title>
            </Helmet>

            <BrandsSlider />
            <Sectionheading heading={t('recentCars')} />
            <RecentCarsHomePage />
            <HitBuyBanner />
            <Sectionheading heading={t('whyDj')} />
            <HomeFeature />
            <AboutHomeContainer />
            <Sectionheading heading={t('djDistributor')} />
            <SwiperHomeComponenet />
        </div>
    );
}

export default Home;
