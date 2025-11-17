import React from "react";

const CustomTimePicker = ({ date, value, onChange }: any) => {
  const allowedHours = Array.from({ length: 3 }, (_, i) => i + 12).concat(
    Array.from({ length: 5 }, (_, i) => i + 18)
  );

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filteredHours = allowedHours;
  if (selectedDate.getTime() === today.getTime()) {
    const currentHour = today.getHours();
    filteredHours = allowedHours.filter((hour) => hour > currentHour);
  }

  return (
    <select
      id="eventTime"
      name="eventTime"
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-4 py-2 border border-[#597ba8] rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
      required
    >
      {filteredHours.map((hour) => (
        <option key={hour} value={hour}>
          {hour}:00
        </option>
      ))}
    </select>
  );
};

export default CustomTimePicker;
