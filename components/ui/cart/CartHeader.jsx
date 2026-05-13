import {
  View,
  Text,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";

export default function CartHeader() {
  const router = useRouter();

  return (
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
            router.push("/library/library")
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
  );
}