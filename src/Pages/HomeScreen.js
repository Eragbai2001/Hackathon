import firebase from "firebase";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryAppBar from "../components/Appbar";
import SectionInput from "../components/InputCards/sectionInput";
import SubjectInput from "../components/InputCards/subjectInput";
import TeacherInput from "../components/InputCards/teacherInput";
import WorkingtimeInput from "../components/InputCards/workingtimeInput";
import LectureInput from "../components/lectures/lectureInput";
import docs from "../constants/docs";
import "./HomeScreen.css";
import TableManager from "./TableManager";

const weekSchedule = { MON: 0, TUE: 0, WED: 0, THU: 0, FRI: 0, SAT: 0 };

const HomeScreen = () => {
  const appBarRef = useRef(null);
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [workingTime, setworkingTime] = useState(weekSchedule);
  const [loading, setloading] = useState(false);
  const [timetable, setTimetable] = useState(undefined);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [showOverlay, setShowOverlay] = useState({
    subject: false,
    section: false,
    teacher: false,
    lecture: false,
    workingTime: false,
  });

  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight);
    }
    console.log(appBarRef.current.offsetHeight);
  }, []);

  const db = firebase.firestore();
  const userRef = db.collection(firebase.auth().currentUser.uid);

  const updateDB = (sub, docType) => {
    switch (docType) {
      case "subjects":
        setSubjects(sub);
        break;
      case "sections":
        setSections(sub);
        break;
      case "teachers":
        setTeachers(sub);
        break;
      case "lectures":
        setLectures(sub);
        break;
      case "workingTime":
        setworkingTime(sub);
        break;
      default:
        console.error("Wrong Document");
    }
    userRef
      .doc(docType)
      .set(docType === docs.workingTime ? sub : { ...Object(sub) })
      .then((e) => console.log("saved"))
      .catch((e) => console.error("error", e));
  };

  const fetchTimetable = useCallback(async () => {
    const db = firebase.firestore();
    const userRef = db.collection(firebase.auth().currentUser.uid);

    const temp = {};

    await userRef
      .doc(docs.timeTable)
      .collection(docs.timeTable)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const lecSec = [];
          snapshot.forEach((snap) => {
            temp[snap.id] = Object.values(snap.data());
            lecSec.push(snap.id);
          });
          setTimetable(temp);
        }
      });
  }, []);

  const fetchRecords = useCallback(async () => {
    const db = firebase.firestore();
    const userRef = db.collection(firebase.auth().currentUser.uid);
    userRef
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          const records =
            doc.id === docs.workingTime
              ? doc.data()
              : Object.values(doc.data());
          switch (doc.id) {
            case docs.subjects:
              setSubjects(records);
              break;
            case docs.sections:
              setSections(records);
              break;
            case docs.teachers:
              setTeachers(records);
              break;
            case docs.lectures:
              setLectures(records);
              break;
            case docs.workingTime:
              setworkingTime(records);
              break;

            default:
              console.error("Wrong Document");
          }
        });
      })
      .catch((e) => console.log("err", e));
  }, []);

  React.useEffect(() => {
    fetchRecords();
    fetchTimetable();
  }, [fetchRecords, fetchTimetable]);

  const generateButton = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: firebase.auth().currentUser.uid }),
    };
    setloading(true);
    fetch("/generate", requestOptions)
      .then((response) => response.json())
      .then(async () => {
        fetchTimetable();
        setloading(false);
      })
      .catch((e) => {
        console.log(e);
        setloading(false);
      });
  };

  const toggleOverlay = (type) => {
    setShowOverlay((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  useEffect(() => {
    const closeOverlay = (e) => {
      if (e.target.className !== "overlay") {
        setShowOverlay((prevState) => ({
          ...prevState,
          overlay: false,
        }));
      }
    };

    if (showOverlay.overlay) {
      document.addEventListener("click", closeOverlay);
    }

    return () => {
      document.removeEventListener("click", closeOverlay);
    };
  }, [showOverlay.overlay]);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex">
      {showSidebar && (
        <div
          className="w-1/2 md:w-1/6 h-screen bg-[#001A23] fixed md:!static z-20 flex flex-col"
          style={{
            paddingTop: appBarHeight,
            boxSizing: "border-box",
          }}
        >
          <button
            className={`p-2 py-3 font-semibold text-white text-left flex items-center ${
              location.pathname === "/" ? "text-[#4BE900]" : ""
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <div
              className="rounded-full aspect-video h-3 bg-[#4BE900] -ml-4"
              style={{
                marginRight: `max(3vw, 20px)`,
                backgroundColor: `${
                  location.pathname === "/" ? "#4BE900" : "#001A23"
                }`,
              }}
            ></div>
            Data & Admin
          </button>
          <button
            className={`p-2 py-3 font-semibold text-white text-left flex items-center ${
              location.pathname === "/timetable" ? "text-[#4BE900]" : ""
            }`}
            onClick={() => {
              navigate("/timetable");
            }}
          >
            <div
              className="rounded-full aspect-video h-3 bg-[#4BE900] -ml-4"
              style={{
                marginRight: `max(3vw, 20px)`,
                backgroundColor: `${
                  location.pathname === "/timetable" ? "#4BE900" : "#001A23"
                }`,
              }}
            ></div>
            Timetable
          </button>
        </div>
      )}
      <div className="flex flex-col flex-1 w-screen md:w-auto">
        <PrimaryAppBar
          ref={appBarRef}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <h1 className="self-start mx-6 my-2 font-bold mt-6">Data & Admin</h1>
        <div className="my-1 mx-6 z-10 flex">
          <div className="relative">
            <button
              className={
                "flex items-center bg-[#001A23] text-white px-4 py-3 pt-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              }
              onClick={() => toggleOverlay("overlay")}
            >
              Add New Item +
              <span className="ml-2 text-sm">
                <i
                  className={
                    ("fas",
                    {
                      "fa-caret-up": showOverlay.overlay,
                      "fa-caret-down": !showOverlay.overlay,
                    })
                  }
                ></i>
              </span>
            </button>
            {showOverlay.overlay && (
              <div className="absolute left-0 mt-1 w-48 rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => toggleOverlay("subject")}
                  >
                    Course
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => toggleOverlay("section")}
                  >
                    Class
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => toggleOverlay("teacher")}
                  >
                    Instructor
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => toggleOverlay("lecture")}
                  >
                    Lecture
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => toggleOverlay("workingTime")}
                  >
                    Working Time
                  </button>
                </div>
              </div>
            )}
          </div>
          {showOverlay.subject && (
            <SubjectInput
              subjects={subjects}
              setSubjects={updateDB}
              docs={docs}
              setHidden={() => toggleOverlay("subject")}
            />
          )}
          {showOverlay.section && (
            <SectionInput
              sections={sections}
              setSections={updateDB}
              docs={docs}
              setHidden={() => toggleOverlay("section")}
            />
          )}
          {showOverlay.teacher && (
            <TeacherInput
              teachers={teachers}
              setTeachers={updateDB}
              docs={docs}
              setHidden={() => toggleOverlay("teacher")}
            />
          )}
          {showOverlay.lecture && (
            <LectureInput
              lectures={lectures}
              setLectures={updateDB}
              docs={docs}
              subjects={subjects}
              sections={sections}
              teachers={teachers}
              setHidden={() => toggleOverlay("lecture")}
            />
          )}
          {showOverlay.workingTime && (
            <WorkingtimeInput
              workingTime={workingTime}
              setworkingTime={updateDB}
              sections={sections}
              docs={docs}
              setHidden={() => toggleOverlay("workingTime")}
            />
          )}
        </div>
        {/* <div className=""> */}
        <TableManager
          subjects={subjects}
          sections={sections}
          teachers={teachers}
          lectures={lectures}
          workingTime={workingTime}
          updateDB={updateDB}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default HomeScreen;
