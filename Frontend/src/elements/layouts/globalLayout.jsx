import { Outlet } from "react-router-dom";
import Header from "../header";

export default function GlobalLayout(){
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}