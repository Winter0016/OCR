import React, { useState } from 'react';
import img from "../imgs/img"; // Adjust the path according to your file structure

function About() {
  const [about, setabout] = useState("");
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);


  return (
    <div className="pt-[17rem] bg-gray-800 pb-[17rem] font-mono">
      <div className='m-auto'>
        {
          about ? (
            <>
              {
                about === "member" ? (
                  <div className='text-white'>
                    <button className='mb-10 rounded-2xl border-[1px] py-3 px-7 ml-14 hover:bg-black' onClick={()=>setabout("")}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                      </svg>
                    </button>
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
                            </>
                          )
                        }
                        <div className='text-xl group-hover:font-semibold group-hover:italic'>Phuc</div>
                        <div className='text-xl opacity-0 -translate-x-14 group-hover:opacity-100 group-hover:translate-x-0 transform transition-all duration-500 text-center'>(AKA Ryan)</div>
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
                              <div className=' absolute top-[4.5rem] left-5 z-10'>
                                <img src={img.left_horn} className=' size-[5rem]' alt="" />
                              </div>
                              <div className=' absolute top-[4.5rem] right-4 z-10'>
                                <img src={img.right_horn} className=' size-[5rem]' alt="" />
                              </div>
                              <div className=' absolute top-0 transform rotate-180'>
                                <img src={img.fire} className='' alt="" />
                              </div>
                              <div className=' absolute bottom-0'>
                                <img src={img.fire} alt="" />
                              </div>
                              <div className=' absolute bottom-4 size-[10rem]' id='siuu'>
                                <img src={img.siu} alt="" />
                              </div>
                            </>
                          )
                        }
                        <div className='text-xlc group-hover:italic group-hover:font-semibold'>Tuan Anh</div>
                        <div className='text-xl opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-500 text-center group-hover:text-red-500 group-hover:font-semibold'>AI Analyst & Tester</div><br></br>
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
                          <img src={img.ngan} alt="member" className='w-fit h-fit object-contain border-none'/>
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
                  <div className='group-hover:scale-150 group-hover:rotate-12 transition-all duration-300 transform'>
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
