import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../header";
import { useSelector } from "react-redux";

export default function AuthLayout(){

    const token = useSelector(state=>state.auth.token)
    
    if(!token)return(<Navigate to="/login"/>)
    return(
        <Outlet/>
    )
}