import React from 'react';

const CategoryFilter = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <nav className="nav-body" id="categoryFilter">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          data-category={category}
          style={{
            background: 'transparent',
            border: 'none',
            color: category === activeFilter ? '#var(--primary-color)' : 'inherit',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {category === 'all' 
            ? 'Todos' 
            : category.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase())}
        </button>
      ))}
    </nav>
  );
};

export default CategoryFilter;