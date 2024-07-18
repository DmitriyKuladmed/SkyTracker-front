import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import '../styles/header.css';

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => {
      setShowLoginModal(false);
    };

    const handleCloseSuccessLoginModal = () => {
      setShowLoginModal(false);
      setLoggedIn(true);
      navigate('/');
    };

    const handleShowRegisterModal = () => setShowRegisterModal(true);
    const handleCloseRegisterModal = () => {
      setShowRegisterModal(false);
      navigate('/');
    };

    const handleLogout = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      setLoggedIn(false);
      navigate('/');
    };

    useEffect(() => {
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
  
      if (username && email) {
        setLoggedIn(true);
      }
    }, []);

    return (
      <header className="header">
        <div className="brand">
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#000' }}>SkyTracker</span>
        </div>
        <nav className="nav-bar">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" activeClassName="active" exact className="nav-link">
                Погода
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" activeClassName="active" exact className="nav-link">
                Профиль
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="auth-links">
          {!isLoggedIn ? (
            <>
              <button className="auth-button" onClick={handleShowRegisterModal}>
                Регистрация
              </button>
              <>|</>
              <button className="auth-button" onClick={handleShowLoginModal}>
                Авторизация
              </button>
              {showLoginModal && <div className="modal-backdrop" onClick={handleCloseLoginModal} />}
            </>
          ) : (
            <button className="logout-button" onClick={handleLogout}>Выйти</button>
          )}
        </div>
        <LoginModal show={showLoginModal} onHide={handleCloseLoginModal} onLogin={handleCloseSuccessLoginModal} />
        <RegisterModal show={showRegisterModal} onHide={handleCloseRegisterModal} />
      </header>
    );
};

export default Header;
