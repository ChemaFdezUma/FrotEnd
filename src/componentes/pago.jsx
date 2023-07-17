import axios from "axios";
import useSelector from "react-redux";
import { useCart } from "./useCart";
const PayButton = () => {
    const {cart , getTotal} = useCart();
    const handleClick = () => { 
        axios.post('http://localhost:8000/stripe/create-checkout-session',{
        cart,
        getTotal,
        userId: 139}).then((res) => {
            window.open(res.data.url);
        }
        ).catch((err) => {
            console.error(err)
        }
        )
    }
    return(
    <>
        <button className="btn btn-primary" onClick={handleClick}>
            Pagar
        </button>

    </>)
}

export default PayButton;
