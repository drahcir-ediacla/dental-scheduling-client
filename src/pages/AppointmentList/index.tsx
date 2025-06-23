import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector, type RootState } from '../../redux/store';
import Header from '../../layout/Header';

interface Appointment {
    id: string;
    dentist: { name: string };
    timeSlot: { date: string; time: string };
}

const AppointmentList = () => {
    const userId = useAppSelector((state: RootState) => state.auth.data?.id);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${userId}/appointments`)
            .then(response => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, [userId]);

    const cancelAppointment = async (id: string) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/appointments/${id}`);
            setAppointments(prev => prev.filter(a => a.id !== id));
            alert('Appointment cancelled successfully.');
        } catch (error) {
            console.error('Error cancelling appointment:', error);
        }
    };

    const updateAppointment = async (id: string) => {
        const newTimeSlotId = prompt('Enter new Time Slot ID:');
        if (!newTimeSlotId) return;

        try {
            await axios.put(`http://localhost:5000/api/appointments/${id}`, { newTimeSlotId });
            alert('Appointment updated successfully.');
            window.location.reload();
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen p-6 bg-blue-50">
            <Header />
            <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center mt-20">My Appointments</h1>
            {appointments.length === 0 ? (
                <p className="text-center">You have no scheduled appointments.</p>
            ) : (
                <div className="space-y-4 max-w-3xl mx-auto">
                    {appointments.map(appointment => (
                        <div key={appointment.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{appointment.dentist.name}</p>
                                <p className="text-gray-500">{appointment.timeSlot.date} - {appointment.timeSlot.time}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => updateAppointment(appointment.id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => cancelAppointment(appointment.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppointmentList;
