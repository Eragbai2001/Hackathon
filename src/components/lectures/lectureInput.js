import React, { useState } from "react";
import docs from "../../constants/docs";

const lectureArrangement = [["1"], ["1 - 1", "2"], ["1 - 1 - 1", "2 - 1", "3"]];
export default function LectureInput({
  lectures,
  setLectures,
  subjects,
  sections,
  teachers,
  setHidden,
}) {
  const [subject, setsubject] = useState("");
  const [section, setsection] = useState("");
  const [teacher, setteacher] = useState("");
  const [lectureArr, setlectureArr] = useState("");

  const [subjectError, setsubjectError] = useState("");
  const [sectionError, setsectionError] = useState("");
  const [teacherError, setteacherError] = useState("");
  const [lecturearrError, setlecturearrError] = useState("");

  const subjectChange = (event) => {
    setlectureArr("");
    setsubject(event.target.value);
  };

  const sectionChange = (event) => {
    setsection(event.target.value);
  };

  const teacherChange = (event) => {
    setteacher(event.target.value);
  };

  const lecturesChange = (event) => {
    setlectureArr(event.target.value);
  };

  const setRequiredError = () => {
    !subject ? setsubjectError("Required") : setsubjectError("");
    !teacher ? setteacherError("Required") : setteacherError("");
    !section ? setsectionError("Required") : setsectionError("");
    !lectureArr ? setlecturearrError("Required") : setlecturearrError("");
  };

  const closeOnOutsideClick = (event) => {
    if (event.target.className.includes("outer-container")) {
      setHidden();
    }
  };

  const setEmptyTextfields = () => {
    setlectureArr("");
    setsubject("");
    setteacher("");
    setsection("");

    setsubjectError("");
    setteacherError("");
    setsectionError("");
    setlecturearrError("");
  };

  const addButton = () => {
    if (subject && teacher && section && lectureArr) {
      let temp = [...lectures];

      if (lectures) {
        if (
          temp.findIndex(
            (e) =>
              e[4] === teacher + section ||
              (e[1] === section && e[2] === subject)
          ) === -1
        )
          temp.push([teacher, section, subject, lectureArr, teacher + section]);
        else {
          setRequiredError();
          setteacherError("Lecture already exists");
          setsubjectError("Lecture already exists");
          setsectionError("Lecture already exists");
          return;
        }
      } else
        temp = [[teacher, section, subject, lectureArr, teacher + section]];

      setLectures(temp, docs.lectures);
      setEmptyTextfields();
    } else setRequiredError();
  };

  const selectedIndex = (array, element, index) =>
    array[array.findIndex((e) => e[index] === element)];

  const subjectIndex = selectedIndex(subjects, subject, 1);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full overflow-auto z-10 flex items-center justify-center bg-gray-800 bg-opacity-50 outer-container"
      onClick={closeOnOutsideClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col">
        <h3 className="text-4xl font-semibold self-start mb-4">Add Lectures</h3>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="teacher"
            className="block text-sm font-medium text-gray-700"
          >
            Teacher
          </label>
          <select
            id="teacher"
            className={`mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              teacherError ? "border-red-500" : ""
            }`}
            value={teacher}
            onChange={teacherChange}
          >
            <option value="">Select Teacher</option>
            {teachers.map((option) => (
              <option key={option[1] ? option[1] : "teacher"} value={option[0]}>
                {option[0]}
              </option>
            ))}
          </select>
          {teacherError && (
            <p className="text-red-500 text-xs mt-1">{teacherError}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-gray-700"
          >
            Class
          </label>
          <select
            id="section"
            className={`mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              sectionError ? "border-red-500" : ""
            }`}
            value={section}
            onChange={sectionChange}
          >
            <option value="">Select Section</option>
            {sections.map((option) => (
              <option key={option[1] ? option[1] : "section"} value={option[1]}>
                {option[1]}
              </option>
            ))}
          </select>
          {sectionError && (
            <p className="text-red-500 text-xs mt-1">{sectionError}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Course
          </label>
          <select
            id="subject"
            className={`mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              subjectError ? "border-red-500" : ""
            }`}
            value={subject}
            onChange={subjectChange}
          >
            <option value="">Select Subject</option>
            {subjects.map((option) => (
              <option key={option[1] ? option[1] : "subject"} value={option[1]}>
                {option[1]}
              </option>
            ))}
          </select>
          {subjectError && (
            <p className="text-red-500 text-xs mt-1">{subjectError}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label
            htmlFor="lecture"
            className="block text-sm font-medium text-gray-700"
          >
            Lecture Arrangement
          </label>
          <select
            id="lecture"
            className={`mt -1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
              lecturearrError ? "border-red-500" : ""
            }`}
            value={lectureArr}
            onChange={lecturesChange}
            disabled={!subject}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addButton();
            }}
          >
            <option value="">Select Lecture Arrangement</option>
            {subject && subjectIndex
              ? lectureArrangement[subjectIndex[2] - 1].map((option) => (
                  <option key={option ? option : "lecture"} value={option}>
                    {option}
                  </option>
                ))
              : null}
          </select>
          {lecturearrError && (
            <p className="text-red-500 text-xs mt-1">{lecturearrError}</p>
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
