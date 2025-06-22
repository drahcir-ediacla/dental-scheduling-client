
interface TimeSlot {
    id: string;
    time: string;
}

interface Props {
    data: TimeSlot[];
    selectedSlot: string;
    clickSelectedSlot: (id: string) => void;
}


const AvailableSlots = ({data, clickSelectedSlot, selectedSlot}: Props) => {
  return (
    <>
        {
                data.length > 0 && (
                    <>
                        <label className="block mb-2 text-gray-700 font-medium">Available Time Slots</label>
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            {data.map(slot => (
                                <button
                                    type="button"
                                    key={slot.id}
                                    onClick={() => clickSelectedSlot(slot.id)}
                                    className={`p-3 rounded-xl border ${selectedSlot === slot.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                    </>
                )
            }
    </>
  )
}

export default AvailableSlots