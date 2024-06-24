import React, { useState } from 'react';
import img from "../imgs/img"; // Adjust the path according to your file structure

function About() {
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);


  return (
    <div className="pt-[17rem] bg-gray-800 pb-[17rem] font-mono">
      <div className='m-auto'>
        <div className='text-white'>
          <div className='mb-14 text-center font-semibold text-4xl'>OUR TEAM MEMBERS</div>
          <div className='flex flex-wrap justify-center gap-5'>
            <div 
              className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gradient-to-b from-black via-red-800 to-black hover:opacity-100 bg-gray-900 relative'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
              <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                <img src={hovered ? img.patrick2 : img.patrick} alt="member" className='w-fit h-fit object-contain border-none'/>
              </div>
              {
                hovered && (
                  <>
                    <div id='patrick_knife' className=' z-10'>
                      <img src={img.knife} className='size-[15rem] relative' alt="" />
                    </div>
                    <div className=' absolute top-0'>
                      <img src={img.blood} alt="" />
                    </div>
                    <div className=' absolute bottom-0 transform rotate-180'>
                      <img src={img.blood} alt="" />
                    </div>
                    <div className='absolute top-[13rem] text-gray-800 bg-gray-200 p-1 rounded-xl right-[3.5rem] text-base transform -rotate-[20deg]'>
                      Hey <span className='line-through text-red-800'>Paul</span>🪓
                    </div>
                  </>
                )
              }
              <div className='text-xl group-hover:font-semibold group-hover:italic'>Phuc</div>
              {/* <div className='text-xl opacity-0 -translate-x-14 group-hover:opacity-100 group-hover:translate-x-0 transform transition-all duration-500 text-center'>(AKA Ryan)</div> */}
              <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center group-hover:text-red-500 group-hover:font-extrabold'>Web Developer</div>
            </div>

            <div 
              className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gradient-to-b from-orange-800 via-black to-orange-800 hover:opacity-100 bg-gray-900 relative'
              onMouseEnter={() => setHovered2(true)}
              onMouseLeave={() => setHovered2(false)}>
              <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                <img src={hovered2 ? img.devil_ronaldo : img.tuan_anh} alt="member" className='w-fit h-fit object-contain border-none'/>
              </div>
              {
                hovered2 && (
                  <>
                    {/* <div className=' absolute top-[4.5rem] left-5 z-10'>
                      <img src={img.left_horn} className=' size-[5rem]' alt="" />
                    </div>
                    <div className=' absolute top-[4.5rem] right-4 z-10'>
                      <img src={img.right_horn} className=' size-[5rem]' alt="" />
                    </div> */}
                    <div className=' absolute top-0 transform rotate-180'>
                      <img src={img.fire} className='' alt="" />
                    </div>
                    <div className=' absolute bottom-0'>
                      <img src={img.fire} alt="" />
                    </div>
                    <div className=' absolute bottom-4 size-[9rem]' id='siuu'>
                      <img src={img.siu} alt="" />
                    </div>
                  </>
                )
              }
              <div className='text-xlc group-hover:italic group-hover:font-semibold'>Tuan Anh</div>
              <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center group-hover:text-orange-600 group-hover:font-semibold'>AI Analyst & Tester</div>
            </div>

            <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
              <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                <img src={img.nguyen} alt="member" className='w-fit h-fit object-contain border-none'/>
              </div>
              <div className='text-xl'>Nguyen</div>
              <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>Backend & API searcher</div>
            </div>
            <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
              <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                <img src={img.huy} alt="member" className='w-fit h-fit object-contain border-none'/>
              </div>
              <div className='text-xl'>Huy</div>
              <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>AI Trainer</div>
            </div>
            <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
              <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                <img src={img.ngan} alt="member" className='w-fit h-fit object-contain border-none'/>
              </div>
              <div className='text-xl'>Ngan</div>
              <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>Mobile Developer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
