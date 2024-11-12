// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slider';
// End

// Import Assets / Images
import sedan from '../images/cars/carsType/sedan.png';
import arrowDown from '../images/icons/arrowDown.png'
// End

// Import Componets 
import SearchInput from "./SearchInput";
import CarCard from './CarCard';
// End

// Import Css Files
import 'aos/dist/aos.css';
import '../css/showroom.css';
import axios from 'axios';
import Loading from './Loading';
// End

function CarsShowRoom(){
    const {t} = useTranslation();
    const lang = useSelector(state=>state.webLanguage);
    const location = useLocation();
    const {brand_id , brand_type_id} = location.state;


    let [cars , setCars] = useState([]);
    // let [brand_id , setBrandId] = useState(undefined);
    // let [brand_type_id , setBrandTypeId] = useState(undefined);


    let [searchMenuIsActive , setSearchMenu] = useState(false);
    let [priceMenuIsActive , setPriceMenu] = useState(false);
    let [financingPriceMenuIsActive , setFinancingPriceMenu] = useState(false);
    let [sortingMenuIsActive , setSortingMenu] = useState(false);
    let [visibleAvaliableCars , setVisibleAvaliableCars] = useState(3);

    // Search + Filter + Sorting
    let [searchQuery , setSearchQuery] = useState('');
    let [sortingQuery , setSortingQuery] = useState('');

    
    const [prices, setPrices] = useState([]);
    let [Min_Financing , setMinFinancing] = useState(1);
    let [Max_Financing , setMaxFinancing] = useState(999_999_999);
    let [values_Financing , setValuesFinancing] = useState([Min_Financing , Max_Financing])
    let [minPrice , setMinPrice] = useState(values_Financing[0]);
    let [maxPrice , setMaxPrice] = useState(values_Financing[1]);
   

    useEffect(()=>{
        setSearchMenu(true)
        setPriceMenu(true)
        setSortingMenu(true)
        setFinancingPriceMenu(true)
    },[]);
        // Fetch Cars 
    useEffect(()=>{

        const fetchCarsOfBrandAndVehicleType = async ()=>{
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/v1/main-car-model/${brand_id}/${brand_type_id}`);
                setCars(res.data.data)
                console.log(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCarsOfBrandAndVehicleType();
        
    } , []);


    useEffect(() => {
        if (cars.length >= 1) {
            console.log(`Cars are Loaded`);
            const pricesArray = cars.map(car => parseFloat(car.main_model_price_include_tax));
            setPrices(pricesArray);
        }
    }, [cars]);

   useEffect(()=>{
        console.log(prices)
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinFinancing(min);
        setMaxFinancing(max);
   } , [prices])
    
    
    // Handle Change in Slider
    // Search
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        console.log(e.target.value.toLowerCase())
    };
    //    Cars Based On Filter of Search
    const carsFiltered = cars
    .filter((car) => {
      // فلترة البحث (اسم الطراز بالإنجليزي والعربي)
      const isSearchMatch = 
        car.main_model_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.main_model_name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ;
  
      // فلترة السعر بين minPrice و maxPrice
      const isPriceInRange = car.main_model_price_include_tax >= minPrice && car.main_model_price_include_tax <= maxPrice;
  
      // إرجاع النتيجة فقط إذا تطابق البحث وفلترة السعر
      return isSearchMatch && isPriceInRange;
    })
    .sort((a, b) => {
      // ترتيب السيارات بناءً على sortingQuery
      if (sortingQuery === 'recent') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortingQuery === 'min') {
        return a.main_model_price_include_tax - b.main_model_price_include_tax;
      } else if (sortingQuery === 'max') {
        return b.main_model_price_include_tax - a.main_model_price_include_tax;
      }
  
      return 0; // عدم التغيير إذا لم يكن هناك شرط ترتيب محدد
    });
  
//  Load More Cars to Visible Cars

const loadMoreCars = ()=>{
    setVisibleAvaliableCars(prev => prev + 3);
}



  return (
    <div className='min-h-screen'>
        <Helmet>
            <title>{lang === 'en' ? 'DJ MOTORS | SHOW ROOM' : 'دي جي موتورز | صالة العرض'}</title>
        </Helmet>
        <div className='cars-show-room-container'>
        
            <div className='w-full grid grid-cols-12 min-h-screen'>
                <div className='side-bar col-span-3 bg-white shadow-md p-4 sm:flex flex-col gap-2 hidden'>

                   
                    <div className='side-bar-search flex flex-col gap-4'>
                        <div className='flex flex-row gap-2  items-center cursor-pointer transition-all' onClick={()=>{
                            !searchMenuIsActive ? setSearchMenu(true) : setSearchMenu(false)
                            
                        }}>
                            <p className='text-sm font-black text-gray-800'>{t('showRoomSearchCarsHeading')}</p>
                            <img src={arrowDown} alt="" srcset="" className={searchMenuIsActive ? ' w-4 rotate-180' : 'w-4'}/>
                        </div>
                        <div id='search-section' className={!searchMenuIsActive ? 'hidden' : ''}>
                            <SearchInput 
                            placeHolder={t('searchPlaceHolder')}
                            onSearchChange={handleSearchChange}
                            />
                        </div>
                    </div>
                   
                    <hr className='my-2'/>

                    <div className='side-bar-price-range flex flex-col gap-4'>
                        <div className='flex flex-row gap-2  items-center cursor-pointer' onClick={()=>{
                            !financingPriceMenuIsActive ? setFinancingPriceMenu(true) : setFinancingPriceMenu(false)
                            
                        }}>
                            <p className='text-sm font-black text-gray-800'>{t('showRoomRangeCarsPriceWithTaxHeading')}</p>
                            <img src={arrowDown} alt="" srcset="" className={financingPriceMenuIsActive ? ' w-4 rotate-180' : 'w-4'}/>
                        </div>
                        <div id='range-section' className={!financingPriceMenuIsActive ? 'hidden' : 'flex flex-col gap-4'}>
                            <div className='range-inputs flex flex-row justify-center items-center gap-6'>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className='text-sm font-black text-gray-800'>{t('showRoomRangeFromHeading')}</p>
                                    <input type="text" name="min-price-Financing" id="min-price-Financing" readOnly disabled className='w-full h-10 rounded border border-gray-300 focus:outline-none focus:border-mainRedColor text-center text-sm text-gray-700' value={values_Financing[0]} onChange={(e)=>{
                                        console.log('Changed : ' + e.target.value);
                                    }}/>
                                    <p className='text-sm font-black text-mainRedColor'>{t('pricemeasure')}</p>
                                </div>
                                
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className='text-sm font-black text-gray-800'>{t('showRoomRangeToHeading')}</p>
                                    <input type="text" name="max-price-Financing" id="max-price-Financing" readOnly disabled className='w-full h-10 rounded border border-gray-300 focus:outline-none focus:border-mainRedColor text-center text-sm text-gray-700' value={values_Financing[1]} onChange={(e)=>{
                                        console.log('Changed : ' + e.target.value);
                                    }} />
                                    <p className='text-sm font-black text-mainRedColor'>{t('pricemeasure')}</p>
                                </div>
                                
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Slider className='slider w-full h-1 rounded-md bg-gray-300' step={100} onChange={(value) => {
                                setValuesFinancing(value);
                                setMinPrice(value[0])
                                setMaxPrice(value[1])
    
  }} value={values_Financing} min={Min_Financing} max={Max_Financing}/>
                                    
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
                                <li onClick={()=>setSortingQuery('recent')}>{t('sortingAsRecenet')}</li>
                                <li onClick={()=>setSortingQuery('min')}>{t('sortingAsMin')}</li>
                                <li onClick={()=>setSortingQuery('max')}>{t('sortingAsMax')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='Content sm:col-span-9 col-span-12 w-full'>
                   
                   

                   {
    cars.length <= 0 ? (
        <Loading />
    ) : (
    <div className='w-full flex flex-row flex-wrap gap-4 my-4 justify-center items-center p-4'>
       {
         carsFiltered.slice(0 , visibleAvaliableCars).map((car, index) => (
            <Link to={car.main_model_name_en} key={index} state={{ carModel: car }}>
                <CarCard 
                    carName={lang === 'en' ? car.main_model_name_en : car.main_model_name_ar} 
                    gearBox={car.main_model_gear_box_type} 
                    engineCapacity={car.main_model_fuel_consumption} 
                    carImage={car.car_main_image.full_path} 
                    carIncludeTax={car.main_model_price_include_tax} 
                    carWithoutTax={car.main_model_price_without_tax}
                />
            </Link>
        ))
       }
        </div>
    )
}


                    
                   
                      
                  
{(visibleAvaliableCars < carsFiltered.length) ? (
                    <div className="flex justify-center my-4">
                        <button 
                            onClick={loadMoreCars} 
                            className="bg-transparent text-mainRedColor border border-mainRedColor py-2 px-4 rounded hover:bg-mainRedColor hover:text-white"
                        >
                            {t('LoadMore')} 
                        </button>
                    </div>
                ) : 
                null}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CarsShowRoom