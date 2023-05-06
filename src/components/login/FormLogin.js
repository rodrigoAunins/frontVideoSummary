import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { validarEmail, validarPassword } from './helpers';
import { useNavigate } from 'react-router-dom';

const FormLogin = ({ setUsuarioLogeado }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msjError, setMsjError] = useState(false);
    const [errorText, setErrorText] = useState('');    
    const URL = 'http://localhost:4000/';

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        logear();
    };

    const logear = async () => {
        setMsjError(false);
        if (!email && !password) {
            setMsjError(true);
            setErrorText('Debes completar todos los campos');
        } else if (!validarEmail(email)) {
            setMsjError(true);
            setErrorText('Ingresa un mail válido');
        } else if (!validarPassword(password)) {
            setMsjError(true);
            setErrorText('Ingresa una Contraseña');
        } else {
            setMsjError(false);

            const User = {
                email,
                password,
            };

            try {
                const resp = await fetch(URL + 'login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(User),
                });

                if (resp.status === 200) {
                    const data = await resp.json();
                    //mando token a localstorage
                    localStorage.setItem('tokenUser', JSON.stringify(data));
                    //mando datos al state para poder verificar login
                    setUsuarioLogeado(data);
                    //navego a la pagina principal
                    navigate('/');
                } else if (resp.status === 401) {
                    setMsjError(true);
                    setErrorText('Usuario o contraseña inválidos');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {msjError ? (
                <Alert variant='danger' className="mt-4">
                    ERROR!!! {errorText}
                </Alert>
            ) : null}

            <div className='d-flex flex-column text-center '>
                <h1 className='mb-5'>Login</h1>
                <div className='mb-3' >
                    <label htmlFor="correo" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='User@correo.com'
                        id='correo'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-3' >
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder='***********'
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <button className='btn btn-primary'>Ingresar</button>
                </div>
            </div>
        </form>

    );
};

export default FormLogin;