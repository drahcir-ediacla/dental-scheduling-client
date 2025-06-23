import { useNavigate } from 'react-router-dom';
import { useAppSelector, } from '../../redux/store';
import type { RootState } from '../../redux/store';
import PrimaryButton from '../../components/PrimaryButton';
import Header from '../../layout/Header';
import Services from './components/Services';

const Home = () => {
  const user = useAppSelector((state: RootState) => state.auth.data);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 relative">

      <Header />
      <header className="text-center mb-6 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to Smile Bright Dental Clinic</h1>
        <p className="text-lg text-gray-700">Your trusted dental care partner for a healthy, beautiful smile.</p>
        {user && (
          <p className="mt-2 text-blue-800 text-lg font-semibold">
            Hello, {user.firstName}! We're glad to see you.
          </p>
        )}
      </header>
      <Services />
      <div className="flex gap-3 text-center">
        {user &&
          <PrimaryButton
            onClick={() => navigate(!user ? '/login' : '/appointment-list')}
            className="font-semibold bg-green-600 hover:bg-green-700 transition"
          >
            My Appointment
          </PrimaryButton>
        }
        <PrimaryButton
          onClick={() => navigate(!user ? '/login' : '/book-appointment')}
          className="font-semibold transition"
        >
          Schedule an Appointment
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Home;
