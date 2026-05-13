import {
  View,
  Text,
  Pressable,
} from "react-native";

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
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
        onPress={onDecrease}
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
        {quantity}
      </Text>

      <Pressable
        onPress={onIncrease}
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
  );
}