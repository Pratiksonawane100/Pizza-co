// import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  // Fallback error message
  const errorMessage = error?.data || "An unexpected error occurred.";

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Oops! Something went wrong.</h2>
      <p style={styles.message}>{errorMessage}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "5px",
    margin: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  message: {
    fontSize: "18px",
  },
};

export default Error;
