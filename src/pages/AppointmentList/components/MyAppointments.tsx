interface TimeSlot {
    id: string,
    date: string,
    time: string,
}

interface Appointment {
    id: string;
    dentistId: string;
    dentist: { name: string };
    timeSlot: { id: string, date: string, time: string };
}

interface Props {
    data: Appointment[];
    changeAppointment: (appointment: Appointment) => void;
    cancelAppointment: (id: string) => void;
    editingId: string | null;
    selectedTimeSlotId: string;
    setSelectedTimeSlotId: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    availableSlots: TimeSlot[];
    handleSubmitUpdate: (id: string) => void;
    setEditingId: (id: string | null) => void;
    isCancelling: string | null;
    isUpdating: string | null;
}


const MyAppointments = ({
    data,
    changeAppointment,
    cancelAppointment,
    editingId,
    selectedTimeSlotId,
    setSelectedTimeSlotId,
    availableSlots,
    handleSubmitUpdate,
    setEditingId,
    isCancelling,
    isUpdating
}: Props) => {
    return (
        <>
            <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center mt-20">My Appointments</h1>
            {data.length === 0 ? (
                <p className="text-center">You have no scheduled appointments.</p>
            ) : (
                <div className="space-y-4 max-w-3xl mx-auto">
                    {data.map(appointment => (
                        <div key={appointment.id} className="bg-white p-4 rounded-xl shadow space-y-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{appointment.dentist.name}</p>
                                    <p className="text-gray-500">{appointment.timeSlot.date} - {appointment.timeSlot.time}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => changeAppointment(appointment)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                                    >
                                        Change
                                    </button>
                                    <button
                                        onClick={() => cancelAppointment(appointment.id)}
                                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                                        disabled={isCancelling === appointment.id}
                                    >
                                        {isCancelling === appointment.id ? (
                                            <>
                                                <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Cancelling
                                            </>
                                        ) : (
                                            <>
                                                Cancel
                                            </>
                                        )}
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
                                        onChange={setSelectedTimeSlotId}
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
                                            className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 flex items-center"
                                            disabled={isUpdating === appointment.id}

                                        >
                                            {isUpdating === appointment.id ? (
                                                <>
                                                    <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    <span>Updating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    Submit Update
                                                </>
                                            )}
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
        </>
    )
}

export default MyAppointments