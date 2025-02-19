import React, { useState } from "react";

const OverviewCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleMonthChange = (offset) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  };

  const today = new Date();
  const isToday = (day) =>
    day &&
    today.getDate() === day &&
    today.getMonth() === currentMonth.getMonth() &&
    today.getFullYear() === currentMonth.getFullYear();

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center">
        Your Calendar
      </h2>
      <div className="flex justify-between items-center my-2">
        <button
          onClick={() => handleMonthChange(-1)}
          className="text-gray-500 hover:text-gray-700"
        >
          ◀
        </button>
        <span className="text-gray-700 font-medium">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
        <button
          onClick={() => handleMonthChange(1)}
          className="text-gray-500 hover:text-gray-700"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-gray-600 text-sm">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center mt-2">
        {generateCalendar().map((day, index) => (
          <div
            key={index}
            className={`py-2 text-gray-700 ${
              day ? "cursor-pointer" : "invisible"
            } ${
              isToday(day)
                ? "bg-[#139196] text-white rounded-full w-8 h-8 mx-auto"
                : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCalendar;
