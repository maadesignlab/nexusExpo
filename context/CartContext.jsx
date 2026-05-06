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

    const [loading, setLoading] = useState(true);

    // Cargar carrito
    useEffect(() => {

        const loadCart = async () => {

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
        };

        loadCart();

    }, []);

    // Guardar carrito
    useEffect(() => {

        if (loading) return;

        const saveCart = async () => {

            try {

                await AsyncStorage.setItem(
                    "nexus_cart",
                    JSON.stringify(cart)
                );

            } catch (error) {

                console.log(
                    "Error saving cart:",
                    error
                );
            }
        };

        saveCart();

    }, [cart, loading]);

    const addToCart = (
        item,
        quantity = 1
    ) => {

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
    };

    const increaseQty = (bookId) => {

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
    };

    const decreaseQty = (bookId) => {

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
    };

    const removeFromCart = (bookId) => {

        setCart(prev =>
            prev.filter(
                item => item.bookId !== bookId
            )
        );
    };

    const clearCart = () => {

        setCart([]);
    };

    const value = useMemo(() => ({
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        loading,
    }), [cart, loading]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};