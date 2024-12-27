import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { verifyToken } from './redux/actions/authActions';
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
