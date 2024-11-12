import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Triangle  } from "react-loader-spinner";
import '../css/carcard.css';

function CarCard(props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    return (
        <div className="recent-car-col w-80 rounded-md flex flex-col gap-4 justify-between items-center bg-white shadow-md">
            <div className='w-full h-64 flex justify-center items-center'>
                {loading && <Triangle
  visible={true}
  height="40"
  width="40"
  color="#ff0000"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />} {/* عنصر التحميل */}
                <img 
                    src={props.carImage} 
                    alt="" 
                    className='w-full h-3/4' 
                    onLoad={() => setLoading(false)} 
                    style={{ display: loading ? 'none' : 'block' }} // إخفاء الصورة أثناء التحميل
                />
            </div>
            <p className='text-2xl font-bold'>{props.carName}</p>
            
            <div className='w-full flex flex-row'>
               
                <div className='financing-rate w-full flex flex-col justify-center items-center bg-gray-900 text-white p-2'>
                    <span className='title text-sm'>{t('withoutTax')}</span>
                    <span className='font-bold text-xl'>{Number(props.carWithoutTax).toLocaleString()} 
                        <span className='price-measure text-sm'> {t('pricemeasure')}</span>
                    </span>
                </div>

                <div className='pricing-rate w-full flex flex-col justify-center items-center bg-mainRedColor text-white p-2'>
                    <span className='title text-sm'>{t('includeTax')}</span>
                    <span className='font-bold text-xl'>{Number(props.carIncludeTax).toLocaleString()} 
                        <span className='price-measure text-sm'> {t('pricemeasure')}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CarCard;
