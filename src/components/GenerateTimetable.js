import firebase from "firebase";
import { Shell, Sparkles } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import docs from "../constants/docs";
import PrimaryAppBar from "./Appbar";
import Timetable from "./timetable";

export default function GenerateTimetable({ timetable }) {
  const appBarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [selectedSection, setSelectedSection] = useState("");
  const [_, setTimetable] = useState(undefined);
  const [loading, setloading] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);

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
            default:
              console.error("Wrong Document");
          }
        });
      })
      .catch((e) => console.log("err", e));
  }, []);

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

  React.useEffect(() => {
    fetchRecords();
    fetchTimetable();
  }, [fetchRecords, fetchTimetable]);

  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight);
    }
  }, []);

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const generateButton = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: firebase.auth().currentUser.uid }),
    };
    setloading(true);
    fetch("https://timetable-scheduler.onrender.com/generate", requestOptions)
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

  const sections = timetable ? Object.keys(timetable).sort() : []; // Get the sections from the timetable

  return (
    <div className="flex w-screen md:w-auto">
      {showSidebar && (
        <div
          className="w-1/2 md:w-1/6 bg-[#001A23] fixed md:!static z-20 flex flex-col h-screen"
          style={{
            paddingTop: appBarHeight,
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
      <div className="flex flex-col flex-1 h-screen">
        <PrimaryAppBar
          ref={appBarRef}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div
          className="w-screen md:w-auto self-start flex flex-col mb-5 h-full px-4"
          style={{
            boxSizing: "border-box",
          }}
        >
          <h2 className="text-3xl self-start font-bold">Timetables</h2>
          <div className="flex gap-3 mt-2">
            <select
              value={selectedSection}
              onChange={handleSectionChange}
              className="self-start border border-gray-400 text-[#001A23] hover:bg-gray-200 font-bold py-2 pt-1 px-2 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">All sections</option>
              {sections.map((section) => (
                <option value={section} key={section}>
                  {section}
                </option>
              ))}
            </select>
            <button
              onClick={generateButton}
              disabled={!lectures.length || loading}
              title={
                !lectures.length || loading
                  ? "You need to fill Lectures to generate Timetable"
                  : ""
              }
              className={`flex items-center justify-center bg-[#001A23] py-2 pt-1 px-2 rounded-md gap-3 ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              } text-white ${
                !lectures.length || loading
                  ? "opacity-80 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? (
                <Shell className="animate-spin w-4 h-4" color="white" />
              ) : (
                <Sparkles color="white" className="w-4 h-4" />
              )}
              Generate Timetable
            </button>
          </div>

          {timetable ? (
            sections
              .filter(
                (section) => !selectedSection || section === selectedSection
              )
              .map((section) => (
                <Timetable
                  timeTable={timetable[section]}
                  section={section}
                  key={section}
                />
              ))
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md">
              <div className="bg-blue-200 p-3 text-blue-500 w-64 md:w-80">
                Course, class, Instructor and Lecture List has to exist before
                Timetable can be generated
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
