import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{backgroundColor: '#5F4B3C', color: '#fff', padding: '20px 0', marginTop: 'auto', width:'100%'}}>
      <Container fluid style={{paddingLeft:'2rem', paddingRight:'2rem'}}>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="mb-2 mb-md-0 text-center text-md-start">
            <p className="mb-0">Pasteleria Mil Sabores</p>
          </Col>
          <Col xs={12} md={4} className="mb-2 mb-md-0 text-center">
            <p className="mb-0">© 2025 - Todos los derechos reservados</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-end">
            <p className="mb-0">Contacto: info@milSabores.cl</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;