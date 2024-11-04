// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slider';
// End

// Import Assets / Images
import breakhands from '../images/spareparts/breakhands.png';
import mobina from '../images/spareparts/mobina.png';
import sylinder from '../images/spareparts/sylinder.png';
import seir from '../images/spareparts/seir.png';
import teil from '../images/spareparts/teil.png';
import arrowDown from '../images/icons/arrowDown.png'
// End

// Import Componets 
import SearchInput from "./SearchInput";
import SparePartCard from './SparePartCard';
// End

// Import Css Files
import 'aos/dist/aos.css';
import '../css/showroom.css';
// End

function SparePartsStore(){

    const {t} = useTranslation();
    const lang = useSelector(state=>state.webLanguage);
    
    let [searchMenuIsActive , setSearchMenu] = useState(false);
    let [priceMenuIsActive , setPriceMenu] = useState(false);
    let [financingPriceMenuIsActive , setFinancingPriceMenu] = useState(false);
    let [sortingMenuIsActive , setSortingMenu] = useState(false);
    const Min_Financing = 100;
    const Max_Financing = 5000
    const Min_Purcahs = 1000;
    const Max_Purcahs = 3_000_000
    let [values_Financing , setValuesFinancing] = useState([Min_Financing , Max_Financing])
    let [values_Purcahs , setValuesPurcahs] = useState([Min_Purcahs , Max_Purcahs])

    useEffect(()=>{
        setSearchMenu(true)
        setPriceMenu(true)
        setSortingMenu(true)
        setFinancingPriceMenu(true)
    },[]);

  return (
    <div className='min-h-screen'>
        <Helmet>
            <title>{lang === 'en' ? 'DJ MOTORS | SHOW ROOM' : 'دي جي موتورز | صالة العرض'}</title>
        </Helmet>
        <div className='cars-show-room-container'>
        
            <div className='w-full grid grid-cols-12 min-h-screen'>
                <div className='side-bar col-span-3 bg-white shadow-md p-4 sm:flex flex-col gap-2 hidden'>

                    <div className='side-bar-counting flex flex-row gap-2'>
                            <p className='text-sm font-black text-gray-800'>{t('sparePartsCountsHeading')}</p>
                            <p className='text-sm font-black text-gray-800'>(6)</p>
                    </div>
                    <hr className='my-2'/>
                    <div className='side-bar-search flex flex-col gap-4'>
                        <div className='flex flex-row gap-2  items-center cursor-pointer transition-all' onClick={()=>{
                            !searchMenuIsActive ? setSearchMenu(true) : setSearchMenu(false)
                            
                        }}>
                            <p className='text-sm font-black text-gray-800'>{t('sparePartsSearchHeading')}</p>
                            <img src={arrowDown} alt="" srcset="" className={searchMenuIsActive ? ' w-4 rotate-180' : 'w-4'}/>
                        </div>
                        <div id='search-section' className={!searchMenuIsActive ? 'hidden' : ''}>
                            <SearchInput 
                            placeHolder={t('searchPlaceHolder')} 
                            />
                        </div>
                    </div>
                   
                    <hr className='my-2'/>
                    <div className='side-bar-price-range flex flex-col gap-4'>
                        <div className='flex flex-row gap-2  items-center cursor-pointer' onClick={()=>{
                            !priceMenuIsActive ? setPriceMenu(true) : setPriceMenu(false)
                            
                        }}>
                            <p className='text-sm font-black text-gray-800'>{t('sparePartsPricesHeading')}</p>
                            <img src={arrowDown} alt="" srcset="" className={priceMenuIsActive ? ' w-4 rotate-180' : 'w-4'}/>
                        </div>
                        <div id='range-section' className={!priceMenuIsActive ? 'hidden' : 'flex flex-col gap-4'}>
                            <div className='range-inputs flex flex-row justify-center items-center gap-6'>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className='text-sm font-black text-gray-800'>{t('showRoomRangeFromHeading')}</p>
                                    <input type="text" name="min-price" id="min-price" className='w-full h-10 rounded border border-gray-300 focus:outline-none focus:border-mainRedColor text-center text-sm text-gray-700' value={values_Purcahs[0]}/>
                                    <p className='text-sm font-black text-mainRedColor'>{t('pricemeasure')}</p>
                                </div>
                                
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className='text-sm font-black text-gray-800'>{t('showRoomRangeToHeading')}</p>
                                    <input type="text" name="max-price" id="max-price" className='w-full h-10 rounded border border-gray-300 focus:outline-none focus:border-mainRedColor text-center text-sm text-gray-700' value={values_Purcahs[1]}/>
                                    <p className='text-sm font-black text-mainRedColor'>{t('pricemeasure')}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Slider className='slider w-full h-1 rounded-md bg-gray-300' onChange={setValuesPurcahs} value={values_Purcahs} min={Min_Purcahs} max={Max_Purcahs}/>
                                
                            </div>
                        </div>
                    </div>
                   
                    <hr className='my-2'/>
                    <div className='side-bar-sorting flex flex-col gap-4'>
                        <div className='flex flex-row gap-2  items-center cursor-pointer' onClick={()=>{
                            !sortingMenuIsActive ? setSortingMenu(true) : setSortingMenu(false)
                            
                        }}>
                            <p className='text-sm font-black text-gray-800'>{t('showRoomSortHeading')}</p>
                            <img src={arrowDown} alt="" srcset="" className={sortingMenuIsActive ? ' w-4 rotate-180' : 'w-4'}/>
                        </div>
                        <div id='sorting-section' className={!sortingMenuIsActive ? 'hidden' : 'w-full flex flex-col gap-4'}>
                            <ul className='w-full bg-[#fefefe] shadow-md rounded-lg flex flex-col gap-2'>
                                <li>{t('sortingAsRecenet')}</li>
                                <li>{t('sortingAsMin')}</li>
                                <li>{t('sortingAsMax')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='Content sm:col-span-9 col-span-12 w-full'>
                   
                   <div className='w-full flex flex-row flex-wrap gap-4 my-4 sm:justify-between justify-center items-center p-4'>
                    <Link to={'corolla'}>
                        <SparePartCard spareName={'طنابير شيري أريزو 5'} sparePrice={'200'} spareImage={breakhands} carPrice={'12690'} carFinance={'16500'}/>
                    </Link>
                    <Link to={'corolla'}>
                        <SparePartCard spareName={'موبينة دايو لانوس'} sparePrice={'200'} spareImage={mobina} carPrice={'12690'} carFinance={'16500'}/>
                    </Link>
                    <Link to={'corolla'}>
                        <SparePartCard spareName={'سير مجموعة'} spareDiscount={'350'} sparePrice={'200'} spareImage={seir} carPrice={'12690'} carFinance={'16500'}/>
                    </Link>
                    <Link to={'corolla'}>
                        <SparePartCard spareName={'تيل فرامل'}  spareDiscount={'350'} sparePrice={'200'} spareImage={teil} carPrice={'12690'} carFinance={'16500'}/>
                    </Link>
                    <Link to={'corolla'}>
                        <SparePartCard spareName={'وش سلندر هيونداي النترا'} sparePrice={'200'} spareImage={sylinder} carPrice={'12690'} carFinance={'16500'}/>
                    </Link>
                    <Link to={'corolla'}>
                        <SparePartCard spareName={'طنابير أصلي'} sparePrice={'200'} spareImage={breakhands} carPrice={'12690'} carFinance={'16500'}/>
                    </Link>
                      
                   </div>
                   <div className="flex justify-center my-4">
                        <button 
                           
                            className="bg-transparent text-mainRedColor border border-mainRedColor py-2 px-4 rounded hover:bg-mainRedColor hover:text-white"
                        >
                            {t('LoadMore')} {/* يمكنك تغيير النص ليكون ديناميكيًا */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SparePartsStore
