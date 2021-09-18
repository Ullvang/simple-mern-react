import { useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "/tests")
      .then((res) => console.log(res));
    axios
      .get(process.env.REACT_APP_SERVER + "/users")
      .then((res) => console.log(res));
    axios
      .get(process.env.REACT_APP_SERVER + "/")
      .then((res) => console.log(res));
  }, []);

  return (
    <div className="App">
      <h1>MERN</h1>
    </div>
  );
}

export default App;
