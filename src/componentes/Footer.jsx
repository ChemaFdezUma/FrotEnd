import { useContext } from "react"
import { CartContext } from "./estadoGlobal"
import useAuth from "./hooks/useAuth";

export function Footer(){
    const {auth,actAuth} = useAuth();
    const {cart} = useContext(CartContext)
    return(
        <footer className="footer">
            
            {JSON.stringify(auth)}
            
        </footer>
    )
}