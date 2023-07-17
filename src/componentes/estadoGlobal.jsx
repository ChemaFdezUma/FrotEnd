import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}){
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

    const getCantidad = product => {
        const productIndex = cart.findIndex(p => p.id === product.id)
        return cart[productIndex].quantity
    }

    const checkProduct = product => {
       return cart.some(p => p.id === product.id)
    }

    const removeProduct = product => {
        setCart(prevFilter => prevFilter.filter(p => p.id !== product.id))
    }

    const addToCart = product =>{
        const productIndex = cart.findIndex(p => p.id === product.id)

        if(productIndex >=0){
            const newCart = [...cart]
            newCart[productIndex].quantity += 1
            return setCart(newCart)
        }
        setCart(prevState => [...prevState, {...product, quantity: 1}])
    }

    const quitarUnoCantidad = product =>{
        const productIndex = cart.findIndex(p => p.id === product.id)
        const newCart = [...cart]
        newCart[productIndex].quantity -= 1
        if(newCart[productIndex].quantity === 0){
            newCart.splice(productIndex,1)
        }
        return setCart(newCart)
    }

    const getTotal = () => {
        let total = 0
        cart.forEach(p => {
            total += p.precio * p.quantity
        })
        return total.toFixed(2) // Redondear el total a 2 decimales
    }

    const clearCart = () =>{
        setCart([])
    }

    return(
        <CartContext.Provider value={{cart, addToCart, clearCart,checkProduct,removeProduct,getCantidad,quitarUnoCantidad,getTotal}}>
            {children}
        </CartContext.Provider>
    )
}
