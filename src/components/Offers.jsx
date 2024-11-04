// Import React Package
import { useTranslation } from 'react-i18next';
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Import Assets / Images
import djOffers from '../images/Banners/BannerThree.svg';
import djOffersTwo from '../images/Banners/BannerTwo.jpg';
import shiftOffer from '../images/Banners/banner.jpg';

// Import Componets 
import Sectionheading from './SectionHeading';
import BreadCrump from './BreadCrump';
import OfferCard from './OfferCard';

// Import Css Files
import 'aos/dist/aos.css';
import axios from 'axios';
import Loading from './Loading';

function Offers() {
    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);
    const { pathname } = useLocation();
    const [queryFilter, setQueryFilter] = useState('');
    const [offers, setOffers] = useState([]);

    // Fetch filter query from URL
    useEffect(() => {
        const filterQuery = pathname.split('/').slice(-1).join();
        setQueryFilter(filterQuery);
        console.log(filterQuery);
    }, [pathname]);

    // Fetch Offers Based on queryFilter
    useEffect(() => {
        const fetchOffers = async () => {
            if (queryFilter) {
                try {
                    const res = await axios(`http://127.0.0.1:8000/api/v1/offers/filter/${queryFilter}`);
                    setOffers(res.data.data);
                    console.log(res.data);
                } catch (error) {
                    console.error("Error fetching offers:", error);
                }
            }
        };

        fetchOffers();
    }, [queryFilter]); // إضافة queryFilter كمراقب

    // Initialize AOS
    useEffect(() => {
        Aos.init({
            duration: 3000,
            delay: 300,
            once: true
        });
    }, []);

    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | Offers' : 'دي جي موتورز | العروض '}</title>
            </Helmet>
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/offers'} cuurentPage={t('offers')} />

            <div className='offers-container my-4'>
                <div className='offers sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto'>
                    <div className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4' data-aos="fade">
                        {offers.length > 0 ? (
                            offers.map((offer , index) => (
                                <OfferCard 
                                    key={index} 
                                    offerTitle={lang === 'en' ? offer.offer_title_en : offer.offer_title_ar} 
                                    offerImage={offer.offer_image.full_path} // تأكد من أن لديك الحقل الصحيح في العرض
                                    offerDayLeft={offer.left_days} // تأكد من أن لديك الحقل الصحيح
                                    offerDescription={offer.description} // تأكد من أن لديك الحقل الصحيح
                                    offer_id={offer.uuid} 
                                />
                            ))
                        ) : (
                            <Loading/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Offers;
