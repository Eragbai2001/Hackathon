import React from "react";
import docs from "../../constants/docs";

export default function SubjectInput({ subjects, setSubjects, setHidden }) {
  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const [contactHrs, setcontantHrs] = React.useState("1");
  const [creditHrs, setcreditHrs] = React.useState("1");

  const [titleError, setTitleError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");
  const [contantHrsError, setcontantHrsError] = React.useState("");
  const [creditHrsError, setcreditHrsError] = React.useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };
  const contacthrsChange = (event) => {
    setcontantHrs(event.target.value);
  };
  const creditrsChange = (event) => {
    setcreditHrs(event.target.value);
  };
  const setRequiredError = () => {
    !title ? setTitleError("Required") : setTitleError("");
    !code ? setCodeError("Required") : setCodeError("");
    !contactHrs ? setcontantHrsError("Required") : setcontantHrsError("");
    !creditHrs ? setcreditHrsError("Required") : setcreditHrsError("");
  };
  const setEmptyTextfields = () => {
    setTitle("");
    setCode("");
    setcontantHrs("");
    setcreditHrs("");

    setTitleError("");
    setCodeError("");
    setcontantHrsError("");
    setcreditHrsError("");
    setHidden()
  };

  const closeOnOutsideClick = (event) => {
    if (event.target.className.includes("outer-container")) {
      setHidden();
    }
  };

  const addButton = () => {
    let temp = [...subjects];
    if (title && code && contactHrs && creditHrs) {
      if (creditHrs <= contactHrs) {
        if (temp) {
          if (temp.findIndex((e) => e[1] === code) === -1)
            temp.push([title, code, contactHrs, creditHrs]);
          else {
            setRequiredError();
            setCodeError("Subject already exists");
            return;
          }
        } else temp = [[title, code, contactHrs, creditHrs]];
        setSubjects(temp, docs.subjects);
        setEmptyTextfields();
      } else {
        setcontantHrsError("CreditHrs can't exceed contactHrs");
      }
    } else {
      setRequiredError();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full overflow-auto z-10 flex items-center justify-center bg-gray-800 bg-opacity-50 outer-container"
      onClick={closeOnOutsideClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col">
        <h3 className="text-4xl font-semibold self-start mb-4">Add Course</h3>
        <div className="mb-2 flex flex-col items-start">
          <label
            htmlFor="subject-title"
            className="block text-sm font-medium text-gray-700"
          >
            Course Title
          </label>

          <input
            id="subject-title"
            type="text"
            value={title}
            onChange={titleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              titleError ? "border-red-500" : ""
            }`}
            style={{ boxSizing: "border-box" }}
          />

          {titleError && (
            <p className="text-red-500 text-xs mt-1">{titleError}</p>
          )}
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-start">
            <label
              htmlFor="subject-title"
              className="text-sm font-medium text-gray-700"
            >
              Course Code
            </label>

            <input
              id="course-code"
              type="text"
              value={code}
              onChange={codeChange}
              className={`mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
                codeError ? "border-red-500" : ""
              }`}
              style={{ boxSizing: "border-box" }}
            />
          </div>

          <div
            className={`${
              creditHrsError ? "" : "mb-2"
            } flex flex-col flex-1 items-start`}
          >
            <label
              htmlFor="credit-hours"
              className="block text-sm font-medium text-gray-700"
            >
              Credit Hours
            </label>
            <select
              id="credit-hours"
              required
              className={`mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                creditHrsError ? "border-red-500" : ""
              }`}
              onChange={creditrsChange}
              value={creditHrs}
            >
              {[1, 2, 3].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {creditHrsError && (
              <p className="mt-2 text-sm text-red-600">{creditHrsError}</p>
            )}
          </div>

          <div
            className={`${
              contantHrsError ? "" : "mb-2"
            } flex flex-col flex-1 items-start`}
          >
            <label
              htmlFor="contact-hours"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Hours
            </label>
            <select
              id="contact-hours"
              required
              className={`mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                contantHrsError ? "border-red-500" : ""
              }`}
              onChange={contacthrsChange}
              value={contactHrs}
              onKeyDown={(e) => {
                if (e.keyCode === 13) addButton();
              }}
            >
              {[1, 2, 3].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          {contantHrsError && (
            <p className="mt-2 text-sm text-red-600">{contantHrsError}</p>
          )}
          </div>
        </div>

        <button
          className="self-start bg-[#001A23] hover:bg-gray-700 text-white font-bold py-2 pt-1 px-4 rounded mt-4"
          onClick={addButton}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
