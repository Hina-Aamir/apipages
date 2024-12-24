import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setData(json); // Save data in state
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Fetched Products</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {data.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Img
                variant="top"
                src={item.images && item.images[0] ? item.images[0] : "https://via.placeholder.com/100"}
              />
              <Card.Body>
                <Card.Title>{item.title || "Untitled Product"}</Card.Title>
                <Card.Text>
                  {item.description || "No description available"}
                </Card.Text>
                <Card.Text>Price: ${item.price || "N/A"}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DataFetcher;
