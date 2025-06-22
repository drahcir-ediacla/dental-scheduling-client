
interface Dentist {
    id: string;
    name: string;
}


interface Props {
    data: Dentist[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const SelectDentist = ({data, onChange, value}: Props) => {
    return (
        <>
            <label className="block mb-2 text-gray-700 font-medium">Select Dentist</label>
            <select
                value={value}
                onChange={onChange}
                required
                className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">-- Choose Dentist --</option>
                {data.map(dentist => (
                    <option key={dentist.id} value={dentist.id}>{dentist.name}</option>
                ))}
            </select>
        </>
    )
}

export default SelectDentist