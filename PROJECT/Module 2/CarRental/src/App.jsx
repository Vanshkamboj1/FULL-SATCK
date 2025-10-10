import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import BookNow from './Pages/BookNow';
import Booking from './Pages/Booking'; // import booking page
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page (no navbar/footer) */}
        <Route path="/" element={<LoginPage />} />

        {/* User pages with navbar & footer */}
        <Route
          path="/user"
          element={
            <>
              <Navbar />
              <LandingPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/user/about"
          element={
            <>
              <Navbar />
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/user/booknow"
          element={
            <>
              <Navbar />
              <BookNow />
              <Footer />
            </>
          }
        />

        {/* Booking page */}
        <Route
          path="/user/booking/:id"
          element={
            <>
              <Navbar />
              <Booking />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
