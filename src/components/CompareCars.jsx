
// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { addCarToCompareList, removeCarFromCompareList } from '../rtk/slicers/compareCarSlicer';
// End

// Import Assets / Images
import noCarsAvaliable from '../images/noCarsToCompare.png';
// End

// Import Componets 
import SearchInput from "./SearchInput";
import Sectionheading from './SectionHeading';
import BreadCrump from './BreadCrump';
import Loading from './Loading';
import According from './According';
// End

// Import Css Files
import 'aos/dist/aos.css';
// End



function CompareCars() {

    const {t} = useTranslation();
    const lang = useSelector(state=>state.webLanguage);
    const dispatch = useDispatch();

    let { cars, status, error } = useSelector(state => state.compareCars);
    console.log(cars);

  return (
    <div className='min-h-screen'>
        <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | CARS' : 'دي جي موتورز | السيارات'}</title>
            </Helmet>

            
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/compare-cars'} cuurentPage={t('compareCars')}/>
        <div className='compare-cars-container'>
            <Sectionheading heading={t('ComapreCarsHeading')} />
            <div className='compare-cars sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto'>
                <div className='cars-heading flex flex-row gap-4 justify-center items-center my-4'>
                        

                        {
                            cars.length === 0 ? <div className='w-full h-full flex flex-col gap-4 justify-center items-center my-4'>
                                
                                <div className='w-1/2 h-full flex justify-center items-center'>
                                    <img src={noCarsAvaliable} alt="" className='w-full object-cover'/>
                                </div>
                                <p className='text-2xl font-black text-mainRedColor w-full text-center'>{t('noCarsAvailable')}</p>
                            </div> : cars.map((car,index)=>{
                                return(
                                     <div className='relative car-col flex flex-col gap-4 bg-slate-50 border-l border-l-mainRedColor p-2' key={index}>
                                        <div className='absolute top-2'>
                                            <button className='bg-slate-200 text-gray-500 text-xs  p-2 rounded font-black' onClick={()=>{
                                                dispatch(removeCarFromCompareList(car))
                                            }}>{t('removeCarFromCompare')}</button>
                                        </div>
                            <div className='w-96 h-80 flex justify-center items-center p-4 overflow-hidden'>
                                <img src={car.car_main_image.full_path} alt="" className='w-full object-cover'/>
                            </div>
                            <div className="car-pricing-financing-purcash flex flex-row justify-between items-center">
                                <div className="car-purcash flex flex-col gap-2">
                                    <p className="text-sm font-black text-gray-800">
                                        {t("includeTax")}
                                    </p>
                                    <p className="text-3xl font-black text-mainRedColor">
                                        {Number(
                                            car.main_model_price_include_tax
                                        ).toLocaleString()}{" "}
                                        <span className="text-sm font-normal text-gray-800">
                                            {t("pricemeasure")}
                                        </span>
                                    </p>
                                    {/* <p className='text-sm text-gray-800 underline'>السعر شامل ضريبة القيمة المضافة</p> */}
                                </div>
                                <div className="car-financing flex flex-col gap-2">
                                    <p className="text-sm font-black text-gray-800">
                                        {t("withoutTax")}
                                    </p>
                                    <p className="text-3xl font-black text-mainRedColor">
                                        {Number(
                                            car.main_model_price_without_tax
                                        ).toLocaleString()}{" "}
                                        <span className="text-sm font-normal text-gray-800">
                                            {t("pricemeasure")}
                                        </span>
                                    </p>
                                    {/* <p className='text-sm text-gray-800 underline'>تفاصيل تمويل السيارة</p> */}
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-1 gap-1'>
                                <According quesTitle={'معلومات السيارة'} quesAnswer={['ناقل حركة : أوتوماتيك' , 'سعة خزان الوقود : 47 لتر']}/>
                                <According quesTitle={'الأمان'} quesAnswer={['وسائد هوائية امامية' , 'فرامل ABS']}/>
                                <According quesTitle={'تقنيات'} quesAnswer={['مدخل USB' , 'مدخل AUX']}/>
                                <According quesTitle={'الراحة'} quesAnswer={['زجاج كهربائي' , 'تشغيل مفتاح']}/>
                                <According quesTitle={'التجهيزات الخارجية'} quesAnswer={['مصابيح هالوجين' , 'مزيل ضباب']}/>
                            </div>
                        </div>
                                )
                            })
                        }

                       
                        
                   
                </div>
            </div>
        </div>
    </div>  
  )
}

export default CompareCars
