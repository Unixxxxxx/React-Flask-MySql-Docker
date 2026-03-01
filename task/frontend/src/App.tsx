import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div>
      <Login />

      <hr />

      <h2>Backend Test Section</h2>
      <p>{message || "Loading..."}</p>

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default App;
