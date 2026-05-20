import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { bookImageMap } from "../../../lib/bookImageMap";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({
  item,
  increaseQty,
  decreaseQty,
  removeFromCart,
}) {
  const precio = Number(item.precio || 0);

  const cantidad = Number(
    item.cantidad || 0
  );

  const subtotal = precio * cantidad;

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
        <Image
          source={bookImageMap[item.imagen]}
          resizeMode="cover"
          className="
            h-32 w-24
            rounded-2xl
            bg-slate-100
          "
        />

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
            ${precio.toLocaleString()}
          </Text>

          <View
            className="
              mt-5
              flex-row items-center
              justify-between
            "
          >
            <QuantitySelector
              quantity={cantidad}
              onIncrease={() =>
                increaseQty(item.bookId)
              }
              onDecrease={() =>
                decreaseQty(item.bookId)
              }
            />

            <Pressable
              onPress={() =>
                removeFromCart(item.bookId)
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
              ${subtotal.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}