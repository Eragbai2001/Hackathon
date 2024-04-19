import React, { useState } from "react";
import SubjectTable from "../components/Tables/subjectTable";
import SectionTable from "../components/Tables/sectionTable";
import TeacherTable from "../components/Tables/teacherTable";
import LectureTable from "../components/lectures/lectureTable";
import WorkingtimeTable from "../components/Tables/workingtimeTable";

const TableManager = ({
  subjects,
  sections,
  teachers,
  lectures,
  workingTime,
  updateDB,
}) => {
  const [activeTable, setActiveTable] = useState("courseList");

  const renderTable = () => {
    switch (activeTable) {
      case "courseList":
        return <SubjectTable subjects={subjects} setSubjects={updateDB} />;
      case "classList":
        return <SectionTable sections={sections} setSections={updateDB} />;
      case "instructorList":
        return <TeacherTable teachers={teachers} setTeachers={updateDB} />;
      case "lectureList":
        return <LectureTable lectures={lectures} setLectures={updateDB} />;
      case "workingtimeList":
        return (
          <WorkingtimeTable
            workingTime={workingTime}
            setworkingTime={updateDB}
          />
        );
      default:
        return (
          <WorkingtimeTable
            workingTime={workingTime}
            setworkingTime={updateDB}
          />
        );
    }
  };

  return (
    <div className="mx-6 mt-4 md:w-full lg:w-3/4 xl:w-5/6">
      <div className="flex gap-3 lg:gap-6 xl:gap-10 mb-4 border-b [&>*]:pb-2">
        <button
          onClick={() => setActiveTable("courseList")}
          className={`text-xs sm:text-sm md:text-base ${
            activeTable === "courseList"
              ? "border-b-2 border-green-400 pb-4"
              : "pb-2"
          }`}
        >
          Course List
        </button>
        <button
          onClick={() => setActiveTable("classList")}
          className={`text-xs sm:text-sm md:text-base ${
            activeTable === "classList"
              ? "border-b-2 border-green-400 pb-4"
              : "pb-2"
          }`}
        >
          Class List
        </button>
        <button
          onClick={() => setActiveTable("instructorList")}
          className={`text-xs sm:text-sm md:text-base ${
            activeTable === "instructorList"
              ? "border-b-2 border-green-400 pb-4"
              : "pb-2"
          }`}
        >
          Instructor List
        </button>
        <button
          onClick={() => setActiveTable("lectureList")}
          className={`text-xs sm:text-sm md:text-base ${
            activeTable === "lectureList"
              ? "border-b-2 border-green-400 pb-4"
              : "pb-2"
          }`}
        >
          Lecture List
        </button>
        <button
          onClick={() => setActiveTable("workingtimeList")}
          className={`text-xs sm:text-sm md:text-base ${
            activeTable === "workingtimeList"
              ? "border-b-2 border-green-400 pb-4"
              : "pb-2"
          }`}
        >
          Working Time
        </button>
      </div>

      {renderTable()}
    </div>
  );
};

export default TableManager;
