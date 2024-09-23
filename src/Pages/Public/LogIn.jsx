import React from 'react';
import FormLogIn from '../../Components/PublicComponents/FormLogIn';

function LogIn({ onLoginSuccess }) {
    return (
        <div>
        
        <FormLogIn onLoginSuccess={onLoginSuccess} /> 

        </div>
    );
    }

    export default LogIn;