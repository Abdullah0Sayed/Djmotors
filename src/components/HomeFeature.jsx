// Import React Package
import { useTranslation } from 'react-i18next'
import BrandsSlider from './BrandsSlider';

// End

// Import Assets / Images
import carIcon from '../images/icons/carsIcon.svg';
import servicIcon from '../images/icons/serviceIcon.svg';
import offerIcon from '../images/icons/offerIcon.svg';
import sparePartIcon from '../images/icons/sparePartIcon.svg';
import HomeFeatureComponent from './HomeFeatureColComponent';
// End

// Import Componets 

// End

// Import Css Files

// End


function HomeFeature() {

    const { t } = useTranslation();
   
    return (
        <div className='home-feature-container my-8' data-aos="fade">
            <div className='home-feature p-4 sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center'>
                <HomeFeatureComponent featureIcon={carIcon} featureTitle={t('carFeatureTitle')} featureDescription={t('carFeatureDescription')} />
                <HomeFeatureComponent featureIcon={servicIcon} featureTitle={t('servicFeatureTitle')} featureDescription={t('servicFeatureDescription')} />
                <HomeFeatureComponent featureIcon={offerIcon} featureTitle={t('offerFeatureTitle')} featureDescription={t('offerFeatureDescription')} />
                <HomeFeatureComponent featureIcon={sparePartIcon} featureTitle={t('sparePartFeatureTitle')} featureDescription={t('sparePartFeatureDescription')} />
            </div>
        </div>
    )
}
export default HomeFeature;