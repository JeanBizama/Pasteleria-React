import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import '../styles/style_login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';

export default function RegistroPage(){
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    email:'', 
    username:'', 
    fechaNacimiento:'', 
    password:'', 
    confirm_password:'', 
    cupon:'' 
  });
  const [error, setError] = useState(null); // Estado para manejar errores de la API
  const [success, setSuccess] = useState(false);


  async function onSubmit(e){
    e.preventDefault();
    setError(null); // Limpiar errores previos
    setSuccess(false);

    if (form.password !== form.confirm_password) {
        setError('Las contraseñas no coinciden');
        return;
    }

    const nuevo = { 
        email: form.email, 
        nombre: form.username, // Asumo que el backend espera 'nombre', no 'username'
        fechaNacimiento: form.fechaNacimiento, 
        password: form.password, 
        cupon: form.cupon 
    };
  try {
        await register(nuevo);
        
        setSuccess(true);
        
        setTimeout(() => {
            navigate('/'); 
        }, 1500);

    } catch (err) {
    setError(err.message || 'Ocurrió un error inesperado durante el registro.');
    }
  }

 return (
    <div>
      <Header />

      <main className="login-main-content">
        <Container>
          <Row className="justify-content-center py-5">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="app-surface">
              <Card.Body className="p-4">
                <h1 className="text-center mb-4" style={{fontFamily: 'Pacifico, cursive'}}>Registro</h1>
                  
                  {/* Mostrar mensajes de éxito y error aquí */}
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">¡Registro exitoso! Redirigiendo...</Alert>}

                  <Form onSubmit={onSubmit} id="FormularioRegistro">
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fecha_nacimiento">
                      <Form.Label>Fecha de Nacimiento</Form.Label>
                      <Form.Control type="date" value={form.fechaNacimiento} onChange={e=>setForm({...form, fechaNacimiento:e.target.value})} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirm_password">
                      <Form.Label>Confirmar contraseña</Form.Label>
                      <Form.Control type="password" value={form.confirm_password} onChange={e=>setForm({...form, confirm_password:e.target.value})} required />
                    </Form.Group>
                  <Form.Group className="mb-3" controlId="cupon">
                    <Form.Label>Código de descuento (Opcional)</Form.Label>
                    <Form.Control type="text" value={form.cupon} onChange={e=>setForm({...form, cupon:e.target.value})} />
                  </Form.Group>
                    <Button 
                        className="w-100 mb-3" 
                        type="submit"
                        disabled={isLoading} // Deshabilitar durante la carga
                    >
                      {isLoading ? 'Registrando...' : 'Registrarse'}
                    </Button>

                    <div className="text-center auth-links">
                      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia aquí</Link></p>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
