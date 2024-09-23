import React, { useEffect, useState } from 'react';
import StoreNavBar from '../../Components/PublicComponents/StoreNavBar';
import '../../Styles/Store/ProductsPage.css';
import Sidebar from '../../Components/Sidebar';
import '../../Styles/SidebarStyle.css';
import { Outlet } from 'react-router-dom';
import { getProducts } from '../../Services/Poducts/getProducts';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="sidebarbtn-container">
      <div className="products-container">
        <StoreNavBar />
        <Outlet context={{ products }} />
      </div>
    </div>
  );
};

export default Products;