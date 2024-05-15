import React from 'react'
import {useNavigate} from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate();
  return (
    <div className='bg-gray-700'>
        <div className='md:m-auto flex flex-col flex-wrap text-wrap w-auto h-auto' style={{maxWidth:"1450px"}} >
            <div className="flex justify-around items-center pt-4 pb-4 font-mono flex-wrap text-white">
                <div className='flex md:flex-row flex-col md:gap-12 gap-2 lg:p-0 md:text-lg text-sm'>
                    <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={()=> navigate("/")}>HOME</div>
                    <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700'>PRODUCT</div>
                    <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={()=> navigate("/solution")}>SOLUTION</div>
                    <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={() => navigate("/integration")}>INTERGRATION</div>
                    <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700'>CONTACT</div>
                </div>
                {/* <div className='flex rounded-lg pl-3 pr-3 pt-1 pb-1 md:mt-0 mt-4 bg-yellow-300 gap-2 hover:cursor-pointer flex-wrap' onClick={() => navigate("/integration")}>
                    <div className=''>GET STARTED</div>
                    <svg className='w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </div> */}
            </div>
        </div>
    </div>
  )
}
