import { axiosInstance } from '../../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, } from '../../redux/store';
import type { RootState } from '../../redux/store';
import { FaSignInAlt, FaUserPlus, FaSmile, FaTooth, FaTeethOpen } from 'react-icons/fa';
import { MdCleaningServices, MdOutlineMedicalServices } from 'react-icons/md';
import { GiToothbrush } from 'react-icons/gi';

const Home = () => {
  const user = useAppSelector((state: RootState) => state.auth.data);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axiosInstance.get("/api/user/logout");

      // Redirect after successful logout
      window.location.href = '/';

    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 relative">

      {/* Top-right auth buttons */}
      <div className="absolute top-6 right-6 flex gap-3">
        {user ? (
          <button
            onClick={logoutUser}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-2xl transition"
          >
            Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Header */}
      <header className="text-center mb-6 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to Smile Bright Dental Clinic</h1>
        <p className="text-lg text-gray-700">Your trusted dental care partner for a healthy, beautiful smile.</p>
        {user && (
          <p className="mt-2 text-blue-800 text-lg font-semibold">
            Hello, {user.firstName}! We're glad to see you.
          </p>
        )}
      </header>

      {/* Services Section */}
      <section className="mb-8 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Our Services</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <MdCleaningServices className="text-blue-500 text-3xl" /> Teeth Cleaning
          </li>
          <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <FaTooth className="text-blue-500 text-3xl" /> Tooth Extraction
          </li>
          <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <FaTeethOpen className="text-blue-500 text-3xl" /> Braces & Orthodontics
          </li>
          <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <FaSmile className="text-blue-500 text-3xl" /> Cosmetic Dentistry
          </li>
          <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <MdOutlineMedicalServices className="text-blue-500 text-3xl" /> Dental Implants
          </li>
          <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <GiToothbrush className="text-blue-500 text-3xl" /> Root Canal Treatment
          </li>
        </ul>
      </section>

      {/* Schedule Appointment */}
      <div className="text-center">
        <button
          onClick={() => navigate('/schedule')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition"
        >
          Schedule an Appointment
        </button>
      </div>
    </div>
  );
};

export default Home;
