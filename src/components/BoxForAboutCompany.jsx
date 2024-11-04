function BoxForAboutCompany(props) {
    return (
        <div className='w-full flex justify-center my-8 ' id={props.boxDivId}>
            <div className={`w-full box flex lg:${props.flexRowStyle} flex-col-reverse justify-evenly gap-4 p-4`} data-aos="fade">
                <div className='box-data flex flex-col gap-8'>
                    <p className='box-data-heading font-black text-mainRedColor text-3xl'>{props.boxDataTitle}</p>
                    <p className='box-data-description text-justify max-w-lg leading-8'>{props.boxDataDescription}</p>
                </div>
                <div className='box-image w-full lg:w-[32rem] h-96 rounded-md relative flex justify-center items-center'>
                    <img src={props.boxImage} alt="" className={`${props.width} ${props.height} rounded-md`} />
                    <div className={`overlay absolute w-full h-full ${props.overLayBg} opacity-20 top-0 rounded-md`}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxForAboutCompany;