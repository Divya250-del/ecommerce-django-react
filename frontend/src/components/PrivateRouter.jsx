import {Navigate, Outlet} from "react-router-dom"

const isAuthenticate = () => !!localStorage.getItem("access_token");


export default function PrivateRouter({redirectTo = "/login"}) {
    return isAuthenticate() ? <Outlet/> : <Navigate to={redirectTo} replace/>
}
