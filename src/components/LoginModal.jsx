import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { loginUser } from '../api/user';
import '../styles/login.css';

const LoginModal = ({ show, onHide, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await loginUser(username, password);
            console.log('User logged in:', user);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            setUsername('');
            setPassword('');
            onLogin();
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
        <div className={`login-modal ${show ? 'show' : ''}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="close larger-close-button" onClick={onHide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modalHeader">
                        <span className="modal-title" style={{ fontWeight: 'bold' }}>Авторизация</span>
                        <hr style={{ width: '90%', borderTop: '2px solid red', boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.1)' }} />
                    </div>
                    <div className="modal-body" style={{ marginBlockStart: '15px', marginInlineStart: '20px' }}>
                        <Form>
                            <Form.Group controlId="formUsername">
                            <Form.Label style={{ fontWeight: 'bold', display: 'block' }}>Имя пользователя</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите имя пользователя"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px', width: '350px', height: '25px' }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label style={{ fontWeight: 'bold', display: 'block' }}>Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px', width: '350px', height: '25px' }}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button className="login-button" style={{ }} onClick={handleLogin}>Войти</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
