import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import logo from '../logo.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header(){
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  function handleLogout(){
    logout();
    navigate('/');
  }

  return (
    <Navbar variant="dark" expand="lg" fixed="top" style={{backgroundColor: '#5F4B3C'}}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={logo} 
            alt="Mil Sabores" 
            height="40"
            className="me-2"
          />
          <span>Mil Sabores</span>
        </Navbar.Brand>
        {user && (
          <div className="d-lg-none ms-auto me-2 position-relative">
            <Nav.Link as={Link} to="/carrito" className="p-0" style={{color: '#fff'}}>
              <span className="material-symbols-outlined" style={{fontSize:'28px'}}>shopping_cart</span>
              {totalItems() > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{fontSize: '0.7rem'}}
                >
                  {totalItems()}
                </Badge>
              )}
            </Nav.Link>
          </div>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto main-nav">
            <Nav.Link as={Link} to="/" style={{color: '#fff'}} className="nav-link-custom">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos" style={{color: '#fff'}} className="nav-link-custom">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros" style={{color: '#fff'}} className="nav-link-custom">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/blogs" style={{color: '#fff'}} className="nav-link-custom">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/contacto" style={{color: '#fff'}} className="nav-link-custom">Contacto</Nav.Link>

            {user ? (
              user.rol === 'admin' ? (
                <>
                  <Nav.Link onClick={() => navigate('/admin')} className="d-lg-none" style={{color: '#fff'}}>Administración</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="d-lg-none" style={{color: '#fff'}}>Cerrar sesión</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => navigate('/perfil')} className="d-lg-none" style={{color: '#fff'}}>Perfil</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="d-lg-none" style={{color: '#fff'}}>Cerrar sesión</Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="d-lg-none" style={{color: '#fff'}}>Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro" className="d-lg-none" style={{color: '#fff'}}>Registrarse</Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav className="ms-auto align-items-lg-center">
            {user && (
              <Nav.Link as={Link} to="/carrito" className="position-relative me-3 d-none d-lg-inline-block" style={{color: '#fff'}}>
                <span className="material-symbols-outlined">shopping_cart</span>
                {totalItems() > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{fontSize: '0.7rem'}}
                  >
                    {totalItems()}
                  </Badge>
                )}
              </Nav.Link>
            )}

            {user ? (
              <>
                <NavDropdown
                  className="d-none d-lg-block"
                  title={
                    <span
                      className="user-toggle-label d-inline-flex align-items-center"
                      style={{ color: '#5F4B3C', gap: '4px' }}
                    >
                      {user.username}
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '18px', lineHeight: 1, color: '#5F4B3C' }}
                      >
                        expand_more
                      </span>
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  {user.rol === 'admin' ? (
                    <NavDropdown.Item onClick={() => navigate('/admin')}>
                      Administración
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item onClick={() => navigate('/perfil')}>
                      Perfil
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>

              </>
            ) : (
              <>
                {/* Desktop auth links only; mobile versions are inside main-nav */}
                <Nav.Link as={Link} to="/login" style={{color: '#fff'}} className="nav-link-custom d-none d-lg-inline-block">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro" style={{color: '#fff'}} className="nav-link-custom d-none d-lg-inline-block">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
