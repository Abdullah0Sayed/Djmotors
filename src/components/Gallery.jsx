import React, { useEffect, useState } from 'react'
import nextIcon from '../images/icons/nextIcon.png'
function Gallery({imagesArray}){

    const [currentIndex , setCurrentIndex] = useState(0);

const setActiveImage = (index)=>{
    setCurrentIndex(index)
}

const nextImage = ()=>{
    const lastImage = currentIndex === imagesArray.length - 1;
    const newIndex = lastImage ? 0 : currentIndex+1;
    setCurrentIndex(newIndex);
}


const prevImage = ()=>{
    const firstlide = currentIndex === 0;
    const newIndex = firstlide ? imagesArray.length-1 : currentIndex-1;
    setCurrentIndex(newIndex);
}

useEffect(() => {
    const interval = setInterval(()=>{
        nextImage();
    }, 4000)
    return () => clearInterval(interval);
   }, [currentIndex]);


  return (
    <div className='w-full grid grid-cols-12 justify-center items-center gap-2'>
        <div className='active-image col-span-12 relative'>
            <div className='w-full h-[28rem] rounded-md'>
                <img src={imagesArray[currentIndex].full_path} alt="" className='w-full h-full rounded-md'/>
            </div>
            <div className='next-slide absolute right-[2%] top-[50%] cursor-pointer' onClick={()=>nextImage()}>
                <img src={nextIcon} alt="" srcset="" className='lg:w-6 w-4'/>
            </div>
            <div className='prev-slide absolute left-[2%] top-[50%] cursor-pointer' onClick={()=>prevImage()}>
                <img src={nextIcon} alt="" srcset="" className='lg:w-6 w-4 rotate-180'/>
            </div>
        </div>
        <div className='image-container h-full col-span-12 flex flex-row gap-4 justify-between items-center'>
            {
                imagesArray.map((image , index)=>{return(<div key={index} className='w-64 h-48 rounded relative bg-black cursor-pointer' onClick={(e)=>{setActiveImage(index)}}><img src={image.full_path} alt="" className='w-full h-full rounded transition-all duration-200 delay-100 object-cover'/> <div className='absolute top-0 w-full h-full bg-black opacity-30 hover:opacity-0'></div></div>)})
            }
        </div>
        {/* <div className='w-full col-span-12 p-2 flex flex-col gap-1 justify-center items-center bg-slate-400'>
           <div className='naming'>
                <span className='text-sm font-black'>{imagesArray[currentIndex].name}</span>
           </div>
           <div className='counting'>
                <span className='text-sm font-black'>{currentIndex + 1} </span> / <span className='text-sm font-black'> {imagesArray.length}</span>
           </div>
        </div> */}
    </div>
  )
}

export default Gallery