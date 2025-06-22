import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../../layout/Header';

interface Dentist {
    id: string;
    name: string;
}

interface TimeSlot {
    id: string;
    time: string;
}

const BookAppointment = () => {
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const [selectedDentist, setSelectedDentist] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{id: 'id1', time: '1:00'}, {id: 'id2', time: '1:00'}, {id: 'id3', time: '1:00'}, {id: 'id4', time: '1:00'}]);
    const [selectedSlot, setSelectedSlot] = useState<string>('');

    // Fetch dentists on page load
    useEffect(() => {
        axios.get('http://localhost:5000/api/dentists')
            .then(response => setDentists(response.data))
            .catch(error => console.error('Error fetching dentists:', error));
    }, []);

    // Fetch available slots when dentist and date are selected
    useEffect(() => {
        if (selectedDentist && selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0]; // yyyy-mm-dd
            axios.get(`http://localhost:5000/api/dentists/${selectedDentist}/slots?date=${formattedDate}`)
                .then(response => setTimeSlots(response.data))
                .catch(error => console.error('Error fetching slots:', error));
        }
    }, [selectedDentist, selectedDate]);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDentist || !selectedDate || !selectedSlot) return alert('Please complete all selections.');

        axios.post('http://localhost:5000/api/bookings', {
            dentistId: selectedDentist,
            slotId: selectedSlot,
            date: selectedDate.toISOString().split('T')[0] // Send date to backend
        })
            .then(() => alert('Appointment successfully booked!'))
            .catch(error => console.error('Booking failed:', error));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
            <Header />
            <form onSubmit={handleBooking} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Book an Appointment</h2>

                {/* Dentist Selection */}
                <label className="block mb-2 text-gray-700">Select Dentist</label>
                <select
                    value={selectedDentist}
                    onChange={(e) => setSelectedDentist(e.target.value)}
                    required
                    className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">-- Choose Dentist --</option>
                    {dentists.map(dentist => (
                        <option key={dentist.id} value={dentist.id}>{dentist.name}</option>
                    ))}
                </select>

                {/* Date Picker */}
                <label className="block mb-2 text-gray-700">Select Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                        if (date) {
                            setSelectedDate(date);
                        }
                    }}
                    minDate={new Date()}
                    placeholderText="Select a date"
                    className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Available Slots */}
                {timeSlots.length > 0 && (
                    <>
                        <label className="block mb-2 text-gray-700">Available Time Slots</label>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {timeSlots.map(slot => (
                                <button
                                    type="button"
                                    key={slot.id}
                                    onClick={() => setSelectedSlot(slot.id)}
                                    className={`p-3 rounded-xl border ${selectedSlot === slot.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                    Book Appointment
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;
