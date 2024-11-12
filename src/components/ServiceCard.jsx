import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';


function ServiceCard(props) {

    const {t} = useTranslation();


    return (
        
        
            <div className='service-card rounded-md w-96 h-96 bg-white shadow-md border border-slate-300 flex flex-col justify-between'>
               
                <div className='w-full h-full  flex flex-col gap-4 p-4 justify-center items-center '>
                    <p className='text-lg font-black text-mainRedColor'>{props.serviceTitle}</p>
                    <p className='text-xs text-justify leading-5'>{props.serviceDescription}</p>
                </div>
                <div className='card-image w-full h-full flex justify-center items-center overflow-hidden'>
                    <img src={props.serviceImage} alt="" className='w-full h-full'/>
                </div>
                <div className='w-full   flex justify-center p-4 items-end'>
                    <button className='w-full bg-transparent text-mainRedColor border border-mainRedColor py-2 px-4 rounded hover:bg-mainRedColor hover:text-white' onClick={props.onButtonClick}>{t('serviceDetailsBtn')}</button>
                </div>
            </div>
    
    );
    
}


export default ServiceCard;