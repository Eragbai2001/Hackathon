import React, { useState } from "react";
import docs from "../../constants/docs";

export default function WorkingtimeInput({
  workingTime,
  setworkingTime,
  sections,
  setHidden,
}) {
  const [day, setday] = useState("");
  const [period, setperiod] = useState("");

  const [dayError, setdayError] = useState("");
  const [periodError, setperiodError] = useState("");

  const dayChange = (event) => {
    setday(event.target.value);
  };

  const periodChange = (event) => {
    setperiod(event.target.value);
  };

  const setRequiredError = () => {
    !day ? setdayError("Required") : setdayError("");
    !period ? setperiodError("Required") : setperiodError("");
  };

  const setEmptyTextfields = () => {
    setday("");
    setperiod("");

    setdayError("");
    setperiodError("");
  };

  const addButton = () => {
    if (day && period) {
      let temp = { ...workingTime };
      temp[day] = period;

      setworkingTime(temp, docs.workingTime);

      setEmptyTextfields();
    } else setRequiredError();
  };

  const closeOnOutsideClick = (event) => {
    if (event.target.className.includes("outer-container")) {
      setHidden();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full overflow-auto z-10 flex items-center justify-center bg-gray-800 bg-opacity-50 outer-container"
      onClick={closeOnOutsideClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col">
        <h3 className="text-4xl font-semibold self-start mb-4">
          Working Days & Periods
        </h3>

        <div className="mb-2 flex flex-col items-start">
          <label
            htmlFor="day"
            className="block text-sm font-medium text-gray-700"
          >
            Day
          </label>
          <select
            id="day"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              dayError ? "border-red-500" : ""
            }`}
            value={day}
            onChange={dayChange}
          >
            <option value="">Select Day</option>
            {Object.entries(workingTime)
              .filter((entry) => entry[1] === 0)
              .map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[0]}
                </option>
              ))}
          </select>
          {dayError && <p className="text-red-500 text-xs mt-1">{dayError}</p>}
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label
            htmlFor="periods"
            className="block text-sm font-medium text-gray-700"
          >
            Periods (hr)
          </label>
          <select
            id="periods"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              periodError ? "border-red-500" : ""
            }`}
            value={period}
            onChange={periodChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") addButton();
            }}
          >
            <option value="">Select Period</option>
            {[1, 2, 3, 4, 5, 6, 7].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {periodError && (
            <p className="text-red-500 text-xs mt-1">{periodError}</p>
          )}
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label
            htmlFor="rooms"
            className="block text-sm font-medium text-gray-700"
          >
            Rooms
          </label>
          <input
            type="number"
            id="rooms"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            value={sections.length}
            disabled
            style={{ boxSizing: "border-box" }}
          />
        </div>

        <button
          className="bg-[#001A23] hover:bg-gray-700 text-white font-bold py-2 px-4 pt-1 rounded self-start"
          onClick={addButton}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
