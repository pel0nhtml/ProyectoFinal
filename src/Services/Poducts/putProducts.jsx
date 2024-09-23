// src/services/putProduct.js

async function putProduct(productId, updatedProduct) {
    try {
        const response = await fetch(`http://localhost:5000/Products ${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            throw new Error('Error updating product');
        }

        const updatedProductResponse = await response.json();
        return updatedProductResponse;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

export { putProduct };
