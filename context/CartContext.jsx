import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const [loading, setLoading] =
    useState(true);

  /* LOAD CART */

  useEffect(() => {

    async function loadCart() {

      try {

        const savedCart =
          await AsyncStorage.getItem(
            "nexus_cart"
          );

        if (savedCart) {

          setCart(JSON.parse(savedCart));

        }

      } catch (error) {

        console.log(
          "Error loading cart:",
          error
        );

      } finally {

        setLoading(false);
      }
    }

    loadCart();

  }, []);

  /* SAVE CART */

  useEffect(() => {

    if (loading) return;

    AsyncStorage.setItem(
      "nexus_cart",
      JSON.stringify(cart)
    );

  }, [cart, loading]);

  /* ADD */

  function addToCart(
    item,
    quantity = 1
  ) {

    setCart(prev => {

      const exists = prev.find(
        p => p.bookId === item.bookId
      );

      if (exists) {

        return prev.map(p =>
          p.bookId === item.bookId
            ? {
                ...p,
                cantidad:
                  p.cantidad + quantity,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          cantidad: quantity,
        },
      ];
    });
  }

  /* INCREASE */

  function increaseQty(bookId) {

    setCart(prev =>
      prev.map(item =>
        item.bookId === bookId
          ? {
              ...item,
              cantidad:
                item.cantidad + 1,
            }
          : item
      )
    );
  }

  /* DECREASE */

  function decreaseQty(bookId) {

    setCart(prev =>
      prev
        .map(item =>
          item.bookId === bookId
            ? {
                ...item,
                cantidad:
                  item.cantidad - 1,
              }
            : item
        )
        .filter(
          item => item.cantidad > 0
        )
    );
  }

  /* REMOVE */

  function removeFromCart(bookId) {

    setCart(prev =>
      prev.filter(
        item => item.bookId !== bookId
      )
    );
  }

  /* CLEAR */

  function clearCart() {

    setCart([]);
  }

  const value = useMemo(() => ({
    cart,
    loading,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  }), [cart, loading]);

  /* 🚨 IMPORTANTE */

  if (loading) {
    return null;
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};