import Header from '../../layout/Header';
import BookingForm from './components/BookingForm';


const BookAppointment = () => {
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
            <Header />
            <BookingForm />
        </div>
    );
};

export default BookAppointment;
