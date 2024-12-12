import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import appLogo from '/blogshareIcon.png'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useUser } from '../custom hook/useUser'
import { serverInstance } from '../service/api'
import { IResponse } from '../utility/types'
import { BtnSize, LoaderType, ResponseStatus } from '../constants/enum'
import { userInitObj } from '../service/context'
import { ButtonLoader } from '../components/ButtonLoader'
import useErrorObject from '../custom hook/useErrorObject'
import { apiEndPoint, VITE_APP } from '../constants/endpoints'
function Home() {
    const { setUserState, onSearch, dSearch, userState } = useUser()
    const handleApiError = useErrorObject()
    const location = useLocation()
    const navigate = useNavigate()
    const [isHome, setIsHome] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsHome(false)
        } else {
            setIsHome(true)
        }
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            onSearch('');
        };
    }, [location.pathname]);


    async function logout(e: MouseEvent<HTMLButtonElement>) {
        setLoading(true)
        e.preventDefault()
        try {
            const response = (await serverInstance.post<IResponse>(apiEndPoint.logout)).data
            if (response.status === ResponseStatus.SUCCESS) {
                localStorage.removeItem(VITE_APP);
                setUserState(userInitObj);
                navigate('/login', { replace: true });
            }
        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }

    function onSearchInput(e: ChangeEvent<HTMLInputElement>) {
        onSearch(e.target.value)
    }

    return (
        <>
            <div className="drawer bg-gradient-to-bl from-emerald-500 to-emerald-300 mb ">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <header className="navbar w-full py-4 md:py-8 ">
                        <div className="flex-none sm:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>

                        <div className="flex items-center gap-2 text-black  font-bold text-lg md:text-3xl w-full">
                            <img
                                src={appLogo}
                                alt="BlogShare Logo"
                                className="w-8 h-8 xs:w-10 xs:h-10 object-contain xs:ml-2"
                            />
                            <Link to={'/'}>
                                BlogShare
                            </Link>
                            <input
                                className="focus:outline-none bg-gray-50 border border-gray-200 rounded-lg text-xs xs:text-sm py-2 font-normal px-2"
                                placeholder="search"
                                type="search"
                                name="search"
                                value={dSearch}
                                onChange={onSearchInput}
                                hidden={!isHome}
                            />

                        </div>

                        <div className="hidden flex-none sm:block ">
                            <ul className="menu menu-horizontal  gap-4">
                                <li className='p-1   font-bold  transition duration-100 hover:text-emerald-500'><Link to={`/blogs`}>My Blog</Link></li>
                                <li className='p-1   font-bold  transition duration-100 hover:text-emerald-500'><Link to={'/write'}>Create Blog</Link></li>
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-accent opacity-45 btn-sm relative top-1 rotate-90 ">
                                        <span className="block w-0.5 h-1 bg-current rounded-full"></span>
                                        <span className="block w-0.5 h-1 bg-current rounded-full"></span>
                                        <span className="block w-0.5 h-1 bg-current rounded-full"></span>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content bg-emerald-200 menu gap-3 rounded-box z-40 w-52 p-2 shadow">
                                        <li>
                                            <div className=' capitalize font-bold p-2'>{userState.name}</div>
                                        </li>
                                        <li>
                                            {
                                                loading ?
                                                    (
                                                        <ButtonLoader btnSize={BtnSize.SM} loader={LoaderType.SPINNER} />
                                                    )
                                                    :
                                                    (
                                                        <button onClick={logout} className='btn btn-neutral'>Log out</button>
                                                    )
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </ul>

                        </div>
                    </header>
                </div>
                <div className="drawer-side z-40 ">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-emerald-200 min-h-full w-80 p-4">
                        <li><Link to={'/'} >Home</Link></li>
                        <li><Link to={`/blogs`}>My Blog</Link></li>
                        <li><Link to={'/write'}>Create Blog</Link></li>
                        <li><button onClick={logout} className='btn btn-neutral mt-10' type="button">Log out</button></li>
                    </ul>
                </div>
            </div>
            <section className={`${isHome ? 'mx-auto max-w-screen-2xl px-4 md:px-8' : 'hidden'}`}>
                <div className="mb-8 flex flex-wrap justify-between md:mb-16">
                    {/* left section with heading */}
                    <div className=" xs:relative top-16 lg:top-0 mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0  sm:w-2/5 lg:pb-24 lg:pt-48">
                        <h1 className="mt-4 xs:mt-0 mb-4 text-3xl font-bold text-black md:mb-8 title">
                            Where Ideas Meet Words Conversations Begin.
                        </h1>
                        <i className="max-w-md leading-loose font-semibold text-gray-500 xl:text-lg">
                            "Engage with your readers' emotions and inspire them to make positive changes in their lives and habits."
                        </i>
                    </div>

                    {/* right section with images */}
                    <div className="flex w-full md:mb-16 sm:w-3/5 mt-10">
                        <div className="relative left-12 top-12 -ml-10 overflow-hidden rounded-lg shadow-lg md:left-16 md:top-16 lg:ml-0">
                            <img
                                src="https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png"
                                alt="Blog Images (Stock Photo)"
                                className="h-full w-96 object-cover "
                            />
                        </div>

                        <div className="overflow-hidden z-10 rounded-lg shadow-lg">
                            <img
                                src="https://www.ryrob.com/wp-content/uploads/2022/02/iStock-956891332.jpg"
                                alt="Blog Images (Stock Photo)"
                                className="h-full w-96 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Outlet />
        </>
    )
}


export default Home