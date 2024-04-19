const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./constants/serviceAccountKey.json");
const docs = require("./constants/docs");
const cors = require("cors");
const path = require("path");
const { Scheduling, addSubjects } = require("./Algorithm");

let port = process.env.PORT || 8000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/build/")));

const db = admin.firestore();
app.post("/generate", async (req, res) => {
  const userID = req.body["userID"];
  if (!userID) {
    res.send(401);
    return;
  }

  const collection = db.collection(userID);
  console.log(collection);
  const snapshot = await collection.get();
  console.log(snapshot);

  let l;
  let subjects;
  let workingTime;

  if (snapshot.empty || snapshot.size === 0) {
    res.send(401);
    return;
  }

  snapshot.forEach((snap) => {
    if (snap.id === docs.lectures) l = Object.values(snap.data());
    else if (snap.id === docs.subjects) subjects = Object.values(snap.data());
    else if (snap.id === docs.workingTime) workingTime = snap.data();
  });

  const t = l
    .map((e) => e[0])
    .filter((value, index, self) => self.indexOf(value) === index);

  const sections = l
    .map((e) => e[1])
    .filter((value, index, self) => self.indexOf(value) === index);

  subjects = addSubjects(subjects);

  const teacherLec = t.map((teacher) => {
    return {
      name: teacher,
      assigned: [],
    };
  });
  teacherLec.forEach((lac) => {
    l.forEach((lec) => {
      if (lec[0] === lac.name)
        lac.assigned.push({
          class: lec[1],
          subject: subjects[subjects.findIndex((s) => s.code === lec[2])],
          lecture: lec[3],
        });
    });
  });
  const days = Object.values(workingTime).filter((wt) => wt !== 0);

  const period = {
    d: days.length,
    p: days.reduce((a, b) => Math.max(a, b)),
  };

  const finalized = Scheduling(teacherLec, sections, period);

  const batch = db.batch();
  const snapTimetable = await collection
    .doc(docs.timeTable)
    .collection(docs.timeTable)
    .get();
  if (snapTimetable.size !== 0) {
    snapTimetable.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    console.log("Previous Timetable Docuements Deleted successfully.");
  }

  finalized.forEach(async (tt, i) => {
    await collection
      .doc(docs.timeTable)
      .collection(docs.timeTable)
      .doc(sections[i])
      .set({ ...Object(tt.map((e) => Object(e))) })
      .then(() => console.log("done", i + 1))
      .catch((e) => console.log(e));
    console.log(sections[i]);
    console.table(tt);
  });
  res.send(sections);
});
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
app.listen(port, () => console.log("Listening on Port 8000"));
