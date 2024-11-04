import React, { useEffect, useState } from 'react'

const According = (props) => {

    const [accordingOpen , setAccordingOpen] = useState(false)

    useEffect(()=>{
        setAccordingOpen(true)
    } , [])
  return (
    <div className='p-2 bg-white shadow-sm rounded-md flex flex-col gap-2 border border-slate-100 cursor-pointer' onClick={()=>{
        setAccordingOpen(!accordingOpen);
    }}>
        <button  className={`w-full flex justify-between p-2 ${!accordingOpen ? 'bg-slate-100' : ''}`}>
            <p className='text-mainRedColor text-sm font-black'>{props.quesTitle}</p>
            {accordingOpen ? <span className='text-lg text-mainRedColor font-black'>+</span> : <span className='text-lg text-mainRedColor font-black'>-</span>}
        </button>
        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-400 w-full text-sm ${!accordingOpen ? 'grid-rows-[1fr] opacity-100' : ' grid-rows-[0fr] opacity-0'}`}>
            <div className='overflow-hidden p-1 '>
                <div className='w-full flex flex-col gap-2'>
                    {props.quesAnswer ? props.quesAnswer.map((ans , index)=>{return(<p key={index} className='border border-transparent border-b-gray-100 p-2'>{ans}</p>)}) : ''}
                </div>
            </div>
        </div>
    </div>
  )
}

export default According