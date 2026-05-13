import {
  View,
  Text,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";

export default function CartEmpty() {
  const router = useRouter();

  return (
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

        <Text
          className="
            text-center
            text-3xl font-bold
            text-slate-950
          "
        >
          Tu carrito está vacío
        </Text>

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
  );
}