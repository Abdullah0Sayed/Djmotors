// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// End

// Import Assets / Images
import cover from '../images/cars/corollaCover.jpg';
import corolla from '../images/cars/carsType/sedan.png';
import engine from '../images/icons/engine.png';
import year from '../images/icons/year.png';
import gearbox from '../images/icons/gearbox.png';
import speed from '../images/icons/speed.png';
import seats from '../images/icons/seats.png';
import gasoline from '../images/icons/gasoline.png';
import whatsappCar from '../images/icons/whatsappCar.png'
import fullSpec from '../images/icons/fullSpec.png'
import compare from '../images/icons/compare.png'
import toyotaCover from '../images/icons/toyotaCover.jpg'
import gold from '../images/cars/corollaCategories/gold.png'
import black from '../images/cars/corollaCategories/black.png'
import blue from '../images/cars/corollaCategories/blue.png'
import white from '../images/cars/corollaCategories/white.png'
import silver from '../images/cars/corollaCategories/silver.png'

import imageGallary1 from '../images/cars/corollaGallary/1.jpg';
import imageGallary2 from '../images/cars/corollaGallary/2.jpg';
import imageGallary3 from '../images/cars/corollaGallary/3.jpg';
import imageGallary4 from '../images/cars/corollaGallary/4.jpg';
import imageGallary5 from '../images/cars/corollaGallary/5.jpg';
import imageGallary6 from '../images/cars/corollaGallary/6.jpg';
import imageGallary7 from '../images/cars/corollaGallary/7.jpg';
import imageGallary8 from '../images/cars/corollaGallary/8.jpg';
import imageGallary9 from '../images/cars/corollaGallary/9.jpg';
// End

// Import Componets 
import Sectionheading from './SectionHeading';
import CardForAboutCompany from './CardForAboutCompanyPage';
import According from './According';
import Gallery from './Gallery';
// End

// Import Css Files
import 'aos/dist/aos.css';
import '../css/showroom.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import axios from 'axios';

// End


