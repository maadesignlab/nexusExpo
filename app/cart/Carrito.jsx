// app/cart/Carrito.jsx

import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Stack,
  useRouter,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useCart } from "../../context/CartContext";

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

  /* LOADING */

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

  const total = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.precio || 0) *
        Number(item.cantidad || 0),
    0
  );

  return (
    <>
      {/* NATIVE HEADER */}

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
        <View className="flex-1 bg-[#F8FAFC]">
          {!cart.length ? (
            /* EMPTY STATE */

            <View
              className="
                flex-1 items-center justify-center
                px-5 pb-20
              "
            >
              <View
                className="
                  w-full max-w-md
                  rounded-[32px]
                  border border-slate-200
                  bg-white
                  p-8
                "
              >
                {/* ICON */}

                <View
                  className="
                    mx-auto mb-5
                    h-16 w-16
                    items-center justify-center
                    rounded-3xl
                    bg-yellow-100
                  "
                >
                  <Text className="text-3xl">
                    🛒
                  </Text>
                </View>

                {/* TITLE */}

                <Text
                  className="
                    text-center
                    text-3xl font-bold
                    text-slate-950
                  "
                >
                  Tu carrito está vacío
                </Text>

                {/* TEXT */}

                <Text
                  className="
                    mt-4 text-center
                    text-sm leading-6
                    text-slate-600
                  "
                >
                  Explora la librería y añade tus
                  libros favoritos para continuar.
                </Text>

                {/* BUTTON */}

                <Pressable
                  onPress={() =>
                    router.push("/library/library")
                  }
                  className="
                    mt-7
                    items-center justify-center
                    rounded-2xl
                    bg-slate-950
                    py-4
                  "
                >
                  <Text className="font-bold text-white">
                    Explorar librería
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <>
              {/* HEADER */}

              <View className="px-5 pb-5 pt-5">
                <Text
                  className="
                    mb-2
                    text-xs font-semibold
                    uppercase tracking-[3px]
                    text-yellow-500
                  "
                >
                  Resumen de compra
                </Text>

                <View
                  className="
                    flex-row items-end justify-between
                  "
                >
                  <View className="flex-1 pr-4">
                    <Text
                      className="
                        text-4xl font-bold
                        text-slate-950
                      "
                    >
                      Carrito
                    </Text>

                    <Text
                      className="
                        mt-2
                        text-sm leading-6
                        text-slate-600
                      "
                    >
                      Revisa los productos seleccionados
                      antes de finalizar tu compra.
                    </Text>
                  </View>

                  <Pressable
                    onPress={() =>
                      router.push(
                        "/library/library"
                      )
                    }
                  >
                    <Text
                      className="
                        text-sm font-semibold
                        text-slate-600
                      "
                    >
                      Seguir comprando
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* LIST */}

              <FlatList
                data={cart}
                extraData={cart}
                keyExtractor={(item) =>
                  item.bookId.toString()
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  paddingBottom: 160,
                  gap: 16,
                }}
                renderItem={({ item }) => {
                  const precio = Number(
                    item.precio || 0
                  );

                  const cantidad = Number(
                    item.cantidad || 0
                  );

                  const subtotal =
                    precio * cantidad;

                  return (
                    <View
                      className="
                        rounded-[28px]
                        border border-slate-200
                        bg-white
                        p-4
                      "
                    >
                      <View className="flex-row gap-4">
                        {/* IMAGE */}

                        <Image
                          source={{
                            uri: item.imagen,
                          }}
                          resizeMode="cover"
                          className="
                            h-32 w-24
                            rounded-2xl
                            bg-slate-100
                          "
                        />

                        {/* INFO */}

                        <View className="flex-1">
                          <Text
                            className="
                              text-xs
                              text-slate-500
                            "
                          >
                            Libro
                          </Text>

                          <Text
                            numberOfLines={2}
                            className="
                              mt-1
                              text-lg font-bold
                              text-slate-950
                            "
                          >
                            {item.titulo}
                          </Text>

                          <Text
                            numberOfLines={1}
                            className="
                              mt-1
                              text-sm
                              text-slate-600
                            "
                          >
                            {item.autor}
                          </Text>

                          <Text
                            className="
                              mt-3
                              text-lg font-bold
                              text-slate-950
                            "
                          >
                            $
                            {precio.toLocaleString()}
                          </Text>

                          {/* CONTROLS */}

                          <View
                            className="
                              mt-5
                              flex-row items-center
                              justify-between
                            "
                          >
                            {/* QTY */}

                            <View
                              className="
                                flex-row items-center
                                rounded-2xl
                                border border-slate-200
                                bg-slate-50
                                p-1
                              "
                            >
                              <Pressable
                                onPress={() =>
                                  decreaseQty(
                                    item.bookId
                                  )
                                }
                                className="
                                  h-10 w-10
                                  items-center justify-center
                                  rounded-xl
                                "
                              >
                                <Text
                                  className="
                                    text-xl font-bold
                                    text-slate-700
                                  "
                                >
                                  −
                                </Text>
                              </Pressable>

                              <Text
                                className="
                                  min-w-[40px]
                                  text-center
                                  text-sm font-bold
                                  text-slate-950
                                "
                              >
                                {cantidad}
                              </Text>

                              <Pressable
                                onPress={() =>
                                  increaseQty(
                                    item.bookId
                                  )
                                }
                                className="
                                  h-10 w-10
                                  items-center justify-center
                                  rounded-xl
                                "
                              >
                                <Text
                                  className="
                                    text-xl font-bold
                                    text-slate-700
                                  "
                                >
                                  +
                                </Text>
                              </Pressable>
                            </View>

                            {/* DELETE */}

                            <Pressable
                              onPress={() =>
                                removeFromCart(
                                  item.bookId
                                )
                              }
                              className="
                                h-10 w-10
                                items-center justify-center
                                rounded-full
                                border border-red-100
                                bg-red-50
                              "
                            >
                              <Ionicons
                                name="trash-outline"
                                size={18}
                                color="#EF4444"
                              />
                            </Pressable>
                          </View>

                          {/* SUBTOTAL */}

                          <View className="mt-5">
                            <Text
                              className="
                                text-[11px]
                                font-bold uppercase
                                tracking-[2px]
                                text-slate-400
                              "
                            >
                              Subtotal
                            </Text>

                            <Text
                              className="
                                mt-1
                                text-2xl font-bold
                                text-slate-950
                              "
                            >
                              $
                              {subtotal.toLocaleString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />

              {/* FOOTER */}

              <View
                className="
                  absolute bottom-0 left-0 right-0
                  border-t border-slate-200
                  bg-white
                  px-5 py-5
                "
              >
                <View
                  className="
                    flex-row items-center justify-between
                  "
                >
                  <View>
                    <Text
                      className="
                        text-xs font-semibold
                        uppercase tracking-[2px]
                        text-slate-500
                      "
                    >
                      Total
                    </Text>

                    <Text
                      className="
                        mt-1
                        text-3xl font-extrabold
                        text-slate-950
                      "
                    >
                      ${total.toLocaleString()}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() =>
                      router.push(
                        "/cart/Checkout"
                      )
                    }
                    className="
                      rounded-2xl
                      bg-yellow-300
                      px-7 py-4
                    "
                  >
                    <Text
                      className="
                        font-bold
                        text-slate-950
                      "
                    >
                      Finalizar compra
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}