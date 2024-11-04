// Import React Package
import { useTranslation } from 'react-i18next'
// End

// Import Assets / Images
import sportage from '../images/cars/sportage.png';
import pegas from '../images/cars/Pegas.svg';
import sorento from '../images/cars/Sorento.svg';
import newK5 from '../images/cars/NewK5.svg';

// End

// Import Componets 
import RecentCarCard from './RecentCarCard';
// End

// Import Css Files

// End


function RecentCarsHomePage() {
    return (

        <div className="recent-cars-container w-full my-4" data-aos="fade-down">
            <div className="recent-cars sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 justify-between items-center">
                <RecentCarCard carName={'KIA SPORTAGE 2024'} gearBox={'أوتوماتيك'} engineCapacity={'1.5 لتر'} carImage={sportage} carPrice={'12690'} carFinance={'16500'}/>
                <RecentCarCard carName={'SORENTO HYBIRD 2024'} gearBox={'أوتوماتيك'} engineCapacity={'1.5 لتر'} carImage={pegas} carPrice={'12690'} carFinance={'16500'}/>
                <RecentCarCard carName={'THE NEW K5 2024'} gearBox={'أوتوماتيك'} engineCapacity={'1.5 لتر'} carImage={sorento} carPrice={'12690'} carFinance={'16500'}/>
                <RecentCarCard carName={'KIA PEGAS 2024'} gearBox={'أوتوماتيك'} engineCapacity={'1.5 لتر'} carImage={newK5} carPrice={'12690'} carFinance={'16500'}/>
            </div>
        </div>

    );
}

export default RecentCarsHomePage;