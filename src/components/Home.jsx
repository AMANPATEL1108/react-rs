import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/student/find-all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8080/student/delete/${id}`)
        .then(() => {
          alert("User deleted");
          fetchUsers(); // refresh list
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">User Table</h2>
        <Link
          to="/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Create Student
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Number</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.address}</td>
                  <td className="py-2 px-4 border-b">{user.number}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/edit/${user.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
