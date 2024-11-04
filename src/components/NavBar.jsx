// Import React Package
import { useTranslation } from 'react-i18next'
import { NavLink , Link } from 'react-router-dom';
// End

// Import Assets / Images
import djMotorsLogo from '../images/djLogo.svg';

import menuBarIcon from '../images/icons/menu.png'
// End

// Import Componets 

// End

// Import Css Files
import '../css/navbar.css';
// End


function Navbar() {
    const { t } = useTranslation();
    return (
        <div className='navbar-container bg-white shadow-lg'>
            <div className='navbar sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto flex flex-row justify-between items-center p-4'>
                <div className='nav-col-links hidden md:flex lg:flex col-span-3'>
                    <ul className='w-full flex flex-row md:flex-wrap md:justify-start justify-center items-center gap-4 p-2 '>
                        <li><NavLink to="">{t('home')}</NavLink></li>
                        <li><NavLink to="/about">{t('about')}</NavLink></li>
                        <li><NavLink to="/brands">{t('brands')}</NavLink></li>
                        <li className='relative' id='sparePartsLink'><NavLink to="/spare-parts">{t('spareparts')}</NavLink></li>
                        <li><NavLink to="/services">{t('services')}</NavLink></li>
                        <li><NavLink to="/buy-now">{t('buycar')}</NavLink></li>
                        <li><NavLink to="/book-maintenance-appointment">{t('bookaFix')}</NavLink></li>
                        <li><NavLink to="/offers">{t('offers')}</NavLink></li>
                        <li><NavLink to="/clients-reviews">{t('reviews')}</NavLink></li>
                        <li><NavLink to="/help-client">{t('call us')}</NavLink></li>
                        <li><NavLink to="/compare-cars">{t('compareCars')}</NavLink></li>
                    </ul>
                </div>
                <div className='nav-col-logo'>
                    <Link to={'/'}>
                        <img src={djMotorsLogo} alt="" srcset="" className='w-28'/>
                    </Link>
                </div>
                <div className='nav-col-menuIcon sm:hidden'>
                   <img src={menuBarIcon} alt="" className='w-6'/>
                </div>


                
            </div>
        </div>
    );
}

export default Navbar;