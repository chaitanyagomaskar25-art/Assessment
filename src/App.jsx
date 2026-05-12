import React, { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([])
  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      const responce = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!responce.ok) throw new Error("Responce is not Okay");
      const data = await responce.json();
      setUsers(data);
      setFilteredUsers(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setSearch(value);
    console.log("users",users);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase().trim()),
    );
    console.log("filterd", filtered);
    
    return setFilteredUsers(filtered);
  };
 useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase().trim())
      );
      setFilteredUsers(filtered);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, users]);

  return (
    <div>
      <h1>Search Application</h1>
      <input
        value={search}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        type="text"
        placeholder="Search...."
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid black",
                padding: "5px",
                margin: "10px",
              }}
            >
              <h2>Name: {user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Mobile No.: {user.phone}</p>
            </div>
          ))
        ) : (
          <p>No user found</p>
        )} 
      </div>
    </div>
  );
};

export default App;
