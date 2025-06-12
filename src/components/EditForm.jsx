import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    number: "",
  });

  useEffect(() => {
    // Fetch student by ID from backend
    axios
      .get(`http://localhost:8080/student/findbyid/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching student:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/student/updateBydid/${id}`, formData)
      .then(() => {
        alert("Student updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating student:", err);
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Save Changes
        </button>
      </form>

      <div className="flex justify-center mt-6">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default EditForm;
