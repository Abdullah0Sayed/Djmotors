
import { Link } from "react-router-dom";

function CarTypeComponenet(props) {




    
    return(

        <Link to={`/brands/${props.brandName}/${props.carType}`} state={{ brand_id: props.brandId , brand_type_id: props.brand_type_id }}>
            <div className='car-card-link p-4 flex flex-col justify-center items-center gap-2 hover:bg-slate-50 '>
                
                <div className='car-image h-80 flex justify-center items-center '>
                    <img src={props.carTypeImage} alt="" srcset="" className='w-full h-full' />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-2xl font-black text-slate-800'>{props.carTypeTitle}</p>
                </div>
            </div>
        </Link>

    );
}

export default CarTypeComponenet;