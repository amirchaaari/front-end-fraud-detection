import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route,Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardOwner from "./components/BoardOwner";
import BoardAdmin from "./components/BoardAdmin";
import BoardSupervisor from "./components/BoardSupervisor";
import BoardFraudAnalyst from "./components/BoardFraudAnalyst";
import RecoverPassword from "./components/RecoverPassword";




const App = () => {


  const [showSupervisorBoard, setShowSupervisorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showFraudAnalystBoard, setShowFraudAnalystBoard] = useState(false);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowFraudAnalystBoard(user.roles.includes("ROLE_FRAUD-ANALYST"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowSupervisorBoard(user.roles.includes("ROLE_SUPERVISOR"));

    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          fraud-detection
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showFraudAnalystBoard && (
            <li className="nav-item">
              <Link to={"/fa"} className="nav-link">
                FraudAnalyst Board
              </Link>
            </li>
          )}
             {showSupervisorBoard && (
            <li className="nav-item">
              <Link to={"/sup"} className="nav-link">
                supervisor Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/owner"} className="nav-link">
                owner Board
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/owner" element={<BoardOwner/>} />
          <Route path="/sup" element={<BoardSupervisor/>} />
          <Route path="/FA" element={<BoardFraudAnalyst/>} />
         <Route path="/admin" element={<BoardAdmin/>} />
         <Route path="/recoverpassword" element={<RecoverPassword/>} />

        </Routes>
  
      </div>
    </div>
  );
};

export default App