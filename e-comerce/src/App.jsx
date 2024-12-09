import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      
        <Header />

        <main className="flex-grow">
          <Routes>
           
            <Route path="/" element={<HomePage />} />

          </Routes>
        </main>

       
      </div>
    </Router>
  );
};

export default App;
