import {
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Stack,
  useRouter,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useCart } from "../../context/CartContext";

import CartHeader from "../../components/ui/cart/CartHeader";
import CartEmpty from "../../components/ui/cart/CartEmpty";
import CartItem from "../../components/ui/cart/CartItem";
import CartFooter from "../../components/ui/cart/CartFooter";

export default function CartScreen() {
  const router = useRouter();

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    loading,
  } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.precio || 0) *
        Number(item.cantidad || 0),
    0
  );

  if (loading) {
    return (
      <View
        className="
          flex-1 items-center justify-center
          bg-[#F8FAFC]
        "
      >
        <Text className="text-slate-500">
          Cargando carrito...
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Carrito",

          headerLeft: () => (
            <View className="justify-center">
              <Pressable
                onPress={() => router.back()}
                className="
                  h-10 w-10
                  items-center justify-center
                "
              >
                <Ionicons
                  name="close"
                  size={24}
                  color="white"
                />
              </Pressable>
            </View>
          ),

          headerRight: () => (
            <View className="justify-center">
              <Pressable
                onPress={clearCart}
                className="
                  h-10 w-10
                  items-center justify-center
                "
              >
                <Ionicons
                  name="trash-outline"
                  size={22}
                  color="white"
                />
              </Pressable>
            </View>
          ),
        }}
      />

      <SafeAreaView
        edges={["bottom"]}
        className="flex-1 bg-[#F8FAFC]"
      >
        {!cart.length ? (
          <CartEmpty />
        ) : (
          <>
            <CartHeader />

            <FlatList
              data={cart}
              keyExtractor={(item) =>
                item.bookId.toString()
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 160,
                gap: 16,
              }}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  removeFromCart={removeFromCart}
                />
              )}
            />

            <CartFooter total={total} />
          </>
        )}
      </SafeAreaView>
    </>
  );
}