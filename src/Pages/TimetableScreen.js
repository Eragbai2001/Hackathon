import docs from "../constants/docs";
import firebase from "firebase";
import React, { useCallback, useEffect, useState } from "react";
import GenerateTimetable from "../components/GenerateTimetable";

export default function TimetableScreen() {
  const [timetable, setTimetable] = useState({});

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

  useEffect(() => {
    fetchTimetable();
  }, [fetchTimetable]);

  return (
    <div>
      <GenerateTimetable timetable={timetable} />
    </div>
  );
}
