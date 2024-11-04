import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';


function OfferCard(props) {

    const {t} = useTranslation();


    return (
        <Link to={`/offers/${props.offer_id}`}>
        
            <div className='offer-card rounded-md p-4 w-96 h-[28rem] bg-white shadow-md flex flex-col gap-4'>
                <div className='card-image h-96'>
                    <img src={props.offerImage} alt="" className='w-full h-full'/>
                </div>
                <p className='offer-expiry text-mainRedColor font-bold text-sm'> {props.offerDayLeft} {t('remainingText')} </p>
                <p className='text-lg font-bold offer-title'>{props.offerTitle}</p>
                <p className='text-sm offer-description text-justify text-gray-600'>{props.offerDescription}</p>
                <div className='flex justify-center items-center'>
                    <button className='px-4 py-2 rounded-sm bg-mainRedColor text-white font-bold text-sm'>{t('offerDetailsBtn')}</button>
                </div>
            </div>
    </Link>
    );
    
}


export default OfferCard;