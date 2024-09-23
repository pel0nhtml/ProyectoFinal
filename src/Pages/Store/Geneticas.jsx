import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from '../../Components/PublicComponents/ProductCard'; // Importing the ProductCard component

const Geneticas = () => {

  const { products } = useOutletContext();

  const filterProducts = products.filter(product => product.category === 'geneticas');

  return (
    <div>
      {/* Espacio para el navbar */}
      <br />    
      <br />
      <br />
      {/* Render Productos*/}
      <div className="product-list">
        {filterProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Geneticas;
