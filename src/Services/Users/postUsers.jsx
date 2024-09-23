export async function postUsers (username, email, password, role= 'user') {
    try {
        // Construir el objeto de datos del usuario
        
        const userData = {
            username,
            email,
            password,
            role
        };

        // Enviar los datos al servidor
        const response = await fetch("http://localhost:5000/Users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Retornar la respuesta en formato JSON
        return await response.json();

    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}
