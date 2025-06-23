import { useEffect, useState } from 'react';
import axios from 'axios';
import SelectDentist from './SelectDentist';
import CustomDatePicker from './CustomDatePicker';
import AvailableSlots from './AvailableSlots';

interface Dentist {
    id: string;
    name: string;
}

interface TimeSlot {
    id: string;
    time: string;
}

const BookingForm = () => {
    const [dentists, setDentists] = useState<Dentist[]>([{ id: 'id2', name: 'Dr. Kwak Kwak' }, { id: 'id2', name: 'Dr. Strange' }]);
    const [selectedDentist, setSelectedDentist] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    console.log('Selected Date:', selectedDate)
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ id: 'id1', time: '1:00' }, { id: 'id2', time: '1:00' }, { id: 'id3', time: '1:00' }, { id: 'id4', time: '1:00' }]);
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
        < form onSubmit={handleBooking} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-5xl" >
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Book an Appointment</h2>
            <SelectDentist data={dentists} value={selectedDentist} onChange={(e) => setSelectedDentist(e.target.value)} />
            <CustomDatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
            />
            <AvailableSlots 
            data={timeSlots}
            selectedSlot={selectedSlot}
            selectedDate={selectedDate}
            clickSelectedSlot={setSelectedSlot}
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                Book Appointment
            </button>
        </form >
    )
}

export default BookingForm;