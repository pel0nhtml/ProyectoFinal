import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from '../../Components/PublicComponents/ProductCard'; // Importing the ProductCard component

const Laboratorio = () => {

  const { products } = useOutletContext();

  const filterProducts = products.filter(product => product.category === 'laboratorio');

  return (
    <div>
      <br />
      <br />
      <br />
     
      {/* Render the filtered products as ProductCard components */}
      <div className="product-list">
        {filterProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Laboratorio;
