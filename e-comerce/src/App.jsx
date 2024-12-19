import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import SignupForm from "./components/SignupForm"; // SignupForm bileşeni ekleniyor
import Login from "./components/Login";
import ShopPage from "./pages/ShopPage";
import { Provider } from "react-redux";
import store from "./redux/store";



const App = () => {
  return (
    
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupForm />} /> 
            <Route path="/login" element={<Login />}/>
            <Route path="/shop" element={<ShopPage />} />
            
           
          </Routes>
          
        </main>
      </div>
    </Router>
   
  );
};

export default App;
