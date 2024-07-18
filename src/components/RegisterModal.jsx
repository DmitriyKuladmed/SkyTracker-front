import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { registerUser } from '../api/user';

import '../styles/register.css'; 

const RegisterModal = ({ show, onHide }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(email, username, password);
            setEmail('');
            setUsername('');
            setPassword('');
            onHide();
        } catch (error) {
            console.error('Ошибка регистрации пользователя: ', error);
        }
    };

    return (
        <>
            {show && <div className="modal-backdrop" />}
            <div className={`register-modal ${show ? 'show' : ''}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="close larger-close-button" onClick={onHide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modalHeader">
                            <span className="modal-title" style={{ fontWeight: 'bold' }}>Регистрация</span>
                            <hr style={{ width: '90%', borderTop: '2px solid red', boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.1)' }} />
                        </div>
                        <div className="modal-body" style={{ marginBlockStart: '15px', marginInlineStart: '20px' }}>
                            <Form>
                                <Form.Group controlId="formEmail">
                                    <Form.Label style={{ fontWeight: 'bold', display: 'block' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Введите email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px', width: '350px', height: '25px' }}
                                    />
                                </Form.Group>

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
                            <button className="register-button" style={{ }} onClick={handleRegister}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterModal;
