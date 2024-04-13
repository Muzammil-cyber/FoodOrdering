import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  setCartItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  setCartItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const setCartItem = (product: Product, size: CartItem["size"]) => {
    // Check if the item is already in the cart
    const itemIndex = items.findIndex(
      (item) => item.product_id === product.id && item.size === size
    );
    if (itemIndex !== -1) {
      return updateQuantity(items[itemIndex].id, 1);
    }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (id: CartItem["id"], quantity: number) => {
    // Update the quantity of the item in the cart and should remove item if quantity is 0
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + quantity };
      }
      return item;
    });
    setItems(updatedItems.filter((item) => item.quantity > 0));
  };

  return (
    <CartContext.Provider value={{ items, setCartItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
