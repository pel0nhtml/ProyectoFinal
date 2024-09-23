import React from 'react';

import '../../Styles/Store/ProductCard.css'; // Import the CSS style file

const ProductCard = ({ product }) => {
    return (
        <div className="Product-Card">
            <img src={product.imageUrl} alt={product.name} className="product-image"/>
            <div className="ProductDetails">
                <h3 className="ProductName">{product.name}</h3>
                <p className="ProductPrice">${product.price}</p>
                <div className="ProductColor">
                    <span className="ColorCircle" style={{ backgroundColor: "#EAA118" }}></span>
                    <span className="ColorCircle" style={{ backgroundColor: "#1F1F1A" }}></span>
                    <span className="ColorCircle" style={{ backgroundColor: "#CF9E3F" }}></span>
                </div>
                <div className="product-actions">
                    <button className="BtnAdd2Cart">Add to Cart</button>
                    <button className="BtnFav"><i className="fas fa-heart"></i></button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
