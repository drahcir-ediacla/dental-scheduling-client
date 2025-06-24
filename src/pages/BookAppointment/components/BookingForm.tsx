import React, { useEffect, useState } from 'react';
import { useAppSelector, } from '../../../redux/store';
import type { RootState } from '../../../redux/store';
import axios from 'axios';
import SelectDentist from './SelectDentist';
import CustomDatePicker from './CustomDatePicker';
import AvailableSlots from './AvailableSlots';
import { axiosInstance } from '../../../lib/axiosInstance';
import PrimaryButton from '../../../components/PrimaryButton';

interface Dentist {
    id: string;
    name: string;
}

interface TimeSlot {
    id: string;
    dentistId: string;
    date: string;
    time: string;
    isBooked: boolean;
}

const BookingForm = () => {
    const user = useAppSelector((state: RootState) => state.auth.data);
    console.log('User ID:', user?.id)
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const [selectedDentist, setSelectedDentist] = useState<string>('');
    console.log('selectedDentist:', selectedDentist)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    console.log('Selected Date:', selectedDate)
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    console.log('selectedSlot:', selectedSlot)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchDentists = async () => {
            try {
                const response = await axiosInstance.get('/api/dentists');
                setDentists(response.data);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };
        fetchDentists();
    }, []);


    useEffect(() => {
        const fetchTimeSlots = async () => {
            if (selectedDentist && selectedDate) {
                const formattedDate = selectedDate.toLocaleDateString('en-CA'); // yyyy-mm-dd
                console.log('Formatted Date:', formattedDate)
                try {
                    const response = await axiosInstance.get(`/api/dentists/${selectedDentist}/slots?date=${formattedDate}`)
                    setTimeSlots(response.data)
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error('Axios error:', error.response?.data || error.message);
                    } else {
                        console.error('Unexpected error:', error);
                    }
                }
            }
        }
        fetchTimeSlots()
    }, [selectedDentist, selectedDate])


    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDentist || !selectedDate || !selectedSlot) {
            return alert('Please complete all selections.');
        }
        setIsLoading(true)
        try {
            await axiosInstance.post('/api/schedule-appointment', {
                userId: user?.id,
                dentistId: selectedDentist,
                timeSlotId: selectedSlot,
            });
            setIsLoading(false)
            alert('Appointment successfully booked!');

            setSelectedDentist('');
            setSelectedDate(null);
            setSelectedSlot('');
            setTimeSlots([]);

        } catch (error) {
            setIsLoading(false)
            console.error('Booking failed:', error);
            alert('Something went wrong while booking the appointment.');
        }
    };



    return (
        < form onSubmit={handleBooking} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl" >
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Book an Appointment</h2>
            <SelectDentist data={dentists} value={selectedDentist} onChange={(e) => { setSelectedDentist(e.target.value); setSelectedSlot(''); }} />
            <CustomDatePicker
                selected={selectedDate}
                onChange={(date) => { setSelectedDate(date); setSelectedSlot(''); }}
            />
            <AvailableSlots
                data={timeSlots}
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
                clickSelectedSlot={setSelectedSlot}
            />
            <PrimaryButton
                type="submit"
                className={`flex justify-center w-full py-3 rounded-xl text-white transition ${!selectedDentist || !selectedDate || !selectedSlot
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                disabled={!selectedDentist || !selectedDate || !selectedSlot}
            >
                {isLoading ? (
                    <>
                        <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Scheduling...</span>
                    </>
                ) : (
                    <>
                        Book Appointment
                    </>
                )}
            </PrimaryButton>
        </form >
    )
}

export default BookingForm;