import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import AdminRegister from "../AdminRegister/AdminRegister";
import AddItem from "../AddItem/AddItem";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminRegister />} />
        <Route path="/admin/addItem" element={<AddItem />} />
      </Routes>
    </Router>
  );
}
