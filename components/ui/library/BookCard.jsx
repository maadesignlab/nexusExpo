import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";

import { useRouter } from "expo-router";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { useCart } from "../../../context/CartContext";

export default function BookCard({
  libro,
  delay = 0,
}) {
  const router = useRouter();

  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({
      ...libro,
      bookId: libro.id,
    });
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(350)}
      className="
        overflow-hidden rounded-[28px]
        border border-slate-200
        bg-white p-4
      "
    >
      {/* BADGE */}

      {libro.masVendido && (
        <View
          className="
            absolute left-3 top-3 z-10
            rounded-full
            bg-yellow-300
            px-3 py-1
          "
        >
          <Text className="text-[10px] font-bold text-slate-950">
            Más vendido
          </Text>
        </View>
      )}

      {/* IMAGE */}

      <Pressable
        onPress={() =>
          router.push(`/library/${libro.id}`)
        }
        className="
          mb-4 h-[220px]
          overflow-hidden rounded-2xl
          bg-slate-100
        "
      >
        <Image
          source={{
            uri: libro.imagen,
          }}
          resizeMode="cover"
          className="h-full w-full"
        />
      </Pressable>

      {/* CONTENT */}

      <View className="flex-1">
        <Text
          numberOfLines={2}
          className="
            min-h-[42px]
            text-sm font-semibold
            leading-5 text-slate-950
          "
        >
          {libro.titulo}
        </Text>

        <Text
          numberOfLines={1}
          className="mt-1 text-xs text-slate-600"
        >
          {libro.autor}
        </Text>

        <Text
          numberOfLines={1}
          className="
            mt-1 text-[11px]
            font-medium text-blue-700
          "
        >
          {libro.categoria}
        </Text>

        <Text className="mt-4 text-lg font-bold text-slate-950">
          ${libro.precio?.toLocaleString()}
        </Text>

        {/* ACTIONS */}

        <View className="mt-5 gap-2">
          <Pressable
            onPress={() =>
              router.push(`/library/${libro.id}`)
            }
            className="
              items-center justify-center
              rounded-2xl bg-slate-950 py-3
            "
          >
            <Text className="text-xs font-bold text-white">
              Ver detalle
            </Text>
          </Pressable>

          <Pressable
            onPress={handleAddToCart}
            className="
              flex-row items-center justify-center gap-2
              rounded-2xl border border-slate-200
              bg-white py-3
            "
          >
            <Ionicons
              name="cart-outline"
              size={16}
              color="#0F172A"
            />

            <Text className="text-xs font-bold text-slate-950">
              Añadir al carrito
            </Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}