function CarShow() {

    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);
    let [colorsAvaliable, setColorAvaliable] = useState([]);
    let [currentHexCode, setCurrentHexCode] = useState(undefined);
    let [carImgBasedOnColor, setCarImageBasedOnColor] = useState(null);
    let [carsGallery, setGalleryArray] = useState([]);


    const imagesArray = [
        { src: imageGallary1, name: 'TOYOTA INTERIOR' },
        { src: imageGallary2, name: 'TOYOTA EXTERIOR' },
        { src: imageGallary3, name: 'TOYOTA SALAON' },
        { src: imageGallary4, name: 'TOYOTA SPEED' },
        { src: imageGallary5, name: 'TOYOTA TIRES' },
        { src: imageGallary6, name: 'TOYOTA BATTERIES' },
        { src: imageGallary7, name: 'TOYOTA CAHSSIS' },
        { src: imageGallary8, name: 'TOYOTA DOORS' },
        { src: imageGallary9, name: 'TOYOTA OUTSIDE' }
    ];


    const location = useLocation();
    const { carModel } = location.state || {};


    useEffect(() => {
        setGalleryArray(carModel.car_gallery)
    }, [carModel.car_gallery])

    console.log(carsGallery);

    useEffect(() => {
        setColorAvaliable(carModel.car_main_colors)
    }, []);

    useEffect(() => {
        const fetchCarImageBasedOnColor = async () => {
            try {
                const res = await axios(`http://127.0.0.1:8000/api/v1/colors/${currentHexCode}`);
                setCarImageBasedOnColor(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (currentHexCode) { // تأكد من وجود قيمة لـ currentHexCode
            fetchCarImageBasedOnColor();
        }
    }, [currentHexCode]);


    return (
        <div className='min-h-screen'>

            <Helmet>
                <title>{lang === 'en' ? 'DJ MOTORS| CAR SHOW DETAILS' : 'دي جي موتورز | عرض تفاصيل السيارة'}</title>
            </Helmet>
            <div className='car-show-container'>
                <div className='w-full h-64 relative' style={{
                    backgroundImage: `url(${carModel.car_main_covers[0].full_path})`, // تعيين الصورة كخلفية
                    backgroundSize: 'cover', // التأكد من تغطية الصورة للمساحة بالكامل
                    backgroundPosition: 'center', // جعل الصورة تتمركز بشكل جيد
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className='cover-overlay absolute top-0 w-full h-full bg-[#00000097] flex justify-center items-center'>
                        <p className='text-6xl font-black text-white'>{lang === 'en' ? carModel.main_model_name_en : carModel.main_model_name_ar}</p>
                    </div>
                </div>
                <div className='car-show sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-4 grid grid-cols-12 gap-2'>
                    <div className='col-span-4 car-show-sideBar flex flex-col gap-4 bg-white shadow-md rounded-md p-4'>
                        <div className='car-sidebar-car-name flex flex-row gap-2'>
                            <p className='text-2xl font-black'>{lang === 'en' ? carModel.main_model_name_en : carModel.main_model_name_ar}</p>
                            {
                                carModel.car_sub_categories && <p className='p-1 px-2 border border-red-400 text-red-500 text-sm font-black rounded'>{carModel.car_sub_categories.length}</p>
                            }

                        </div>
                        <hr />
                        <div className='car-sidebar-car-payment flex flex-col gap-4'>
                            <div className='car-pricing-financing-purcash flex flex-row justify-between items-center'>
                                <div className='car-purcash flex flex-col gap-2'>
                                    <p className='text-sm font-black text-gray-800'>{t('includeTax')}</p>
                                    <p className='text-3xl font-black text-mainRedColor'>{Number(carModel.main_model_price_include_tax).toLocaleString()} <span className='text-sm font-normal text-gray-800'>{t('pricemeasure')}</span></p>
                                    <p className='text-sm text-gray-800 underline'>السعر شامل ضريبة القيمة المضافة</p>
                                </div>
                                <div className='car-financing flex flex-col gap-2'>
                                    <p className='text-sm font-black text-gray-800'>{t('withoutTax')}</p>
                                    <p className='text-3xl font-black text-mainRedColor'>{Number(carModel.main_model_price_without_tax).toLocaleString()} <span className='text-sm font-normal text-gray-800'>{t('pricemeasure')}</span></p>
                                    <p className='text-sm text-gray-800 underline'>تفاصيل تمويل السيارة</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <button className='w-full p-4 bg-transparent hover:bg-mainRedColor hover:text-white border border-mainRedColor text-mainRedColor font-black text-lg rounded-md'>{t('bookCarNow')}</button>
                                <button className='w-full p-4 bg-green-600 text-white font-black text-lg rounded-md flex flex-row gap-2 justify-center items-center'>
                                    <span><img src={whatsappCar} alt="" className='w-6' /></span>
                                    <p>{t('bookCarViaWhatsapp')}</p>
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row gap-1'>
                                <p className='text-base text-gray-800'>{t('carModelCode')}: {carModel.main_model_code}</p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-400'>{t('mentionCarCode')}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='flex flex-col gap-2'>
                            <button className='w-full p-4 bg-red-600 text-white font-black text-lg rounded-md flex flex-row gap-2 justify-center items-center'>
                                <span><img src={fullSpec} alt="" className='w-6' /></span>
                                <p>{t('carCatelog')}</p>
                            </button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <button className='w-full p-4 bg-gray-950  hover:bg-mainRedColor text-white transition-all duration-300 delay-50 font-black text-lg rounded-md flex flex-row gap-2 justify-center items-center'>
                                <span><img src={compare} alt="" className='w-6' /></span>
                                <p>{t('addCarToCompare')}</p>
                            </button>
                        </div>
                    </div>
                    <div className='col-span-8 car-show-sideBar p-4 bg-white rounded-md shadow-md flex flex-col justify-center items-center'>

                        <div className='h-[28rem] flex justify-center items-center'>
                            {carImgBasedOnColor === null ? <img src={carModel.car_main_image.full_path} alt="" className='w-full h-full object-cover' /> : <img src={carImgBasedOnColor.full_path} alt="" className='w-full h-full object-cover transition-all duration-200' />}
                        </div>
                        {
                            colorsAvaliable.length >= 1 && <div className='car-colors flex flex-col gap-2 justify-center items-center'>
                                <p className='text-sm font-black'>{t('carColorsAvaliable')}</p>
                                <ul className='flex flex-row gap-2'>
                                    {
                                        colorsAvaliable.map((color, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="w-4 h-4 rounded-full border border-black cursor-pointer hover:scale-75 transition-all duration-200"
                                                    style={{ backgroundColor: color.hex_color_code }}
                                                    onClick={(e) => {
                                                        setCurrentHexCode(color.uuid)

                                                    }}
                                                >

                                                </li>
                                            );
                                        })
                                    }
                                </ul>

                            </div>
                        }

                    </div>
                </div>
                <Sectionheading heading={t('CarInformation')} />
                <div className='car-show-quick-info sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-4 grid grid-cols-3 gap-2'>
                    <CardForAboutCompany cardDataHeading={t('carModelYear')} cardDataDescription={carModel.main_model_year} cardIcon={year} cardBG={'bg-gray-50'} cardIconBG={'bg-gray-200'} />
                    <CardForAboutCompany cardDataHeading={t('carEngineVolume')} cardDataDescription={carModel.main_model_engine_capacity + ' cc'} cardIcon={engine} cardBG={'bg-gray-50'} cardIconBG={'bg-gray-200'} />
                    <CardForAboutCompany cardDataHeading={t('carMaxSpeed')} cardDataDescription={carModel.main_model_max_speed} cardIcon={speed} cardBG={'bg-gray-50'} cardIconBG={'bg-gray-200'} />
                    <CardForAboutCompany cardDataHeading={t('carFuelConsumption')} cardDataDescription={carModel.main_model_fuel_consumption + ' ' + t('litre/km')} cardIcon={gasoline} cardBG={'bg-gray-50'} cardIconBG={'bg-gray-200'} />
                    <CardForAboutCompany cardDataHeading={t('carTransmission')} cardDataDescription={carModel.main_model_gear_box_type === 'أوتوماتيك' ? t('auto') : t('manual')} cardIcon={gearbox} cardBG={'bg-gray-50'} cardIconBG={'bg-gray-200'} />
                    <CardForAboutCompany cardDataHeading={t('carNumberOfSeats')} cardDataDescription={carModel.main_model_number_of_seats} cardIcon={seats} cardBG={'bg-gray-50'} cardIconBG={'bg-gray-200'} />
                </div>
                <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-4'>
                    <div className='w-full grid grid-cols-1 gap-1'>
                        <According quesTitle={t('carInformation')} quesAnswer={['ناقل حركة : أوتوماتيك', 'سعة خزان الوقود : 47 لتر']} />
                        <According quesTitle={t('carSafety')} quesAnswer={['وسائد هوائية امامية', 'فرامل ABS']} />
                        <According quesTitle={t('carTechnologies')} quesAnswer={['مدخل USB', 'مدخل AUX']} />
                        <According quesTitle={t('carComfort')} quesAnswer={['زجاج كهربائي', 'تشغيل مفتاح']} />
                        <According quesTitle={t('carExternalEquipment')} quesAnswer={['مصابيح هالوجين', 'مزيل ضباب']} />
                    </div>
                </div>
                <div className='w-full h-[32rem] relative' style={{
                    backgroundImage: `url(${carModel.car_main_covers[0].full_path})`, // تعيين الصورة كخلفية
                    backgroundSize: 'cover', // التأكد من تغطية الصورة للمساحة بالكامل
                    backgroundPosition: 'center', // جعل الصورة تتمركز بشكل جيد
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className='cover-overlay absolute left-0 w-1/2 h-full bg-gradient-to-tr from-[#ff000056] to-[#6d0a0a56]  flex flex-col gap-4 justify-center items-center'>
                        <p className='text-5xl font-black text-white'>{carModel.main_model_name_en}</p>
                        <p className='text-2xl font-black text-white'>{lang === 'en' ? carModel.main_model_slogan_en : carModel.main_model_slogan_ar}.</p>
                    </div>
                </div>
                <Sectionheading heading={t('CarCategories')} />
                <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-8'>
                    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={16}
                        slidesPerView={3}
                        zoom={true}
                        autoplay={true}
                        loop={true}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}>
                        <SwiperSlide>
                            <div className='car-sub-category bg-white rounded border border-slate-200 shadow-sm p-4 flex flex-col gap-4 justify-center items-center'>
                                <div className=' w-full car-sub-category-image h-40 flex justify-center items-center'>
                                    <img src={gold} alt="" className='w-full' />
                                </div>
                                <div className='w-full car-sub-category-name flex justify-center items-center'>
                                    <p className='text-lg font-black'>تويوتا كورولا 1.6 هايبرد</p>
                                </div>
                                <div className=' w-full car-sub-category-pricing flex flex-row justify-between'>
                                    <div className='car-purcash flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>سعر الشراء</p>
                                        <p className='text-3xl font-black text-mainRedColor'>65,000 <span className='text-sm font-normal text-gray-800'>ريال</span></p>
                                        <p className='text-sm text-gray-800 underline'>السعر شامل ضريبة القيمة المضافة</p>
                                    </div>
                                    <div className='car-financing flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>يبدأ القسط من</p>
                                        <p className='text-3xl font-black text-mainRedColor'>2,500 <span className='text-sm font-normal text-gray-800'>ريال / شهرياً</span></p>
                                        <p className='text-sm text-gray-800 underline'>تفاصيل تمويل السيارة</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='car-sub-category bg-white rounded border border-slate-200 shadow-sm p-4 flex flex-col gap-4 justify-center items-center'>
                                <div className=' w-full car-sub-category-image h-40 flex justify-center items-center'>
                                    <img src={blue} alt="" className='w-full' />
                                </div>
                                <div className='w-full car-sub-category-name flex justify-center items-center'>
                                    <p className='text-lg font-black'>تويوتا كورولا 1.6 هايبرد</p>
                                </div>
                                <div className=' w-full car-sub-category-pricing flex flex-row justify-between'>
                                    <div className='car-purcash flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>سعر الشراء</p>
                                        <p className='text-3xl font-black text-mainRedColor'>65,000 <span className='text-sm font-normal text-gray-800'>ريال</span></p>
                                        <p className='text-sm text-gray-800 underline'>السعر شامل ضريبة القيمة المضافة</p>
                                    </div>
                                    <div className='car-financing flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>يبدأ القسط من</p>
                                        <p className='text-3xl font-black text-mainRedColor'>2,500 <span className='text-sm font-normal text-gray-800'>ريال / شهرياً</span></p>
                                        <p className='text-sm text-gray-800 underline'>تفاصيل تمويل السيارة</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='car-sub-category bg-white rounded border border-slate-200 shadow-sm p-4 flex flex-col gap-4 justify-center items-center'>
                                <div className=' w-full car-sub-category-image h-40 flex justify-center items-center'>
                                    <img src={black} alt="" className='w-full' />
                                </div>
                                <div className='w-full car-sub-category-name flex justify-center items-center'>
                                    <p className='text-lg font-black'>تويوتا كورولا 1.6 هايبرد</p>
                                </div>
                                <div className=' w-full car-sub-category-pricing flex flex-row justify-between'>
                                    <div className='car-purcash flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>سعر الشراء</p>
                                        <p className='text-3xl font-black text-mainRedColor'>65,000 <span className='text-sm font-normal text-gray-800'>ريال</span></p>
                                        <p className='text-sm text-gray-800 underline'>السعر شامل ضريبة القيمة المضافة</p>
                                    </div>
                                    <div className='car-financing flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>يبدأ القسط من</p>
                                        <p className='text-3xl font-black text-mainRedColor'>2,500 <span className='text-sm font-normal text-gray-800'>ريال / شهرياً</span></p>
                                        <p className='text-sm text-gray-800 underline'>تفاصيل تمويل السيارة</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='car-sub-category bg-white rounded border border-slate-200 shadow-sm p-4 flex flex-col gap-4 justify-center items-center'>
                                <div className=' w-full car-sub-category-image h-40 flex justify-center items-center'>
                                    <img src={white} alt="" className='w-full' />
                                </div>
                                <div className='w-full car-sub-category-name flex justify-center items-center'>
                                    <p className='text-lg font-black'>تويوتا كورولا 1.6 هايبرد</p>
                                </div>
                                <div className=' w-full car-sub-category-pricing flex flex-row justify-between'>
                                    <div className='car-purcash flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>سعر الشراء</p>
                                        <p className='text-3xl font-black text-mainRedColor'>65,000 <span className='text-sm font-normal text-gray-800'>ريال</span></p>
                                        <p className='text-sm text-gray-800 underline'>السعر شامل ضريبة القيمة المضافة</p>
                                    </div>
                                    <div className='car-financing flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>يبدأ القسط من</p>
                                        <p className='text-3xl font-black text-mainRedColor'>2,500 <span className='text-sm font-normal text-gray-800'>ريال / شهرياً</span></p>
                                        <p className='text-sm text-gray-800 underline'>تفاصيل تمويل السيارة</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='car-sub-category bg-white rounded border border-slate-200 shadow-sm p-4 flex flex-col gap-4 justify-center items-center'>
                                <div className=' w-full car-sub-category-image h-40 flex justify-center items-center'>
                                    <img src={silver} alt="" className='w-full' />
                                </div>
                                <div className='w-full car-sub-category-name flex justify-center items-center'>
                                    <p className='text-lg font-black'>تويوتا كورولا 1.6 هايبرد</p>
                                </div>
                                <div className=' w-full car-sub-category-pricing flex flex-row justify-between'>
                                    <div className='car-purcash flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>سعر الشراء</p>
                                        <p className='text-3xl font-black text-mainRedColor'>65,000 <span className='text-sm font-normal text-gray-800'>ريال</span></p>
                                        <p className='text-sm text-gray-800 underline'>السعر شامل ضريبة القيمة المضافة</p>
                                    </div>
                                    <div className='car-financing flex flex-col gap-2'>
                                        <p className='text-sm font-black text-gray-800'>يبدأ القسط من</p>
                                        <p className='text-3xl font-black text-mainRedColor'>2,500 <span className='text-sm font-normal text-gray-800'>ريال / شهرياً</span></p>
                                        <p className='text-sm text-gray-800 underline'>تفاصيل تمويل السيارة</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>

                {
                    carsGallery.length >= 1 && <>
                        <Sectionheading heading={t('carGallary')} /> <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-8'>
                            <Gallery imagesArray={carsGallery} />
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default CarShow