import React from 'react';
import { Nav, Container } from 'react-bootstrap';

const CategoryFilter = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <Container fluid className="nav-body" id="categoryFilter" style={{backgroundColor: '#947259', color: '#F5EFE6'}}>
      <Nav className="justify-content-center flex-wrap py-1">
        {categories.map(category => (
          <Nav.Link
            key={category}
            onClick={() => onFilterChange(category)}
            data-category={category}
            style={{
              background: 'transparent',
              border: 'none',
              color: category === activeFilter ? '#FFC0CB' : '#F5EFE6',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '0.35rem 0.75rem',
              lineHeight: 1.2
            }}
          >
            {category === 'all' 
              ? 'Todos' 
              : category.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase())}
          </Nav.Link>
        ))}
      </Nav>
    </Container>
  );
};

export default CategoryFilter;