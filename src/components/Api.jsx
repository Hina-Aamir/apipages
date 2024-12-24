import React, { useState, useEffect } from "react";

// Fake API function
const fakeApi = (url, method = "GET", data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "/api/data" && method === "GET") {
        resolve({ success: true, data: ["Item 1", "Item 2", "Item 3"] });
      } else if (url === "/api/data" && method === "POST") {
        resolve({ success: true, message: "Data saved successfully!", data });
      } else {
        reject({ success: false, message: "API not found!" });
      }
    }, 1000); // Simulate a network delay
  });
};

function Api() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setLoading(true);
    fakeApi("/api/data")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addItem = () => {
    if (!newItem) return;

    fakeApi("/api/data", "POST", newItem)
      .then((response) => {
        setData((prevData) => [...prevData, newItem]);
        setNewItem("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Fake API Example</h1>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
}

export default Api;
