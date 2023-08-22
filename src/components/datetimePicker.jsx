import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const timeSlots = [
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
];

const convertDateToString = (date) => {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

const convertStringToDate = (date) => {
    return new Date(date)
}


const DateTimePicker = ({slots, selectedDates, setSelectedDates, selectedTimes,setSelectedTimes}) => {
//   const [selectedTimes, setSelectedTimes] = useState([]);
//   const [selectedDates, setSelectedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

  const handleDateChange = (date) => {
    setCurrentDate(date);
    let foundTimes = null;
    const convertedDate = convertDateToString(date)
    if(slots.has(convertedDate))    foundTimes = slots.get(convertedDate)
    if (foundTimes !== null) {
      setSelectedTimes(foundTimes);
    } else {
      setSelectedTimes([]);
    }
  };

  const handleTimeChange = (time) => {
    if (time !== "") {
      setSelectedTimes((prev) => {
        let newTimes = [...prev];
        if (newTimes.includes(time)) {
          newTimes = newTimes.filter((t) => t !== time);
        } else {
          newTimes.push(time);
        }
        return newTimes;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const convertedDate = convertDateToString(currentDate)
    slots.set(convertedDate, selectedTimes);

    setSelectedDates([...selectedDates, currentDate]);
    setCurrentDate(null);
    setSelectedTimes([]);

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 rounded-lg">
        <form style={{display:'flex', alignItems:'center', gap:'15px'}} onSubmit={handleSubmit}>
          <div className="">
            <DatePicker
              highlightDates={selectedDates}
              placeholderText="Select a date                               &#128197;"
              dateFormat="dd/MM/yyyy"
              onChange={handleDateChange}
            
              customInput={<input type ='text' style={{border: '1px solid #ccc', padding: '8px',borderRadius: '8px', boxShadow: '0 0 27px -7px rgba(53,151,216,1)', cursor: 'pointer', caretColor: 'transparent'}}></input>}
            />
          </div>
          {currentDate && (
            <div className="">
              <label className="block text-lg font-medium">
                Select Time(s):
              </label>
              {timeSlots.map((time) => (
                <div key={time} className="flex items-center mb-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={time}
                      checked={selectedTimes.some((t) => t === time)}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="text-lg">{time}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            disabled={!currentDate || selectedTimes.length === 0}
            style={{backgroundColor:'rgb(59 130 246)', color:'white', padding:'15px', height:'100%', borderRadius:'6px'}}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateTimePicker;
