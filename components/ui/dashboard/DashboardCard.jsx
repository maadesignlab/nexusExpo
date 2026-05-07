import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

export default function DashboardCard({
  icon,
  title,
  description,
  action,
  href,
  delay,
}) {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(500)}
    >
      <Pressable
        onPress={() => router.push(href)}
        className="rounded-[32px] border border-slate-200 bg-white p-6"
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <View>
          <View className="mb-5 h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100">
            <Text className="text-2xl">
              {icon}
            </Text>
          </View>

          <Text className="text-2xl font-bold text-slate-950">
            {title}
          </Text>

          <Text className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </Text>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-slate-950">
            {action}
          </Text>

          <View className="h-10 w-10 items-center justify-center rounded-full bg-slate-950">
            <Text className="text-white">
              →
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}