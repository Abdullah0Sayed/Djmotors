// Import React Package
import { useTranslation } from 'react-i18next'
// End

// Import Assets / Images
import buyOrderCarAr from '../images/carBuyOrderAr.svg'
import buyOrderCarEn from '../images/carBuyOrderEn.svg'
// End

// Import Componets 

// End

// Import Css Files
import '../css/hitbuybanner.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// End


function HitBuyBanner() {
    const { t } = useTranslation();
    const lang = useSelector(state=>state.webLanguage);
    return (
        <div className="hit-buy-banner-container flex flex-row bg-black h-[50vh] lg:h-[80vh] my-8">
            
            <div className="hit-but-banner sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto h-full text-white flex flex-col gap-12 justify-center p-4">
                <div className='hit-heading '>
                    <p className='text-7xl max-w-2xl p-2 font-bold text-white relative'>{t('askBuy')}</p>
                </div>
                <div className='hit-description text-justify sm:max-w-2xl max-w-xl p-2 '>
                    <p className='sm:text-sm lg:text-lg sm:font-normal lg:font-bold'>{t('askBuyDescription')}</p>
                </div>
                <div className='w-full hit-btns flex flex-row gap-4'>
                    <Link to={'/buy-now-members'}><button className='sm:w-60 w-40 sm:py-6 py-2 text-2xl font-bold rounded-md bg-mainRedColor text-white'>{t('member')}</button></Link>
                    <Link to={'/buy-now-companies'}><button className='sm:w-60 w-40 sm:py-6 py-2 text-2xl font-bold rounded-md bg-white text-mainRedColor'>{t('companies')}</button></Link>
                </div>
            </div>
            <div className='image-box hidden sm:flex'>
            
                    {lang == 'ar' ? <img src={buyOrderCarAr} alt="" srcset="" /> : <img src={buyOrderCarEn} alt="" srcset="" />}
            </div>
        </div>
    );
}

export default HitBuyBanner;