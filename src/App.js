import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/common/Footer';
import NavM from './components/common/NavM';
import Error404 from "./components/view/Error404";
import FormSammary from './components/sammary/FormSummary';
import Nosotros from './components/nosotros/Nosotros';
import VersionPro from './components/pro/VersionPro';
import Login from './components/login/Login';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <BrowserRouter>
        <NavM />
        <div className="flex-grow-1">
          <Routes>
            {/* Esto es para indicar la ruta principal con la / */}
            {/* path: es la ruta */}
            {/* element: es el elemento a mostrar */}
            <Route path="/" element={<FormSammary />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/pro" element={<VersionPro />} />
            {/* '/:' esa combinacion de caracteres indica q recibe un parametro */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error404/>} />
          </Routes>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur velit a facilis aspernatur, voluptates earum consequuntur provident sit quos? Esse aliquid ab autem, perferendis porro a officia repudiandae minus veritatis tempore voluptatum aspernatur eveniet iste praesentium voluptates, architecto accusamus amet harum ratione temporibus, cum nemo itaque molestias. Dolorum, minus repudiandae!
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
