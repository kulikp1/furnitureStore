import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import AdminRegister from "../AdminRegister/AdminRegister";
import AddItem from "../AddItem/AddItem";
import ContactsPage from "../ContactsPage/ContactsPage";
import ProductDetails from "../ProductDetailsPage/ProductDetailsPage";
import { CartProvider } from "../../context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminRegister />} />
          <Route path="/admin/addItem" element={<AddItem />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
