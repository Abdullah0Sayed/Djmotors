
// Import React Package
import { useTranslation } from 'react-i18next'
// End

// Import Assets / Images

// End

// Import Componets 

// End

// Import Css Files
import '../css/carcard.css';
// End



function RecentCarCard(props) {

    const { t } = useTranslation();
    return(
        <div className="recent-car-col w-72 rounded-md shadow-xl flex flex-col gap-4 justify-center items-center bg-white">
                    <div className='w-full h-1/2 flex justify-center items-center'>
                        <img src={props.carImage} alt="" className='w-full h-full'/>
                    </div>
                    <p className='text-2xl font-bold'>{props.carName}</p>
                    <ul className='text-sm flex flex-col self-start pr-6 pl-4 gap-2'>
                        <li>{t('gearBox')} : {props.gearBox}</li>
                        <li>{t('engineCapacity')} :{props.engineCapacity}</li>
                        <div className='colors-avaliable flex flex-row justify-center items-center gap-2'>
                            <p>{t('colorsAvalaible')}</p>
                            <ul className='flex flex-row gap-2'>
                                <li className='color-bullet w-2 h-2 rounded-full bg-red-600'></li>
                                <li className='color-bullet w-2 h-2 rounded-full bg-blue-700'></li>
                                <li className='color-bullet w-2 h-2 rounded-full bg-green-600'></li>
                                <li className='color-bullet w-2 h-2 rounded-full bg-green-600'></li>
                                <li className='color-bullet w-2 h-2 rounded-full bg-green-600'></li>
                            </ul>
                        </div>
                    </ul>
                    <div className='w-full flex flex-row'>
                        
                    <div className='pricing-rate w-full flex flex-col  justify-center items-center bg-mainRedColor text-white p-2'>
                            <span className='title text-sm'>{t('includeTax')}</span>
                            <span className='font-bold text-xl'>{Number(props.carPrice).toLocaleString()} <span className='price-measure text-sm'>{t('pricemeasure')}</span></span>
                        </div>
                        <div className='financing-rate w-full flex flex-col  justify-center items-center bg-gray-900 text-white p-2'>
                            <span className='title text-sm'>{t('withoutTax')}</span>
                            <span className='font-bold text-xl'>{Number(props.carFinance).toLocaleString()} <span className='price-measure text-sm'>{t('pricemeasure')}</span></span>
                        </div>
                    </div>
                    {/* After - Before */}
                    <div className='card-before absolute top-2 left-2 bg-red-500 text-white px-2 rounded text-sm'>
                        <span className='text-sm font-bold'>{t('newArrivalBadge')}</span>
                    </div>
                </div>
    );
}

export default RecentCarCard;