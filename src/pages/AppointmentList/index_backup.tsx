import { useEffect, useState } from 'react';
import { useAppSelector, type RootState } from '../../redux/store';
import { axiosInstance } from '../../lib/axiosInstance';
import Header from '../../layout/Header';


interface TimeSlot {
    id: string,
    date: string,
    time: string,
}

interface Appointment {
    id: string;
    dentistId: string;
    dentist: { name: string };
    timeSlot: TimeSlot;
}

const AppointmentList = () => {
    const userId = useAppSelector((state: RootState) => state.auth.data?.id);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>('');
    console.log('selectedTimeSlotId:', selectedTimeSlotId)

    useEffect(() => {
        axiosInstance.get(`/api/users/${userId}/appointments`)
            .then(response => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, [userId, appointments]);

    const cancelAppointment = async (id: string) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        try {
            await axiosInstance.delete(`/api/users/appointments/${id}`);
            setAppointments(prev => prev.filter(a => a.id !== id));
            alert('Appointment cancelled successfully.');
        } catch (error) {
            console.error('Error cancelling appointment:', error);
        }
    };

    const fetchAvailableSlots = async (dentistId: string, date: string) => {
        try {
            const response = await axiosInstance.get(`/api/dentists/${dentistId}/slots?date=${date}`);
            setAvailableSlots(response.data);
        } catch (error) {
            console.error('Error fetching available slots:', error);
        }
    };

    const handleUpdateClick = (appointment: Appointment) => {
        setEditingId(appointment.id);
        setSelectedTimeSlotId('');
        fetchAvailableSlots(appointment.dentistId, appointment.timeSlot.date);
    };

    const handleSubmitUpdate = async (appointmentId: string) => {
        if (!selectedTimeSlotId) {
            alert('Please select a new time slot.');
            return;
        }

        try {
            await axiosInstance.put(`/api/users/appointments/${appointmentId}`, { newTimeSlotId: selectedTimeSlotId });
            alert('Appointment updated successfully.');
            setSelectedTimeSlotId('');
            setEditingId(null)
            return;
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
                        <div key={appointment.id} className="bg-white p-4 rounded-xl shadow space-y-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{appointment.dentist.name}</p>
                                    <p className="text-gray-500">{appointment.timeSlot.date} - {appointment.timeSlot.time}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleUpdateClick(appointment)}
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

                            {/* Show Update Form when clicked */}
                            {editingId === appointment.id && (
                                <div className="mt-4 space-y-2">
                                    <label className="block text-gray-700 font-medium">Select New Time:</label>
                                    <select
                                        className="border p-2 rounded w-full"
                                        value={selectedTimeSlotId}
                                        onChange={(e) => setSelectedTimeSlotId(e.target.value)}
                                    >
                                        <option value="">Select Time Slot</option>
                                        {availableSlots.map(slot => (
                                            <option key={slot.id} value={slot.id}>
                                                {slot.time}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleSubmitUpdate(appointment.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
                                        >
                                            Submit Update
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600"
                                        >
                                            Cancel Update
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppointmentList;
