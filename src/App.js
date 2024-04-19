import React, { useEffect, useState } from "react";
import "./App.css";
import "tachyons";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./Pages/LoginScreen";
import HomeScreen from "./Pages/HomeScreen";
import TimetableScreen from "./Pages/TimetableScreen";
import firebase from "./firebase/firebase";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      setIsLoading(false); // Set loading to false once we get the user
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <Router>
      <div className="App relative">
        <Routes>
          <Route
            path="/timetable"
            element={
              isSignedIn ? (
                <TimetableScreen />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginScreen setIsSigned={setIsSignedIn} />}
          />
          <Route
            path="/"
            element={
              isSignedIn ? <HomeScreen /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/subjects"
            element={
              isSignedIn ? <HomeScreen /> : <Navigate replace to="/login" />
            }
          />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
