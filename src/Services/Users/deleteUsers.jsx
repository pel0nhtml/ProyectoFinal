
async function deleteUser(UserId) {
    try {
        const response = await fetch(`http://localhost:5000/Users/${UserId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error deleting product');
        }

        return response.ok;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

export { deleteUser };

  