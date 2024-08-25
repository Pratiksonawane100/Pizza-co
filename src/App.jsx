import { useState, useEffect } from "react";
import Applayout from "./ui/Applayout";
import Loader from "./Loader";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <div className="App">{loading ? <Loader /> : <Applayout />}</div>;
}

export default App;
