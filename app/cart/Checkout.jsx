// app/shop/checkout.jsx

import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import { useMemo, useState } from "react";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { useCart } from "../../context/CartContext";

export default function CheckoutScreen() {
  const router = useRouter();

  const { cart } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc +
        Number(item.precio || 0) *
          Number(item.cantidad || 0),
      0
    );
  }, [cart]);

  const shipping = 12000;

  const taxes = Math.round(subtotal * 0.19);

  const total =
    subtotal + shipping + taxes;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >
        {/* HEADER */}

        <View className="px-5 pb-6 pt-6">
          <View
            className="
              mb-5
              flex-row items-center justify-between
            "
          >
          </View>

          {/* TITLE */}

          <Text
            className="
              mb-2
              text-xs font-semibold
              uppercase tracking-[3px]
              text-yellow-500
            "
          >
            Finalizar compra
          </Text>

          <Text
            className="
              text-4xl font-bold
              text-slate-950
            "
          >
            Checkout
          </Text>

          <Text
            className="
              mt-3
              text-sm leading-6
              text-slate-600
            "
          >
            Completa tus datos de envío y
            método de pago.
          </Text>
        </View>

        {/* SHIPPING */}

        <View className="px-5">
          <View
            className="
              rounded-[28px]
              border border-slate-200
              bg-white
              p-5
            "
          >
            <Text
              className="
                text-lg font-bold
                text-slate-950
              "
            >
              Información de envío
            </Text>

            {/* INPUTS */}

            <View className="mt-5 gap-4">
              <TextInput
                placeholder="Nombre completo"
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-4
                "
              />

              <TextInput
                placeholder="Correo electrónico"
                keyboardType="email-address"
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-4
                "
              />

              <TextInput
                placeholder="Dirección"
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-4
                "
              />

              <TextInput
                placeholder="Ciudad"
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-4
                "
              />
            </View>
          </View>
        </View>

        {/* PAYMENT */}

        <View className="mt-5 px-5">
          <View
            className="
              rounded-[28px]
              border border-slate-200
              bg-white
              p-5
            "
          >
            <Text
              className="
                text-lg font-bold
                text-slate-950
              "
            >
              Método de pago
            </Text>

            <View className="mt-5 gap-3">
              {/* CARD */}

              <Pressable
                onPress={() =>
                  setPaymentMethod("card")
                }
                className={`
                  rounded-2xl border p-4
                  ${
                    paymentMethod === "card"
                      ? "border-slate-950 bg-slate-100"
                      : "border-slate-200 bg-white"
                  }
                `}
              >
                <Text
                  className="
                    font-semibold
                    text-slate-950
                  "
                >
                  💳 Tarjeta crédito/débito
                </Text>
              </Pressable>

              {/* PSE */}

              <Pressable
                onPress={() =>
                  setPaymentMethod("pse")
                }
                className={`
                  rounded-2xl border p-4
                  ${
                    paymentMethod === "pse"
                      ? "border-slate-950 bg-slate-100"
                      : "border-slate-200 bg-white"
                  }
                `}
              >
                <Text
                  className="
                    font-semibold
                    text-slate-950
                  "
                >
                  🏦 PSE
                </Text>
              </Pressable>

              {/* CASH */}

              <Pressable
                onPress={() =>
                  setPaymentMethod("cash")
                }
                className={`
                  rounded-2xl border p-4
                  ${
                    paymentMethod === "cash"
                      ? "border-slate-950 bg-slate-100"
                      : "border-slate-200 bg-white"
                  }
                `}
              >
                <Text
                  className="
                    font-semibold
                    text-slate-950
                  "
                >
                  💵 Contra entrega
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* SUMMARY */}

        <View className="mt-5 px-5">
          <View
            className="
              rounded-[28px]
              border border-slate-200
              bg-white
              p-5
            "
          >
            <Text
              className="
                text-lg font-bold
                text-slate-950
              "
            >
              Resumen
            </Text>

            <View className="mt-5 gap-4">
              {/* SUBTOTAL */}

              <View
                className="
                  flex-row items-center
                  justify-between
                "
              >
                <Text className="text-slate-600">
                  Subtotal
                </Text>

                <Text className="font-semibold">
                  $
                  {subtotal.toLocaleString()}
                </Text>
              </View>

              {/* SHIPPING */}

              <View
                className="
                  flex-row items-center
                  justify-between
                "
              >
                <Text className="text-slate-600">
                  Envío
                </Text>

                <Text className="font-semibold">
                  $
                  {shipping.toLocaleString()}
                </Text>
              </View>

              {/* TAXES */}

              <View
                className="
                  flex-row items-center
                  justify-between
                "
              >
                <Text className="text-slate-600">
                  IVA
                </Text>

                <Text className="font-semibold">
                  $
                  {taxes.toLocaleString()}
                </Text>
              </View>

              {/* TOTAL */}

              <View
                className="
                  mt-2
                  border-t border-slate-200
                  pt-4
                  flex-row items-center
                  justify-between
                "
              >
                <Text
                  className="
                    text-lg font-bold
                    text-slate-950
                  "
                >
                  Total
                </Text>

                <Text
                  className="
                    text-2xl font-extrabold
                    text-slate-950
                  "
                >
                  $
                  {total.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}

      <View
        className="
          absolute bottom-0 left-0 right-0
          border-t border-slate-200
          bg-white
          px-5 py-5 pb-10
        "
      >
        <Pressable
          onPress={() =>
            router.push("/cart/Pago")
          }
          className="
            items-center justify-center
            rounded-2xl
            bg-yellow-300
            py-5
          "
        >
          <Text
            className="
              text-base font-bold
              text-slate-950
            "
          >
            Continuar al pago
          </Text>
        </Pressable>
      </View>
    </View>
  );
}