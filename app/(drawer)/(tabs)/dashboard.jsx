import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import DashboardHero from "../../../components/ui/dashboard/DashboardHero";
import DashboardCard from "../../../components/ui/dashboard/DashboardCard";

import { dashboardCardsData } from "../../../lib/dashboardCardsData";

export default function DashboardScreen() {
  return (
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
        }}
      >
        <Animated.View entering={FadeInDown.duration(400)}>
          <Text className="mb-2 text-xs font-SpaceGroteskBold uppercase tracking-[3px] text-yellow-500">
            Panel principal
          </Text>

          <Text className="text-4xl font-bold text-slate-950">
            Bienvenido a Nexus
          </Text>

          <Text className="mt-3 leading-6 text-slate-600">
            Gestiona tu lectura, compras y espacios de coworking desde un solo lugar.
          </Text>
        </Animated.View>

        <DashboardHero />

        <View className="mt-6 gap-5">
          {dashboardCardsData.map((card, index) => (
            <DashboardCard
              key={card.title}
              delay={200 + index * 100}
              {...card}
            />
          ))}
        </View>
      </ScrollView>
 
  );
}