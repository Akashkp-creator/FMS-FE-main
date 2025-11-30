// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  publicNavLinks,
  roleBasedNavLinks,
  commonAuthLinks,
} from "../../config/navigation";
import {
  Menu,
  X,
  LogIn,
  Home,
  Building2,
  Users,
  BarChart3,
  Phone,
  CircleUser,
} from "lucide-react";
import styles from "./Navbar.module.css";
// import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice/authSlice";
import api from "../../utils/axiosConfig"; // 👈 your custom axios instance
// import { useLocation } from "react-router-dom";
// import { Link, Navigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { roleRoutes } from "../../utils/roleRoutes";

const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout"); // ✅ your backend logout route
    toast.success("Logout successful");

    return res.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===============================
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getRoleBasedLinks = () => {
    if (!user || !user.role) return [];
    return roleBasedNavLinks[user.role] || [];
  };
  // console.log(getRoleBasedLinks());

  const getAllNavLinks = () => {
    if (!isAuthenticated || !user || !user.role) {
      return [...publicNavLinks];
    }

    const roleLinks = getRoleBasedLinks();
    return [...roleLinks, ...commonAuthLinks]; // add shared links if needed
  };

  // ===============================

  const navItems = getAllNavLinks();

  const handleProfileClick = () => {
    const route = roleRoutes[user?.role];
    if (route) navigate(route);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.navContainer}>
          {/* Logo */}
          {/* <div className={styles.logo}>
            <Building2 className={styles.logoIcon} />
            <span className={styles.logoText}>UPL Partner</span>
          </div> */}

          <Link to="/" className={styles.logoLink}>
            {" "}
            {/* Use Link component with 'to' prop */}
            <div className={styles.logo}>
              {user?.client?.logoUrl ? (
                <img
                  src={user.client.logoUrl}
                  alt="Logo"
                  className={styles.logoImg}
                />
              ) : (
                <span className={styles.logoText}>
                  <img
                    src="https://www.snipe.co.in/img/logo.png"
                    alt="Snipe Pvt Ltd"
                  />
                </span>
              )}
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className={styles.navLinks}>
            {navItems.map((item, index) => (
              <NavLink
                key={item.label}
                to={item.href} // ✅ use "to" instead of "href"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            {/* <button className={styles.loginBtn}>
              <LogIn size={18} />
              <span>Login</span>
            </button> */}
            {/* <NavLink
              to="/login"
              className={({ isActive }) =>
                `${styles.loginBtn} ${isActive ? styles.activeLoginBtn : ""}`
              }
            >
              <LogIn size={18} />
              <span>Login</span>
            </NavLink> */}
            {isAuthenticated ? (
              <>
                {/* <span className={styles.profile}> */}
                {/* {user?.name || "User"}😊 {console.log(user)} */}
                {/* {console.log(user)}
                  <CircleUser />
                </span> */}
                <span
                  className={styles.profile}
                  onClick={handleProfileClick}
                  // data-tooltip={`user?.name` || "User"}
                  data-tooltip={`${user?.name || "User"} Profile`}
                >
                  <CircleUser />
                  Profile
                </span>
                {/* // ✅ Show Logout when user is logged in */}
                <button
                  className={styles.loginBtn}
                  onClick={async () => {
                    try {
                      await logoutUser(); // backend logout
                      dispatch(logout()); // redux logout
                      navigate("/"); // ⬅️ redirect to home
                    } catch (error) {
                      toast.error("Logout failed");
                      console.log(error);
                    }
                  }}
                >
                  <LogIn size={18} style={{ transform: "rotate(180deg)" }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* // ✅ Show Login when user is not authenticated */}
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${styles.loginBtn} ${
                      isActive ? styles.activeLoginBtn : ""
                    }`
                  }
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </NavLink>
                <button className={styles.getStartedBtn}>Get Started</button>{" "}
              </>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {/* <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuContent}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.mobileNavIcon}>{item.icon}</span>
              {item.label}
            </a>
          ))}
          <div className={styles.mobileCtaButtons}>
            <Link to="/login" className={styles.mobileLoginBtn}>
              <LogIn size={18} />
              <span>Login</span>
            </Link>

            <button className={styles.mobileGetStartedBtn}>Get Started</button>
          </div>
        </div>
      </div> */}
      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuContent}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.mobileNavIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className={styles.mobileCtaButtons}>
            {isAuthenticated ? (
              <>
                <span
                  className={styles.profile}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleProfileClick();
                  }}
                  // data-tooltip={`user?.name` || "User"}
                  data-tooltip={`${user?.name || "User"} Profile`}
                >
                  <CircleUser />
                  Profile
                </span>

                <button
                  className={styles.mobileLoginBtn}
                  onClick={async () => {
                    try {
                      await logoutUser();
                      dispatch(logout());
                      setIsMenuOpen(false);
                      navigate("/");
                    } catch (error) {
                      toast.error("Logout failed");
                      console.log(error);
                    }
                  }}
                >
                  <LogIn size={18} style={{ transform: "rotate(180deg)" }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={styles.mobileLoginBtn}
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}

            <button
              className={styles.mobileGetStartedBtn}
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
