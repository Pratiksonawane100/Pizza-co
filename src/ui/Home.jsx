// import React from "react";
import UsernameInput from "../features/user/CreateUser";
import { useSelector, useDispatch } from "react-redux";
import { clearUsername } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUsername());
    navigate("/"); // Redirect to the home page or wherever you'd like
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 min-h-screen">
      {username && (
        <div className="bg-green-100 border border-green-200 p-4 mb-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-green-800">
            Welcome, {username}!
          </h1>
        </div>
      )}
      <div className="space-y-6">
        {username ? (
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Your Username
            </h2>
            <div className="text-lg font-medium text-gray-700 mb-4">
              {username}
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
            >
              Logout
            </button>
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Ready to order pizzas?
              </h2>
              <p className="text-gray-700 mb-4">
                Now that youve set up your username, you can start ordering your
                favorite pizzas.
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              >
                Order Now
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">
              Set Your Username
            </h2>
            <UsernameInput />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
