import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/common/Footer';
import NavM from './components/common/NavM';
import Error404 from "./components/view/Error404";
import FormSammary from './components/sammary/FormSummary';
import Nosotros from './components/nosotros/Nosotros';
import VersionPro from './components/pro/VersionPro';
import Login from './components/login/Login';
import FormLogin from './components/login/FormLogin';
import { useState } from 'react';
import RutasProtejidas from './components/routes/RutasProtejidas';

function App() {

    const [usuarioLogeado, setUsuarioLogeado] = useState({})

    return (
        <div className="d-flex flex-column vh-100">
            <BrowserRouter>
                <NavM usuarioLogeado={usuarioLogeado} setUsuarioLogeado={setUsuarioLogeado} />
                <div className="flex-grow-1 d-flex justify-content-center align-items-center h-100">
                    <Routes>
                        <Route path='/*' element={
                            <RutasProtejidas>
                                <Routes>
                                    {/* Esto es para indicar la ruta principal con la / */}
                                    {/* path: es la ruta */}
                                    {/* element: es el elemento a mostrar */}
                                    <Route path="/" element={<FormSammary />} />
                                    <Route path="/nosotros" element={<Nosotros />} />
                                    <Route path="/pro" element={<VersionPro />} />
                                </Routes>
                            </RutasProtejidas>
                        }></Route>
                        {/* '/:' esa combinacion de caracteres indica q recibe un parametro */}
                        <Route path="/login" element={<Login setUsuarioLogeado={setUsuarioLogeado} />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
