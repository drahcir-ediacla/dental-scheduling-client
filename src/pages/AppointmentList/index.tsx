import { useEffect, useState } from 'react';
import { useAppSelector, type RootState } from '../../redux/store';
import { axiosInstance } from '../../lib/axiosInstance';
import Header from '../../layout/Header';
import MyAppointments from './components/MyAppointments';


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
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [isCancelling, setIsCancelling] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance.get(`/api/users/${userId}/appointments`)
            .then(response => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, [userId]);

    const cancelAppointment = async (id: string) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        setIsCancelling(id); // start loading for this appointment

        try {
            await axiosInstance.delete(`/api/users/appointments/${id}`);
            setAppointments(prev => prev.filter(a => a.id !== id));
            alert('Appointment cancelled successfully.');
        } catch (error) {
            console.error('Error cancelling appointment:', error);
        } finally {
            setIsCancelling(null); // stop loading
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

    const changeAppointment = (appointment: Appointment) => {
        setEditingId(appointment.id);
        setSelectedTimeSlotId('');
        fetchAvailableSlots(appointment.dentistId, appointment.timeSlot.date);
    };

    const handleSubmitUpdate = async (appointmentId: string) => {
        if (!selectedTimeSlotId) {
            alert('Please select a new time slot.');
            return;
        }

        setIsUpdating(appointmentId);

        try {
            await axiosInstance.put(`/api/users/appointments/${appointmentId}`, {
                newTimeSlotId: selectedTimeSlotId,
            });
            alert('Appointment updated successfully.');
            // update the local state
            setAppointments(prev =>
                prev.map(app =>
                    app.id === appointmentId
                        ? { ...app, timeSlot: availableSlots.find(slot => slot.id === selectedTimeSlotId)! }
                        : app
                )
            );
            setSelectedTimeSlotId('');
            setEditingId(null);
        } catch (error) {
            console.error('Error updating appointment:', error);
        } finally {
            setIsUpdating(null);
        }
    };


    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen p-6 bg-blue-50">
            <Header />
            <MyAppointments
                data={appointments}
                changeAppointment={changeAppointment}
                cancelAppointment={cancelAppointment}
                editingId={editingId}
                selectedTimeSlotId={selectedTimeSlotId}
                setSelectedTimeSlotId={(e) => setSelectedTimeSlotId(e.target.value)}
                availableSlots={availableSlots}
                handleSubmitUpdate={handleSubmitUpdate}
                setEditingId={setEditingId}
                isCancelling={isCancelling}
                isUpdating={isUpdating}
            />
        </div>
    );
};

export default AppointmentList;
