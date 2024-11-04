// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import Marquee from 'react-fast-marquee';
import { useDispatch, useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// End

// Import Assets / Images

// End

// Import Componets 
import { fetechAllCarBrands } from '../rtk/slicers/carBrandsSlicer';
// End

// Import Css Files

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
// End



function SwiperHomeComponenet() {

    const { brands , status , error } = useSelector((state)=>state.carBrands);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetechAllCarBrands());
    } , []);

    const { t } = useTranslation();
    return (
        <div className="mqrquee-home-component-container my-4">
            <div className="mqrquee-home-component sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto  gap-2 ">
               {
                status == 'loading' ? <div className='flex justify-center items-center'>
                    <InfinitySpin
                visible={true}
                width="200"
                color="#FF0000"
                ariaLabel="infinity-spin-loading"
                />
                </div> :  
                 <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                 spaceBetween={10}
                 slidesPerView={12}
                 zoom={true}
                 autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,  // إيقاف التشغيل التلقائي عند الوقوف على الـ Slide
                  }}
                 loop={true}
                 onSwiper={(swiper) => console.log(swiper)}
                 onSlideChange={() => console.log('slide change')}>
            
             {brands.map((brand) => (
                
                    <SwiperSlide>
                        <Link to={`/brands/${brand.car_brand_name_en}`}>
                            <div className='w-24 h-24  flex justify-center items-center bg-white rounded-md shadow border border-slate-300 hover:translate-y-2 transition-all duration-100 ease-in'>
                                <img key={brand.id} src={brand.car_brand_image_path} className="w-16 opacity-100" alt={brand.car_brand_name_en} />                        
                            </div>
                        </Link>
                    </SwiperSlide>
               
                    
                ))}
             
             
            
         </Swiper>
                
               }
               
                
                <div className='flex justify-center items-center my-4'>
                    <button className='show-more-brands relative w-56 h-12 bg-red-400 hover:bg-mainRedColor rounded-full flex justify-center items-center text-white text-sm font-bold'>
                       <Link to={'/brands'}>{t('see-all-brands')}</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SwiperHomeComponenet;