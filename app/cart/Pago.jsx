// app/shop/payment.jsx

import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import { useMemo, useState } from "react";

import { useRouter, router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import { useCart } from "../../context/CartContext";

export default function PaymentScreen() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

  const [cardName, setCardName] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] = useState("");

  const total = useMemo(() => {
    const subtotal = cart.reduce(
      (acc, item) =>
        acc +
        Number(item.precio || 0) *
          Number(item.cantidad || 0),
      0
    );

    const shipping = 12000;

    const taxes = Math.round(
      subtotal * 0.19
    );

    return subtotal + shipping + taxes;
  }, [cart]);

  function handlePayment() {
    clearCart();

    router.dismissAll();

    setTimeout(() => {
      router.replace("/(drawer)/(tabs)/dashboard");
    }, 0);
  }

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
            Último paso
          </Text>

          <Text
            className="
              text-4xl font-bold
              text-slate-950
            "
          >
            Pago
          </Text>

          <Text
            className="
              mt-3
              text-sm leading-6
              text-slate-600
            "
          >
            Completa los datos de tu tarjeta
            para finalizar la compra.
          </Text>
        </View>

        {/* PAYMENT CARD */}

        <View className="px-5">
          <Animated.View
            entering={FadeInDown.duration(400)}
            className="
              overflow-hidden
              rounded-[32px]
              bg-slate-950
              p-6
            "
          >
            {/* CHIP */}

            <View
              className="
                h-12 w-16
                rounded-xl
                bg-yellow-300
              "
            />

            {/* NUMBER */}

            <Text
              className="
                mt-8
                text-2xl font-bold
                tracking-[3px]
                text-white
              "
            >
              {cardNumber || "•••• •••• •••• ••••"}
            </Text>

            {/* FOOTER */}

            <View
              className="
                mt-8
                flex-row items-end justify-between
              "
            >
              <View>
                <Text
                  className="
                    text-[10px]
                    uppercase tracking-[2px]
                    text-slate-400
                  "
                >
                  Titular
                </Text>

                <Text
                  className="
                    mt-1
                    text-base font-semibold
                    text-white
                  "
                >
                  {cardName || "NOMBRE"}
                </Text>
              </View>

              <View>
                <Text
                  className="
                    text-[10px]
                    uppercase tracking-[2px]
                    text-slate-400
                  "
                >
                  Expira
                </Text>

                <Text
                  className="
                    mt-1
                    text-base font-semibold
                    text-white
                  "
                >
                  {expiry || "MM/YY"}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* FORM */}

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
              Datos de pago
            </Text>

            <View className="mt-5 gap-4">
              {/* NAME */}

              <TextInput
                value={cardName}
                onChangeText={setCardName}
                placeholder="Nombre del titular"
                placeholderTextColor="#94A3B8"
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-4
                "
              />

              {/* NUMBER */}

              <TextInput
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="Número de tarjeta"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                maxLength={19}
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-4
                "
              />

              {/* ROW */}

              <View className="flex-row gap-4">
                {/* EXPIRY */}

                <TextInput
                  value={expiry}
                  onChangeText={setExpiry}
                  placeholder="MM/YY"
                  placeholderTextColor="#94A3B8"
                  className="
                    flex-1
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-4
                  "
                />

                {/* CVV */}

                <TextInput
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="CVV"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  secureTextEntry
                  maxLength={4}
                  className="
                    flex-1
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-4
                  "
                />
              </View>
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
              Resumen del pago
            </Text>

            <View className="mt-5 gap-4">
              {cart.map((item) => (
                <View
                  key={item.bookId}
                  className="
                    flex-row items-center
                    justify-between
                  "
                >
                  <Text
                    numberOfLines={1}
                    className="
                      flex-1 pr-4
                      text-slate-600
                    "
                  >
                    {item.titulo} ×{" "}
                    {item.cantidad}
                  </Text>

                  <Text className="font-semibold">
                    $
                    {(
                      item.precio *
                      item.cantidad
                    ).toLocaleString()}
                  </Text>
                </View>
              ))}

              {/* TOTAL */}

              <View
                className="
                  mt-3
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
          px-5 py-5
        "
      >
        <Pressable
          onPress={handlePayment}
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
            Pagar ahora
          </Text>
        </Pressable>
      </View>
    </View>
  );
}