import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // axios
    //   .get(process.env.REACT_APP_SERVER + "/tests")
    //   .then((res) => console.log(res));
    axios
      .get(process.env.REACT_APP_SERVER + "/users")
      .then((res, err) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading users");
      });
    // axios
    //   .get(process.env.REACT_APP_SERVER + "/")
    //   .then((res) => console.log(res));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      age,
      email,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/users", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setName("");
        setAge("");
        setEmail("");
        setUsers((users) => [...users, res.data]);
        if (error) {
          setError(false);
        }
        console.log(res);
      })
      .catch((err) => {
        setError("Error posting new user");
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>MERN</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <br />
        <label htmlFor="age">Age</label>
        <br />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          id="age"
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
        <br />
        <button>Send</button>
      </form>
      <div className="users">
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading</p>
        ) : users.length > 0 ? (
          <>
            <h2>Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id}>{user.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No users</p>
        )}
      </div>
    </div>
  );
}

export default App;
