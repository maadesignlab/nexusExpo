import { View, Text } from "react-native";

export default function DashboardStat({
  label,
  value,
}) {
  return (
    <View className="rounded-3xl border border-white/10 bg-white/10 p-4">
      <Text className="text-3xl font-bold text-white">
        {value}
      </Text>

      <Text className="mt-1 text-md font-SpaceGroteskRegular text-slate-300">
        {label}
      </Text>
    </View>
  );
}