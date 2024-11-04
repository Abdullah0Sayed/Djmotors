import { Link } from "react-router-dom";
function BreadCrump(props) {
    return (
        <div className='w-full bg-slate-100 shadow-md p-4'>
                <div className='sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto bg-slate-100 flex flex-row items-center justify-between'>
                    <div>
                        <Link to={props.mainPageUrl} className='text-gray-500 opacity-40'>{props.mainPage}</Link> <span className='text-mainRedColor'> {props.mainPage && '/'} </span> <Link to={props.cuurentPageUrl} className='text-mainRedColor font-bold'>{props.cuurentPage}</Link>
                    </div>

                    {
                        props.searchComponent
                    }
                </div>
        </div>
    );
}


export default BreadCrump;