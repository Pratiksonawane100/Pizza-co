// UsernameInput.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(updateName(input));
      navigate("/menu", { state: { usernameCreated: true } }); // Pass state
    } else {
      navigate("/menu", { state: { usernameCreated: false } }); // Pass state
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Username</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter username"
            className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
