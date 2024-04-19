import { CartItem, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  setCartItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  setCartItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItem } = useInsertOrderItems();
  const router = useRouter();
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

  // Calculate the total price of the items in the cart
  const total = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const checkout = () => {
    if (items.length === 0) {
      return;
    }
    insertOrder(
      { total },
      {
        onSuccess: (order) => saveOrderItems(order),
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
    }));

    insertOrderItem(orderItems, {
      onSuccess: () => {
        setItems([]);
        router.push("/(user)/order");
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, setCartItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
