import { Navigate } from "react-router-dom"


const RutasProtejidas = ({ children }) => {

    const token = JSON.parse(localStorage.getItem('tokenUser')) || null

    if (!token) {
        return <Navigate to={'/login'}></Navigate>
    } else {
        return children
    }
}

export default RutasProtejidas