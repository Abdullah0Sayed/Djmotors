import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

import googleIcon from '../images/icons/google.png';
import { useTranslation } from 'react-i18next';

function Reviews({ reviews }) {
  const {t} = useTranslation();
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={16}
      breakpoints={{
        640: { slidesPerView: 1 },  // عرض واحد على الشاشات الصغيرة
        768: { slidesPerView: 2 },  // عرض شريحتين على الشاشات المتوسطة
        1024: { slidesPerView: 3 }, // عرض 3 شرائح على الشاشات الكبيرة
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,  // إيقاف التشغيل التلقائي عند الوقوف على الـ Slide
      }}
      loop={true}
      
      
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.username}>
          <div className='review w-full sm:w-80 md:w-96 h-56 bg-white rounded border border-slate-100 shadow-sm p-2 flex flex-col justify-between items-center gap-2 transition-all duration-300 delay-100 hover:scale-90'>
            <div className='w-full review-user-name flex flex-row gap-2'>
              <p className='font-bold'>{t('reviewBy')} : </p>
              <p className='font-bold'>{review.username}</p>
            </div>
            <div className='w-full review'>
              <p className='text-sm text-justify text-gray-600'>{review.review}</p>
            </div>
            <div className='flex flex-row gap-2 self-end'>
              <div className='review-icon w-6 h-6 rounded-full bg-slate-200 flex justify-center items-center'>
                <img src={googleIcon} alt="" />
              </div>
              <p className='text-sm text-mainRedColor font-bold opacity-70'>{t('reviewPlatform')}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Reviews;
