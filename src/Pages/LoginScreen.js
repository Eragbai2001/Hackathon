import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, Loader, Torus } from "lucide-react";
import firebase from "../firebase/firebase";

const LoginScreen = ({ setIsSigned }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsSigned(true);
        navigate("/");
      } else {
        setIsSigned(false);
      }
      if (isMounted) setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [navigate, setIsSigned]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsSigned(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      setIsSigned(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      setIsSigned(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? (
        <Loader type="Grid" color="#000" size={60} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <img src="/logo.png" alt="TimeSphere" className="h-16 w-16 mx-auto" />
          <p className="text-2xl font-semibold text-gray-900 text-center !mb-3 !mt-0">
            Welcome to TimeSphere
          </p>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            >
              <Torus size={20} />
              Sign in with Google
            </button>
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              <Torus size={20} />
              Sign in with Facebook
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
