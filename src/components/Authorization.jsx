import React, { useState } from 'react';
import LoginModal from './LoginModal';

const AuthorizationPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container">
      <h2>Страница авторизации</h2>
      <p>Для продолжения, войдите в свой аккаунт.</p>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Войти
      </button>

      <LoginModal show={showModal} onHide={handleCloseModal} />
    </div>
  );
};

export default AuthorizationPage;