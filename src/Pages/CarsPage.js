import React, { useState, useEffect } from "react";
import axios from "axios";
import './Car.css'; // Import your styles

const CarsPage = () => {
  const [cars, setCars] = useState([]); // State for the car list
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
  }); // State for the form
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for handling API errors

  // Fetch the cars when the page loads
  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch cars from the backend
  const fetchCars = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:5001/api/cars"); // Adjust your API URL here
      setCars(response.data); // Set the cars state with the fetched data
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to fetch car data. Please try again.");
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/cars", formData); // Adjust your API URL here
      setCars([...cars, response.data]); // Add the new car to the list
      setFormData({ name: "", brand: "", price: "" }); // Reset the form
    } catch (err) {
      console.error("Error adding car:", err);
      setError("Failed to add car. Please try again.");
    }
  };

  return (
    <div className="cars-management">
      <h1 className="cars-management__title">Car Management</h1>

      {/* Add Car Form */}
      <div className="cars-management__form">
        <h2 className="cars-management__form-title">Add a New Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="cars-management__form-inputs">
            <div>
              <label>Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="cars-management__form-submit">
              Add Car
            </button>
          </div>
        </form>
      </div>

      {/* Car List */}
      <div>
        <h2 className="cars-management__list-title">Car List</h2>

        {loading ? (
          <p>Loading cars...</p> // Show loading message while fetching
        ) : cars.length > 0 ? (
          <ul>
            {cars.map((car) => (
              <li key={car._id} className="cars-management__list-item">
                <p>
                  <strong>Name:</strong> {car.name}
                </p>
                <p>
                  <strong>Brand:</strong> {car.brand}
                </p>
                <p>
                  <strong>Price:</strong> ${car.price}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cars-management__list-empty">No cars available. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
