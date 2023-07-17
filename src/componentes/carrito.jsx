import { useState } from "react";
import { useId } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillCartXFill } from "react-icons/bs";
import { useCart } from "./useCart";
import PayButton from "./pago";

export function Cart() {
  const { cart, getTotal } = useCart();
  const cartCheckboxId = useId();
  const cantidad = getTotal();
  const [isOpen, setIsOpen] = useState(false);

  const handleCartToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="cart-button" htmlFor={cartCheckboxId} onClick={handleCartToggle}>
        <AiOutlineShoppingCart className="cart-icon" />
      </label>
      <input type="checkbox" id={cartCheckboxId} className="cart-checkbox hidden" />

      <aside className={`cart mt-4 bg-white rounded p-4 shadow ${isOpen ? 'open' : ''}`}>
        <ul className="cart-items space-y-4">
          {cart.map((product) => (
            <li key={product.id} className="cart-item flex items-center">
              <div className="cart-item-image-container w-16 h-16 rounded overflow-hidden">
                <img src={product.nombrefoto} alt={product.name} className="cart-item-image w-full h-full object-cover" />
              </div>
              <div className="cart-item-details ml-4">
                <h3 className="cart-item-name text-lg font-semibold">{product.Nombre}</h3>
                <p className="cart-item-quantity text-sm text-gray-500">Quantity: {product.quantity}</p>
                <p className="cart-item-price text-lg font-semibold">{product.precio}€</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total flex flex-col items-center mt-4">
          <p className="cart-total-label text-lg font-semibold">Total</p>
          <p className="cart-total-amount text-lg font-semibold">{cantidad}€</p>
          
          <PayButton />
          <small> Luego se agregaran los gastos de envio</small>
        </div>
      </aside>
    </div>
  );
}
