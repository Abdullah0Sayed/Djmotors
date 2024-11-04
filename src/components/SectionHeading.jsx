function Sectionheading(props) {
    return (
        <div className="section-heading-container my-6">
            <div className="section-heading sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto flex justify-center items-center">
                <p className={` font-bold ${props.textColor ? props.textColor : 'text-gray-300'} ${props.textSize ? props.textSize : 'text-2xl'} ${props.position}` } >{props.heading}</p>
            </div>
        </div>
    );
}


export default Sectionheading;