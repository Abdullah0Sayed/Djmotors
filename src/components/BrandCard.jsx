import Aos from 'aos';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetechAllCarBrands } from '../rtk/slicers/carBrandsSlicer';
import 'aos/dist/aos.css';

function BrandCard(props) {
    const { brands, status, error } = useSelector(state => state.carBrands);
    const dispatch = useDispatch();

    return (
        <Link 
            to={`/brands/${props.brand_name_en}`} 
            state={{ brand_uuid: props.brand_uuid }}
        >
            <div className="brand-col w-40 h-40 bg-white border cursor-pointer hover:bg-gray-100 rounded-sm flex flex-col justify-center items-center gap-2 relative" data-aos="fade">
                <img src={props.image} alt="" className="w-16 justify-self-center" />
                <p className="text-lg font-bold text-gray-300 justify-self-end absolute bottom-4">
                    {props.lang === 'ar' ? props.brand_name_ar : props.brand_name_en}
                </p>
            </div>
        </Link>
    );
}

export default BrandCard;
