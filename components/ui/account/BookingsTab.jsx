import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function BookingsTab() {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      className="flex-1 px-6 py-12 items-center justify-center"
    >
      {/* Icono de calendario decorado con fondo y sombras */}
      <View className="relative mb-6">
        <View className="w-24 h-24 bg-yellow-50 rounded-full items-center justify-center border border-yellow-100 shadow-sm">
          <Ionicons name="calendar-outline" size={48} color="#d97706" />
        </View>
        <View className="absolute -bottom-1 -right-1 bg-slate-900 px-2.5 py-1 rounded-full border-2 border-white shadow-soft">
          <Text className="text-[10px] font-InterBold text-white uppercase tracking-wider">
            Próximamente
          </Text>
        </View>
      </View>

      {/* Textos descriptivos */}
      <Text className="text-2xl font-SpaceGroteskBold text-slate-900 text-center mb-3">
        Historial de Reservas
      </Text>
      
      <Text className="text-sm font-InterRegular text-slate-500 text-center leading-6 max-w-xs">
        Aquí podrás ver todas tus reservas de espacios de coworking, salones privados y salas de juntas. Esta funcionalidad estará disponible próximamente.
      </Text>

      {/* Indicador de progreso decorativo */}
      <View className="mt-8 flex-row gap-1">
        <View className="w-8 h-1.5 rounded-full bg-yellow-500" />
        <View className="w-2 h-1.5 rounded-full bg-slate-200" />
        <View className="w-2 h-1.5 rounded-full bg-slate-200" />
      </View>
    </Animated.View>
  );
}
