import { View, Text } from "react-native";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import DashboardStat from "./DashboardStat";

export default function DashboardHero() {
  const totalLibros = 1240;
  const espaciosDisponibles = 18;

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(500)}
      className="mt-8 overflow-hidden rounded-[32px] bg-slate-950 p-7"
    >
      <View className="flex flex-col justify-between gap-8">
        <View>
          <View className="self-start rounded-full bg-yellow-300 px-4 py-2">
            <Text className="text-xs font-bold text-slate-950">
              Nexus Universitario
            </Text>
          </View>

          <Text className="mt-5 text-3xl font-bold leading-tight text-white">
            Todo tu ecosistema académico en un solo panel
          </Text>

          <Text className="mt-4 leading-6 text-slate-300">
            Accede rápidamente a la librería, consulta espacios disponibles
            y gestiona tus compras o reservas desde esta vista.
          </Text>
        </View>

        <View className="gap-3">
          <DashboardStat
            label="Libros disponibles"
            value={totalLibros}
          />

          <DashboardStat
            label="Espacios libres"
            value={espaciosDisponibles}
          />

          <DashboardStat
            label="Año fiscal"
            value="2026"
          />
        </View>
      </View>
    </Animated.View>
  );
}