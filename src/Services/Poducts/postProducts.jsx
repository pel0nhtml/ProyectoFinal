
async function postProduct(product) {
    try {
        const response = await fetch('http://localhost:5000/Products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Error posting product');
        }

        const newProduct = await response.json();
        return newProduct;
    } catch (error) {
        console.error('Error posting product:', error);
        throw error;
    }
}

export { postProduct };
