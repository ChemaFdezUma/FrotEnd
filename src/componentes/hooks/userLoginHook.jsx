import { useCallback, useContext } from "react";
import Context from "../contextos/userContext";
import {useNavigate} from "react-router-dom";
export default function useUser() {
    const navigate = useNavigate();
    const {jwt, setJWT} = useContext(Context)

    const login = useCallback(({username, password})=>{


    }, [setJWT])

    const logout = useCallback(()=>{
        setJWT(null)
        navigate("/")
    }, [setJWT])

        return{
            isLogged: Boolean(jwt),
            login,
            logout
        }
}