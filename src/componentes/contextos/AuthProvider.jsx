import { createContext, useState } from "react";
import axios from "../api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const  actAuth = async () => {
        const {username,password,accessToken} = auth;
        const response = await axios.get('http://localhost:8000/usuario/comprobar/', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                },withCredentials: true
              });
              const cookie = await axios.get("http://localhost:8000/usuario/getcookie",{withCredentials: true})

              const usuario = await axios.post(`http://localhost:8000/usuario/getUsuarioByCryptedRefreshToken/`,{
                refreshToken: cookie.data
              }, )
              console.log(usuario.data)
              if(response.data == "fuera"){
                setAuth({ username:usuario.data.email, accessToken:accessToken,valido:0});
                }else if(response.data =="OK"){
                    setAuth({ username:usuario.data.email,accessToken:accessToken,valido:1});
                }else{
                    setAuth({ username:usuario.data.email,accessToken:response.data,valido:1 });
                }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, actAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;