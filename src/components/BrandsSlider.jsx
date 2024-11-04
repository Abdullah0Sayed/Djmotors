// Import React Package
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOffers } from '../rtk/slicers/offersSlice';

// Import Assets / Images
import bannerOne from '../images/Banners/BANNER.gif';
import bannerTwo from '../images/Banners/BannerTwo.jpg';
import bannerFour from '../images/Banners/BannerOne.jpg';
import newBanner from '../images/Banners/newbanner.jpg';
import nextIcon from '../images/icons/next.png';

// Import Components 
import Loading from './Loading';

// Import Css Files
import '../css/slider.css';

function BrandsSlider() {
    const { offers, status, error } = useSelector((state) => state.offers);
    const dispatch = useDispatch();

    // Fetch offers when component mounts
    useEffect(() => {
        dispatch(fetchOffers()); // Correctly calling fetchOffers as a function
    }, []);

    console.log(`Offers Here ^_^`);
    console.log(offers);

    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToNext = () => {
        setIsAnimating(false);
        const isLastSlide = currentIndex === offers.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToPrevious = () => {
        setIsAnimating(false);
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? offers.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAnimating(true);
        }, 300);
        return () => clearTimeout(timeout);
    }, [currentIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 7000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        status === 'loading' ? <Loading /> : (
            <div className="image-slider-container h-auto relative">
                <div className='image-slider w-full h-auto bg-black'>
                    <img 
                        src={offers.length > 0 ? offers[currentIndex].offer_image.full_path : ''} 
                        alt="" 
                        srcSet="" 
                        className='w-full' 
                        style={{ 
                            opacity: isAnimating ? '1' : '0.8',
                            transition: 'transform 0.1s ease' 
                        }}
                    />
                </div>
                <div className='next-slide absolute right-[2%] top-[50%] cursor-pointer' onClick={goToNext}>
                    <img src={nextIcon} alt="" srcSet="" className='lg:w-10 w-8' />
                </div>
                <div className='prev-slide absolute left-[2%] top-[50%] cursor-pointer' onClick={goToPrevious}>
                    <img src={nextIcon} alt="" srcSet="" className='lg:w-10 w-8 rotate-180' />
                </div>
                <div className='absolute bottom-2 lg:right-[47%] right-[35%]'>
                    <button className='offer-details bg-mainRedColor text-white lg:w-32 lg:h-8 w-32 h-8 rounded-md font-bold text-sm'>
                        {offers.length > 0 ? (
                            <Link to={'/offers/' + offers[currentIndex].uuid}>{t('bannerBtnText')}</Link>
                        ) : (
                            <span>{t('loadingText')}</span> // عرض نص انتظار إذا لم تكن هناك بيانات
                        )}
                    </button>
                </div>
                <div className='w-full p-3 slider-points absolute'>
                    <ul className='flex flex-row justify-center items-center gap-2'>
                        {offers.map((image, index) => {
                            return (
                                <li 
                                    key={index} 
                                    className={index === currentIndex ? 'bullet w-2 h-2 rounded-full bg-black cursor-pointer activeBullet' : 'bullet w-2 h-2 rounded-full bg-black opacity-20 cursor-pointer'}  
                                    onClick={() => setCurrentIndex(index)} 
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    );
}

export default BrandsSlider;
