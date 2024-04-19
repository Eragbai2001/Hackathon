import React, { forwardRef, useState } from "react";
import { User, LogOut, Menu } from "lucide-react";
import firebase from "firebase";
// import { Transition } from "@headlessui/react";

const PrimaryAppBar = forwardRef(({ showSidebar, setShowSidebar }, ref) => {
  const displayName = firebase.auth().currentUser
    ? firebase.auth().currentUser.displayName
    : "Guest";

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div ref={ref} className="">
      <div className="w-screen md:w-auto z-10 bg-white shadow">
        <div className="px-4 sm:px-6 lg:pr-8 py-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center justify-center">
              <img src="/logo.png" alt="TimeSphere" className="h-8 w-8" />
              <div className="flex-shrink-0 flex items-center text-lg font-bold">
                TimeSphere
              </div>
            </div>
            <div>
              <div className="ml-4 flex items-center justify-center gap-3">
                <div className="hidden md:flex bg-gray-300 rounded-lg p-2 items-center justify-center self-stretch">
                  <User className="h-5 w-5" aria-label="User account" />
                  <div className="ml-1">
                    <div className="text-sm font-medium text-gray-700">
                      {displayName}
                    </div>
                  </div>
                </div>
                <button
                  onClick={signOut}
                  className="p-2 text-gray-700 hover:text-gray-900 bg-gray-300 rounded-lg self-stretch"
                >
                  <LogOut className="h-5 w-5" aria-label="Sign out" />
                </button>
                <button
                  onClick={() => {
                    setShowSidebar(!showSidebar);
                  }}
                  className="p-2 text-gray-700 hover:text-gray-900 bg-gray-300 rounded-lg self-stretch"
                >
                  <Menu className="h-5 w-5" aria-label="Menu" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrimaryAppBar;
