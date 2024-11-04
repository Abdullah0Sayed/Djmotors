function AdvantageCard(props) {
    return (
        <div className={`advantage-card h-32 p-4 flex sm:flex-row flex-col justify-center items-center gap-4 rounded ${props.bgColor}`}>
                <img src={props.cardImage} alt="" className={`${props.imgWidth} ${props.imgRotate}`}/>
                <p className={`${props.textSize} font-black ${props.textColor}`}>{props.cardTitle}</p>
        </div>
    );
}


export default AdvantageCard;