import React from 'react';
import FormLogin from './FormLogin';
           
const Login = ({setUsuarioLogeado}) => {
    return (

        <div className='container'>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 ">                    
                    <FormLogin setUsuarioLogeado={setUsuarioLogeado} />
                </div>
            </div>
        </div>
    );
};

export default Login;