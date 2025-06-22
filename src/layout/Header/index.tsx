import { useNavigate } from 'react-router-dom';
import { useAppSelector, } from '../../redux/store';
import type { RootState } from '../../redux/store';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import LogoutButton from "../../components/LogoutButton"
import Logo from '../../assets/logo.png'



const Header = () => {
    const user = useAppSelector((state: RootState) => state.auth.data);
    const navigate = useNavigate()

    return (
        <div className="absolute w-full top-6 right-0 flex gap-3 px-6">

            <div className='flex justify-between w-full'>
                <button
                    className="flex items-center text-2xl font-bold text-blue-900 border-0"
                    onClick={() => navigate('/')}
                >
                    <img src={Logo} alt='' className='w-[45px] h-[45px]' />
                    Smile Bright
                </button>
                {user ? (
                    <LogoutButton>Logout</LogoutButton>
                ) : (
                    <>
                        <div className='flex gap-3'>
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-2xl transition"
                            >
                                <FaSignInAlt /> Login
                            </button>
                            <button
                                onClick={() => navigate('/create-account')}
                                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-2xl transition"
                            >
                                <FaUserPlus /> Create Account
                            </button>
                        </div>

                    </>
                )}
            </div>
        </div>
    )
}

export default Header