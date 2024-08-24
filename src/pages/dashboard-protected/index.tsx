import { Navigate } from "react-router-dom"

export interface element{
    element: JSX.Element
}

function index({element}: element) {
    return localStorage.getItem('access_token') ? element : <Navigate to="/"/>
}


export default index