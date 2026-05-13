import {
  View,
  Text,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";

export default function CartFooter({
  total,
}) {
  const router = useRouter();

  return (
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
            router.push("/cart/Checkout")
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
  );
}