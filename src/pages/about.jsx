import React, { useState } from 'react';
import img from "../imgs/img"; // Adjust the path according to your file structure

function About() {
  const [about, setabout] = useState("");

  return (
    <div className="pt-[17rem] bg-gray-800 pb-[17rem] font-mono">
      <div className='m-auto'>
        {
          about ? (
            <>
              {
                about === "member" ? (
                  <div className='text-white border-2 border-red-500'>
                    <button className='mb-10 rounded-2xl border-[1px] py-3 px-7' onClick={()=>setabout("")}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                      </svg>
                    </button>
                    <div className='flex flex-wrap justify-center gap-5'>
                      <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
                        <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                          <img src={img.patrick} alt="member" className='w-fit h-fit object-contain border-none'/>
                        </div>
                        <div className='text-xl'>Phuc</div>
                        <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>(AKA Ryan)</div>
                        <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>Web Developer</div>
                      </div>

                      <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
                        <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                          <img src={img.tuan_anh} alt="member" className='w-fit h-fit object-contain border-none'/>
                        </div>
                        <div className='text-xl'>Tuan Anh</div>
                        <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>AI Analyst & Tester</div><br></br>
                      </div>

                      <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
                        <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                          <img src={img.nguyen} alt="member" className='w-fit h-fit object-contain border-none'/>
                        </div>
                        <div className='text-xl'>Nguyen</div>
                        <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>AI Trainer</div><br></br>
                      </div>
                      <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
                        <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                          <img src={img.huy} alt="member" className='w-fit h-fit object-contain border-none'/>
                        </div>
                        <div className='text-xl'>Huy</div>
                        <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>AI Trainer</div><br></br>
                      </div>
                      <div className='group min-w-[15rem] h-[30rem] flex flex-col justify-center gap-3 items-center opacity-70 hover:bg-gray-600 hover:opacity-100 bg-gray-900'>
                        <div className='rounded-full w-[8rem] h-[8rem] overflow-hidden'>
                          <img src={img.anonoymous} alt="member" className='w-fit h-fit object-contain border-none'/>
                        </div>
                        <div className='text-xl'>Ngan</div>
                        <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center'>Mobile Developer</div><br></br>
                      </div>
                    </div>
                  </div>
                ) : about === "team" ? (
                  <div className='text-white'>
                    <button className='mb-10 rounded-2xl border-[1px] py-3 px-7' onClick={()=>setabout("")}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                      </svg>
                    </button>
                    <div>Team Content</div>
                  </div>
                ) : (
                  <div>Default Content</div>
                )
              }
            </>
          ) : (
            <>
              <div className='flex flex-wrap text-white justify-center gap-[5rem]'>
                <div 
                  className='group px-[5rem] py-[13rem] rounded-3xl hover:cursor-pointer bg-blue-900 hover:bg-blue-500 text-4xl opacity-70 hover:opacity-100' 
                  onClick={() => setabout("member")}
                >
                  <div className='transform group-hover:scale-150 group-hover:rotate-12 transition-transform duration-300'>
                    OUR MEMBERS
                  </div>
                </div>
                <div 
                  className='group px-[5rem] py-[13rem] rounded-3xl hover:cursor-pointer bg-green-900 hover:bg-green-500 text-4xl opacity-70 hover:opacity-100' 
                  onClick={() => setabout("team")}
                >
                  <div className='group-hover:scale-150 group-hover:rotate-12 transition-all duration-300 transform'>
                    OUR SERVICES
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default About;
