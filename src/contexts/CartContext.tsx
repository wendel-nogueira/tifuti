import { createContext, useState } from "react";
import Cookies from "universal-cookie";

interface CartContextType {
    cart: any;
    addToCart: (product: any) => void;
    removeFromCart: (product: any) => void;
    clearCart: () => void;
}

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: any) => {
    const [cart, setCart] = useState([]);
    const cookies = new Cookies();

    const addToCart = (product: any) => {
        const info = {
            product: product,
            quantity: 1
        }

        const item = cart.find((item: any) => {
            return parseInt(item.product.productId) === parseInt(product.productId);
        });

        if (item) {
            item.quantity++;

            cookies.set("cart", cart, { path: "/" });
            return;
        }

        setCart([...cart, info]);

        cookies.set("cart", cart, { path: "/" });
    }

    const removeFromCart = (product: any) => {
        setCart(cart.filter((item: any) => item.id !== product.id));
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
