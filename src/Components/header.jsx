import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase-config';
import img from '../imgs/img';
import { doSignOut } from '../Firebase/auth';

export const Header = () => {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`bg-gray-700 fixed w-full header ${isHidden ? 'hidden' : ''}`}>
            <div className='md:m-auto flex flex-col flex-wrap text-wrap w-auto h-auto' style={{maxWidth:"1450px"}} >
                <div className="flex gap-16 justify-center items-center pt-4 font-mono flex-wrap text-white pb-4 pl-[7rem]">
                    <img className=" w-[6rem] fill-yellow-300" src={img.logo} alt="" />
                    <div className='flex md:flex-row flex-col md:gap-12 gap-2 lg:p-0 md:text-lg text-sm'>
                        <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={()=> navigate("/")}>HOME</div>
                        <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700'>PRODUCT</div>
                        <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={()=> navigate("/solution")}>SOLUTION</div>
                        <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={() => navigate("/integration")}>INTEGRATION</div>
                        <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700'>ABOUT US</div>
                        {
                            auth?.currentUser?.email && auth?.currentUser?.emailVerified ? (
                                <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={()=>navigate("/history")}>HISTORY</div>
                            ) :(
                                <></>
                            )
                        }
                    </div>
                    {
                        auth?.currentUser?.email && auth?.currentUser?.emailVerified ? (
                            <div className='flex flex-row md:text-lg text-sm flex-1 justify-end items-center'>
                                {
                                    auth.currentUser.photoURL ? (
                                        <>
                                            <img src={auth.currentUser.photoURL} className='size-12' alt="profile pic" />
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-12">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </>
                                    )
                                }
                                <div className='ml-2 mr-10'>{auth.currentUser.displayName}</div>
                                <div className='hover:border-yellow-300 hover:cursor-pointer border-2 p-2 rounded-xl' onClick={doSignOut}>LOG OUT</div>
                            </div>
                        ) : (
                            <div className='flex flex-row gap-10 md:text-lg text-sm flex-1 justify-end'>
                                <div className='hover:border-yellow-300 hover:cursor-pointer border-b-4 border-gray-700' onClick={()=> navigate("/sign")}>LOGIN / SIGN UP</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
