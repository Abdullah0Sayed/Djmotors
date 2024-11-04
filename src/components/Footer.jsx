// Import React Package

// End

// Import Assets / Images
import facebookIcon from '../images/icons/facebook.png'
import instagramIcon from '../images/icons/instagram.png'
// import youtubeIcon from '../images/icons/youtube.png'
import tiktokIcon from '../images/icons/tiktok.png'
import whatsappIcon from '../images/icons/whatsapp.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
// End

// Import Componets 

// End

// Import Css Files

// End


function Footer() {

    const { t , i18n} = useTranslation();
    return (
        <div className="w-full footer-container bg-mainRedColor bottom-0 p-2">
            <div className="footer sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto p-2 grid grid-cols-2 justify-center items-center">
                <div className="footer-col-copyrights">
                    <span className="text-sm font-bold text-white tracking-wider">{t('copyrights')}</span>
                </div>
                <div className='flex flex-col  items-end'>
                    <div className="footer-col-social-icons flex flex-row gap-2">
                        <Link to="https://www.facebook.com/djmotors.sa/" target='_blank'><img src={facebookIcon} alt="" srcset="" className='w-6  hover:opacity-50 transition-all'/></Link>
                        <Link to="https://www.instagram.com/djmotors.sa/" target='_blank'><img src={instagramIcon} alt="" srcset="" className='w-6  hover:opacity-50 transition-all'/></Link>
                        {/* <Link to=""><img src={youtubeIcon} alt="" srcset="" className='w-8 opacity-50 hover:opacity-85 transition-all'/></Link> */}
                        <Link to=""><img src={tiktokIcon} alt="" srcset="" className='w-6  hover:opacity-50 transition-all'/></Link>
                        <Link to="https://wa.me/+966541681105" target='_blank'><img src={whatsappIcon} alt="" srcset="" className='w-6  hover:opacity-50 transition-all'/></Link>
                    </div>
                    
                       
                            <Link to={'/terms-conditions'}>
                                <span className='text-white text-sm hover:text-gray-700'>{t('termsandconditions')}</span>
                            </Link>
                        
                    
                </div>
            </div>
        </div>
    );
}

export default Footer;