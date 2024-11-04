// Import React Package
import { useTranslation } from 'react-i18next'
// End

// Import Assets / Images
import emailIcon from '../images/icons/emailIcon.svg'
import locationIcon from '../images/icons/location.svg'
import whatsappIcon from '../images/icons/whatsapp.svg'
import callIcon from '../images/icons/call.svg'
import browserIcon from '../images/icons/brwoser.png'
import { useDispatch, useSelector } from 'react-redux'
import { setWebLanguage } from '../rtk/slicers/languageSlicer'
import { Link } from 'react-router-dom'
// End

// Import Componets 

// End

// Import Css Files

// End


function HeaderContainer() {
    const {t , i18n} = useTranslation();
    const changeLanguage = (lang)=> {
        dispatch(setWebLanguage(lang))
    }

    const language = useSelector(state=>state.webLanguage);

    const dispatch = useDispatch();

    return (
        <div className="header-container bg-mainRedColor hidden lg:block">
            {/* Header Section With Red Color */}
            <div className="header mx-auto sm:max-w-4xl md:max-w-6xl lg:max-w-7xl bg-mainRedColor p-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center justify-items-start md:justify-items-center lg:justify-items-center gap-2 items-center">
                 <div className="header-col flex flex-row gap-2 justify-center">
                    <img src={emailIcon} alt="" className='w-4'/>
                    <Link to={"mailto:info@djmotors.sa"} className="header-col-description text-sm font-bold text-white tracking-wider hover:text-gray-700">info@djmotors.sa</Link>
                 </div>   
                 <div className="header-col flex flex-row gap-2 justify-center">
                    <img src={callIcon} alt="" className='w-4'/>
                    <Link to={'tel:0541681105'}>
                        <span className="header-col-description text-sm font-bold text-white tracking-wider hover:text-gray-700 cursor-pointer">0541681105</span>
                    </Link>
                    <img src={whatsappIcon} alt="" className='w-4'/>
                 </div>   
                 <div className="header-col flex flex-row gap-2 justify-center items-center">
                    <img src={locationIcon} alt="" className='w-4'/>
                    <Link to={'https://maps.app.goo.gl/fqjzbQnhHPGkifRS8'} target='_blank'><span className="header-col-description text-sm font-bold text-white tracking-wider hover:text-gray-700 cursor-pointer">{t('location')}</span></Link>
                 </div>   
                 
                 <div className='flex flex-row gap-3'>
                    
                    {
                        language == 'ar' ? <button className='text-gray-100 font-bold text-sm hover:text-gray-700 cursor-pointer' onClick={()=>changeLanguage('en')}>English</button> :  <button className='text-gray-100 font-bold text-sm' onClick={()=>changeLanguage('ar')}>العربية</button>
                    }
                    <img src={browserIcon} alt="" className='w-5'/>
                 </div>
            </div>
           
        </div>
    );
}

export default HeaderContainer;