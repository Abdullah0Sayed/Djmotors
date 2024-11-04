
// Import React Package
import { useTranslation } from 'react-i18next'
// End

// Import Assets / Images
import whatsappCar from '../images/icons/whatsappCar.png'
// End

// Import Componets 
// End

// Import Css Files
import '../css/carcard.css';
// End



function SparePartCard(props) {

    const { t } = useTranslation();
    return(
        
        <div className="spare-part-col w-80 h-96 bg-white border border-slate-200 shadow-md rounded-md flex flex-col gap-4 justify-between items-center">
                    <div className='w-full h-64 flex justify-center items-center bg-slate-50 overflow-hidden'>
                        <img src={props.spareImage} alt="" className='w-full h-full'/>
                    </div>
                    <p className='text-xl font-bold text-mainRedColor'>{props.spareName}</p>
                    <div className={` ${props.spareDiscount ? 'w-full flex flex-row justify-between items-center p-4' : 'w-full flex flex-col justify-center items-center p-4'} `}>
                        <div className={`${props.spareDiscount ? 'flex flex-col' : 'flex flex-col w-full'}`}>
                            <p className={`${props.spareDiscount ? 'font-black text-sm text-mainRedColor' : 'font-black text-sm text-mainRedColor'}`}>{t('sparePartPrice')}</p>
                            <p className={`${props.spareDiscount ? 'text-sm font-black' : 'text-3xl font-black'}`}>{props.sparePrice} <span className='text-sm font-normal'>{t('pricemeasure')}</span></p>
                        </div>
                        {
                            props.spareDiscount && <div className='flex flex-col'>
                                                        <p className='font-black text-sm text-mainRedColor'>{t('priceAfterDiscount')}</p>
                                                        <p className='text-sm font-black line-through'>{props.spareDiscount} {t('pricemeasure')}</p>
                                                    </div>
                        }
                        
                    </div>
                    <div className='spare-part-contact p-4 flex flex-col gap-2 justify-center items-center'>
                        <button className='w-full p-2 px-12 bg-red-600 hover:bg-red-800 text-white font-black text-sm flex flex-row gap-2 justify-center items-center rounded-sm'>
                                        <span><img src={whatsappCar} alt="" className='w-6'/></span>
                                        <p>راسلنا للإستفسار</p>
                        </button>    
                        <span className='text-xs text-red-700'>* الأسعار غير شاملة ضريبة القيمة المضافة</span>  
                    </div>
                   
                    
                   
                </div>
    );
}

export default SparePartCard;