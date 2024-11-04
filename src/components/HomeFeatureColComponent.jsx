// Import React Package
import { useTranslation } from 'react-i18next'
import BrandsSlider from './BrandsSlider';
// End

// Import Assets / Images

// End

// Import Componets 

// End

// Import Css Files

// End



function HomeFeatureComponent(props) {
    return (
        <div className='home-feature-col flex flex-col justify-center items-center gap-2'>
                    <img src={props.featureIcon} alt="" srcset="" className='w-14'/>
                    <span className='text-2xl font-bold'>{props.featureTitle}</span>
                    <span className='text-balance text-center'>{props.featureDescription}</span>
        </div>
    ) 
}

export default HomeFeatureComponent;