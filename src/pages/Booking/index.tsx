import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Dentist {
  id: string;
  name: string;
}

interface TimeSlot {
  id: string;
  time: string;
}

const Booking: React.FC = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Fetch dentists on page load
  useEffect(() => {
    axios.get('http://localhost:5000/api/dentists') // Adjust backend URL
      .then(response => setDentists(response.data))
      .catch(error => console.error('Error fetching dentists:', error));
  }, []);

  // Fetch available slots when dentist is selected
  useEffect(() => {
    if (selectedDentist) {
      axios.get(`http://localhost:5000/api/dentists/${selectedDentist}/slots`)
        .then(response => setTimeSlots(response.data))
        .catch(error => console.error('Error fetching slots:', error));
    }
  }, [selectedDentist]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDentist || !selectedSlot) return alert('Please select both dentist and time slot.');

    axios.post('http://localhost:5000/api/bookings', {
      dentistId: selectedDentist,
      slotId: selectedSlot
    })
      .then(() => alert('Appointment successfully booked!'))
      .catch(error => console.error('Booking failed:', error));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <form onSubmit={handleBooking} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Book an Appointment</h2>

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

export default Booking;
