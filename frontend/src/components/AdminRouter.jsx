import {Navigate, Outlet} from "react-router-dom"
import {jwtDecode} from "jwt-decode"

const isAdmin = () => {
    const token = localStorage.getItem("access_token")
    if (!token) return false  // token hi nahi → false
    try{

        const decoded = jwtDecode(token)  // token decode karo
        return decoded.role === 'admin'   // role check karo

    }
    catch{
        return false
    }


}


export default function AdminRouter({redirectTo = "/"}) {
    return isAdmin() ? <Outlet/> : <Navigate to={redirectTo} replace/>
}
