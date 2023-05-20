"use client"
import { Logo } from '@/components/assets'
import Image from 'next/image'
import { NavbarArray, typeOfNav } from '@/components/utils/NavbarArray'
import Link from 'next/link'
import Button from '@/components/shared/Button'
import { useEffect, useState } from 'react'
import { userCredentialType } from '@/components/utils/LoginSignupTypes'
import Hamburger from '@/components/assets/images/Hamburger'

const Navbar = () => {
    const [isLoggedInWithData, setLoggedInWithData] = useState<userCredentialType>();
    const [isNavOpen, setIsNavOpen] = useState(false);


    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    function handleLogOut() {
        localStorage.clear();
        location.reload();
    }

    useEffect(() => {
        let userCredentials = localStorage.getItem("userCredentials");
        if (userCredentials) {
            setLoggedInWithData(JSON.parse(userCredentials));
        }
    }, []);

    return (
        <nav className="bg-navbarColor py-2 md:py-1 border-b sticky top-0 left-0 right-0">
            <div className='max-w-7xl mx-auto grid grid-cols-[1fr,auto] items-center px-4'>
                <Link target='_blank' href={"https://abdulbasit-self.vercel.app/"} className='w-40'>
                    <Image src={Logo} alt='abdul-basit' />
                </Link>
                <div className='hidden md:flex items-center space-x-8'>
                    <ul className='flex space-x-2'>
                        {
                            NavbarArray.map((item: typeOfNav, index: number) => (
                                <li key={index} className='text-lg text-gray-700 hover:bg-slate-200 px-4 py-1 duration-300 rounded-md'>
                                    <Link href={item.href}>{item.label}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    {isLoggedInWithData ?
                        <div className='cursor-pointer relative group uppercase border text-gray-200 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center'>
                            {isLoggedInWithData.fullname.slice(0, 1)}
                            <div className='bg-white px-8 py-4 cursor-default space-y-3 border-t mt-[11.8rem] shadow-2xl mr-28 text-gray-800 text-sm normal-case absolute invisible -translate-y-2 group-hover:duration-300 group-hover:visible group-hover:translate-y-0'>
                                <h2><b>Email: </b> {isLoggedInWithData.email}</h2>
                                <p><b>WT ID: </b> {isLoggedInWithData.uniqueid}</p>
                                <button onClick={handleLogOut} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-500">
                                    Sign out
                                </button>
                            </div>
                        </div>
                        :
                        <div className='space-x-2 flex items-center'>
                            <div className='min-w-[4.8rem]'>
                                <Button text='Sign Up' hrefB='/signup' isBackgroud={true} />
                            </div>
                            <div className='min-w-[4.8rem]'>
                                <Button text='Log In' hrefB='/login' isBackgroud={false} />
                            </div>
                        </div>
                    }
                </div>


                <div className="mr-4 flex md:hidden">
                    <button
                        onClick={toggleNav}
                        type="button"
                        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isNavOpen ? (
                            <Hamburger />
                        ) : (
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </button>
                </div>


            </div>


            {isNavOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NavbarArray.map((navItem) => (
                            <Link className="text-gray-600 hover:bg-purple-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium" key={navItem.label} href={navItem.href}>
                                {navItem.label}
                            </Link>
                        ))}
                        {isLoggedInWithData ? (
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-purple-400">
                                            {isLoggedInWithData.fullname}
                                        </div>
                                        <div className="text-sm font-medium leading-none text-gray-600">
                                            {isLoggedInWithData.email}
                                        </div>
                                        <div className="text-sm font-medium leading-none text-gray-600">
                                            <b>WT ID: </b> {isLoggedInWithData.uniqueid}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <button onClick={handleLogOut} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-500">
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        ) :
                            <div className='w-full'>
                                <Link href="/signup" className="text-gray-600 hover:bg-purple-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium" >Sign Up</Link>
                                <Link href="/login" className="text-gray-600 hover:bg-purple-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium" >Sign In</Link>
                            </div>
                        }
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar