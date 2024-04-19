import React from "react";
import docs from "../../constants/docs";

export default function SectionInput({ sections, setSections, setHidden }) {
  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");

  const [titleError, setTitleError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };

  const setRequiredError = () => {
    !title ? setTitleError("Required") : setTitleError("");
    !code ? setCodeError("Required") : setCodeError("");
  };

  const setEmptyTextfields = () => {
    setTitle("");
    setCode("");

    setTitleError("");
    setCodeError("");
  };
  const addButton = () => {
    let temp = [...sections];
    if (title && code) {
      if (temp) {
        if (temp.findIndex((e) => e[1] === code) === -1)
          temp.push([title, code]);
        else {
          setRequiredError();
          setCodeError("Subject already exists");
          return;
        }
      } else temp = [[title, code]];

      setSections(temp, docs.sections);
      setEmptyTextfields();
    } else {
      setRequiredError();
    }
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
        <h3 className="text-4xl font-semibold self-start mb-4">Add Class</h3>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="class-title"
            className="block text-sm font-medium text-gray-700"
          >
            Class Title
          </label>
          <input
            id="class-title"
            type="text"
            value={title}
            placeholder="100 Level - Computer Science"
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
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="class-code"
            className="block text-sm font-medium text-gray-700"
          >
            Class Code
          </label>
          <input
            id="class-code"
            type="text"
            value={code}
            onChange={codeChange}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addButton();
            }}
            className={`mt-1 block rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              codeError ? "border-red-500" : ""
            }`}
            style={{ boxSizing: "border-box" }}
          />
          {codeError && (
            <p className="text-red-500 text-xs mt-1">{codeError}</p>
          )}
        </div>
        <button
          className="self-start bg-[#001A23] hover:bg-gray-700 text-white font-bold py-2 px-4 pt-1 rounded"
          onClick={addButton}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
