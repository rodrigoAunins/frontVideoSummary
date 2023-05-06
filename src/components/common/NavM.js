import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const NavM = ({ usuarioLogeado, setUsuarioLogeado }) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('tokenUser')
        setUsuarioLogeado({});
        navigate('/login')
    }

    return (
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Navbar.Brand as={Link} to="#">Summary</Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    {
                        usuarioLogeado.nombre ? (
                            <>
                                <Nav >
                                    <NavLink end to="/" className="nav-item nav-link">Inicio</NavLink>
                                    <NavLink end to="/nosotros" className="nav-item nav-link">Nosotros</NavLink>
                                    <NavLink end to="/pro" className="nav-item nav-link">Versión Pro</NavLink>
                                </Nav>
                                <Nav className="justify-content-end">
                                    <NavLink end to="/login" className="nav-item nav-link" onClick={logout}>Logout</NavLink>
                                </Nav>
                            </>

                        ) : (

                            <Nav className="justify-content-end">
                                <NavLink end to="/login" className="nav-item nav-link">Login</NavLink>
                            </Nav>
                        )}
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default NavM;