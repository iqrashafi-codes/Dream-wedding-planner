import {} from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        Dream Wedding
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/services" className="nav-link">
          Services
        </NavLink>
        <NavLink to="/gallery" className="nav-link">
          Gallery
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      
        <NavLink to="/signup" className="btn-nav">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;