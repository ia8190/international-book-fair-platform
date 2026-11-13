import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header'; // Default Header
import LoggedInHeader from './components/LoggedInHeader'; // New LoggedInHeader
import Footer from './components/Footer';

import Home from './pages/Home';
import Visitor from './pages/Visitor';
import Exhibitor from './pages/Exhibitor';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';

import AdminDashboard from './pages/AdminDashboard';
import ManageExhibitors from './pages/ManageExhibitors';
import ManageBooks from './pages/ManageBooks';
import ManageStalls from './pages/ManageStalls';

import ExhibitorDashboard from './pages/ExhibitorDashboard';
import ExhibitorBooks from './pages/ExhibitorBooks';
import BookStall from './pages/BookStall';
import ExhibitorRegister from './pages/ExhibitorRegister';

import VisitorDashboard from './pages/VisitorDashboard';
import RulesAndRegulations from './pages/RulesAndRegulations';
import TicketBooking from './pages/TicketBooking';
import ExhibitorList from './pages/ExhibitorList';
import ExhibitorDetails from './pages/ExhibitorDetails';
import BookList from './pages/BookList';

import ProtectedRoute from './components/ProtectedRoute';

function RoutePosition() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const titles = { '/': 'Discover', '/about': 'Our story', '/login': 'Log in', '/register': 'Join the fair', '/visitor': 'Visit the fair', '/exhibitor': 'Exhibit with us' };
    document.title = `${titles[pathname] || 'Explore'} | International Book Fair · Cork`;
    const frame = requestAnimationFrame(() => {
      const section = hash && document.getElementById(hash.slice(1));
      if (section) section.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if the user is logged in and their role
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token); // Convert token to boolean
    setUserRole(role);
  }, []);

  const handleLogin = (role) => {
    // Update state upon login
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    // Clear auth-related data and update state
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      <RoutePosition />
      {isLoggedIn ? (
        <LoggedInHeader role={userRole} onLogout={handleLogout} />
      ) : (
        <Header />
      )}
      <main className="main-content" id="main-content" tabIndex={-1}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/visitor" element={<Visitor />} />
          <Route path="/exhibitor" element={<Exhibitor />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login onLogin={(role) => handleLogin(role)} />}
          />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visitor-dashboard"
            element={
              <ProtectedRoute role="visitor">
                <VisitorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exhibitor-dashboard"
            element={
              <ProtectedRoute role="exhibitor">
                <ExhibitorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Exhibitor-Specific Pages */}
          <Route path="/exhibitor/books" element={<ExhibitorBooks />} />
          <Route path="/exhibitor/register" element={<ExhibitorRegister />} />
          <Route path="/exhibitor/book-stall" element={<BookStall />} />

          {/* Admin-Specific Pages */}
          <Route path="/admin/books" element={<ManageBooks />} />
          <Route path="/admin/stalls" element={<ManageStalls />} />
          <Route path="/admin/exhibitors" element={<ManageExhibitors />} />

          {/* Visitor-Specific Pages */}
          <Route path="/visitor/rules" element={<RulesAndRegulations />} />
          <Route path="/visitor/ticket-booking" element={<TicketBooking />} />
          <Route path="/visitor/exhibitor-list" element={<ExhibitorList />} />
          <Route
            path="/visitor/exhibitor-list/:id"
            element={<ExhibitorDetails />}
          />
          <Route path="/visitor/book-search" element={<BookList />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
