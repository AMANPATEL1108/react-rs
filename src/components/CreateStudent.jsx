import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    number: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/student/create-student", formData)
      .then((res) => {
        alert("Student created successfully!");
        navigate("/"); // Go back to home page
      })
      .catch((err) => {
        console.error("Error creating student:", err);
        alert("Failed to create student.");
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Create Student</h2>
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
          Add Student
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
