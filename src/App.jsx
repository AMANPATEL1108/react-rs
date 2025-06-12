import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
import EditForm from "./components/EditForm";
import CreateStudent from "./components/CreateStudent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditForm />} />
          <Route path="/create" element={<CreateStudent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
