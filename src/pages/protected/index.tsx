import { Navigate } from "react-router-dom"

export interface element{
    element: JSX.Element
}

function index({element}: element) {
    return localStorage.getItem('access_token') ? <Navigate to="/dashboard"/> : element
}


export default index