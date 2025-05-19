// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Homepage from "./pages/Homepage/Homepage";
import AddFoodForm from "./pages/AddFood/AddFood";
import FoodDetailPage from "./pages/FoodDetailPage/FoodDetailPage";
import Favorite from "./pages/Favorite/Favorite";
import Menu from "./pages/Menu/Menu";
import Review from "./pages/Review/Review";
// import ProtectedRoute from "./components/ProtectedRoute";
import Anket from "./pages/Anket/Anket";
import Recommendations from "./pages/Recommendations/Recommendations";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        <Route
          path="/favorites"
          element={
            <AuthLayout>
              <Favorite />
            </AuthLayout>
          }
        />

        <Route
          path="/recommendations"
          element={
            <AuthLayout>
              <Recommendations />
            </AuthLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            
              <MainLayout>
                <Homepage />
              </MainLayout>
            
          }
        />
        {/* add food page */}
        <Route
          path="/foods/add"
          element={
      
              <MainLayout>
                <AddFoodForm />
              </MainLayout>
            
          }
        />
        <Route
          path="/foods/:id"
          element={
          
              <MainLayout>
                <FoodDetailPage />
              </MainLayout>
        
          }
        />
        <Route
          path="/suggest/anket"
          element={
            
              <MainLayout>
                <Anket />
              </MainLayout>
            
          }
        />
        <Route
          path="/menu"
          element={
            
              <MainLayout>
                <Menu />
              </MainLayout>
            
          }
        />
        <Route
          path="/reviews/:foodId"
          element={
            
              <MainLayout>
                <Review />
              </MainLayout>
          
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
