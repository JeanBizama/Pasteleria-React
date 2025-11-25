import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import '../styles/style_login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';

export default function LoginPage(){
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState(null); 

  async function onSubmit(e){
    e.preventDefault();
    setError(null);
    try{
      await login(form.email.trim(), form.password);
      navigate('/');
    }catch(err){ 
      setError(err.message || 'Error de conexión. Inténtalo más tarde.');
    }
  }

  return (
    <div>
      <Header />

      <main className="login-main-content">
        <Container>
          <Row className="justify-content-center py-5">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card className="app-surface">
                <Card.Body className="p-4">
                  <h1 className="text-center mb-4" style={{fontFamily: 'Pacifico, cursive'}}>Iniciar sesión</h1>
                  
                  {error && <Alert variant="danger">{error}</Alert>} {/* 💡 Mostrar error */}

                  <Form onSubmit={onSubmit} id="FormularioInicio">
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control 
                        type="email" 
                        value={form.email} 
                        onChange={e=>setForm({...form,email:e.target.value})}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={form.password} 
                        onChange={e=>setForm({...form,password:e.target.value})}
                        required
                      />
                    </Form.Group>

                    <Button 
                        className="w-100 mb-3" 
                        type="submit"
                        disabled={isLoading} // 💡 Deshabilitar durante la carga
                    >
                      {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
                    </Button>

                    <div className="text-center auth-links">
                      <p className="mb-2">
                        ¿Olvidaste tu contraseña? <Link to="/recuperar">Recupérala aquí</Link>
                      </p>
                      <Link to="/registro">Regístrate aquí</Link>
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
