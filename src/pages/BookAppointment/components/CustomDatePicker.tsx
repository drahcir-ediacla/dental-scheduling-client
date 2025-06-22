import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker = ({ selected, onChange }: Props) => {
  return (
    <>
      <label className="block mb-2 text-gray-700 font-medium">Select Date</label>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        minDate={new Date()}
        placeholderText="Select a date"
        className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  );
};

export default CustomDatePicker;
