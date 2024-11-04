// Import React Package
import { useTranslation } from 'react-i18next'
// End

// Import Assets / Images
import emailIcon from '../images/icons/emailIcon.svg'
import locationIcon from '../images/icons/location.svg'
import whatsappIcon from '../images/icons/whatsapp.svg'
import callIcon from '../images/icons/call.svg'
import serviceIcon from '../images/icons/serviceIcon.png'
import { useDispatch, useSelector } from 'react-redux'
import { setWebLanguage } from '../rtk/slicers/languageSlicer'
// End

// Import Componets 
import Navbar from './NavBar';
import HeaderContainer from './HeaderContainer'
// End

// Import Css Files

// End


function Header() {


  
    
    return (
        <>
        
        
        <HeaderContainer/>
        <Navbar/>
        </>
    );
}

export default Header;