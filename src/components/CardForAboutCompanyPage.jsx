function CardForAboutCompany(props) {
    return (

        <div className={`card flex flex-col lg:flex-row items-center ${props.cardBG} rounded-md p-4 gap-4`}>
            <div className={`card-icon ${props.cardIconBG} flex justify-center items-center rounded-md`}>
                <img src={props.cardIcon} alt="" className='w-12 p-2' />
            </div>
            <div className='card-data'>
                <p className='card-data-heading text-lg font-semibold lg:font-black text-gray-700'>{props.cardDataHeading}</p>
                <p className='card-data-description text-justify text-sm hidden lg:block'>{props.cardDataDescription}</p>
            </div>
        </div>
    );
}

export default CardForAboutCompany;