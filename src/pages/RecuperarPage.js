import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import '../styles/style.css';
import '../styles/style_login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RecuperarPage(){
  const { listUsers, updateUserByIndex } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('request'); // 'request' | 'reset' | 'done'
  const [email, setEmail] = useState('');
  const [userIndex, setUserIndex] = useState(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleRequest(e){
    e.preventDefault();
    setError('');
    const users = listUsers ? listUsers() : [];
    const idx = users.findIndex(u => u.email && u.email.toLowerCase() === email.trim().toLowerCase());
    if (idx === -1){
      setError('No encontramos una cuenta con ese correo.');
      return;
    }
    setUserIndex(idx);
    setStep('reset');
  }

  function handleReset(e){
    e.preventDefault();
    setError('');
    if (!password || password.length < 4){
      setError('La nueva contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (password !== confirm){
      setError('Las contraseñas no coinciden.');
      return;
    }
    try{
      if (userIndex !== null && typeof updateUserByIndex === 'function'){
        updateUserByIndex(userIndex, { password });
        setSuccess('Contraseña restablecida correctamente. Redirigiendo a Iniciar sesión...');
        setStep('done');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError('No se pudo actualizar la contraseña.');
      }
    } catch (e){
      setError('Ocurrió un error al actualizar la contraseña.');
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
                  <h1 className="text-center mb-4" style={{fontFamily: 'Pacifico, cursive'}}>Recuperar Contraseña</h1>
                  {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                  {success && <Alert variant="success" className="mb-3">{success}</Alert>}

                  {step === 'request' && (
                    <Form onSubmit={handleRequest} id="FormularioRecuperar">
                      <Form.Group className="mb-3" controlId="email_reset">
                        <Form.Label>Ingresar Correo electrónico</Form.Label>
                        <Form.Control type="email" name="email_reset" value={email} onChange={e => setEmail(e.target.value)} required />
                      </Form.Group>
                      <Button className="w-100" type="submit">Continuar</Button>
                    </Form>
                  )}

                  {step === 'reset' && (
                    <Form onSubmit={handleReset} id="FormularioNuevaClave">
                      <Form.Group className="mb-3" controlId="new_password">
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={4} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="confirm_password">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={4} />
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button type="button" className="flex-fill" onClick={() => { setStep('request'); setPassword(''); setConfirm(''); }}>Volver</Button>
                        <Button type="submit" className="flex-fill">Restablecer contraseña</Button>
                      </div>
                    </Form>
                  )}
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
