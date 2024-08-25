// Home.jsx
// import React from "react";
import Username from "../features/user/Username";
import UsernameInput from "../features/user/CreateUser"; // Adjust the path as needed

function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Hello world!
      </h1>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Username</h2>
          <Username />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Set Your Username</h2>
          <UsernameInput />
        </div>
      </div>
    </div>
  );
}

export default Home;
