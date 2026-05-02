import { jwtDecode } from "jwt-decode" 




export const authFetch = (url, options = {}) =>{
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

