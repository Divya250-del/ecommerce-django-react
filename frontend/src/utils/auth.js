import { jwtDecode } from "jwt-decode" 
export const saveToken = (token) => {

    localStorage.setItem("access_token",token.access);
    localStorage.setItem("refresh_token",token.refresh);

}

export const clearTokens = () =>{
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
}


export const getAccessToken = () =>{
        return localStorage.getItem("access_token");


}
export const getRole = () => {
    const token = getAccessToken();
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded.role;  // 'admin' or 'customer'
    } catch {
        return null;
    }
}

export const authFetch = (url, options = {}) =>{
    const token = getAccessToken();
    const headers = options.headers ? {
        ...options.headers
    } : {};

    if (token) headers["Authorization"] = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";

    return fetch(url,{
        ...options,
        headers,
    });



}

