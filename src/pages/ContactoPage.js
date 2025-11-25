import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import '../styles/style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';

export default function ContactoPage() {
  return (
    <div>
      <Header />

      <main className="contact-main-content">
        <Container>
          <Row className="justify-content-center py-5">
            <Col xs={12} md={10} lg={8}>
              <Card className="shadow-sm contact-form-container">
                <Card.Body className="p-4">
                  <h2 className="text-center mb-4" style={{fontFamily: 'Pacifico, cursive', color: '#5D4037'}}>
                    CONTÁCTANOS
                  </h2>
                  <Form onSubmit={(e) => { e.preventDefault(); alert('Su solicitud de contacto ha sido enviada exitosamente'); }}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>NOMBRE</Form.Label>
                      <Form.Control type="text" name="name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>CORREO</Form.Label>
                      <Form.Control type="email" name="email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="subject">
                      <Form.Label>ASUNTO</Form.Label>
                      <Form.Control type="text" name="subject" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="message">
                      <Form.Label>MENSAJE</Form.Label>
                      <Form.Control as="textarea" rows={5} required />
                    </Form.Group>

                    <Button type="submit" className="w-100">
                      ENVIAR
                    </Button>
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
