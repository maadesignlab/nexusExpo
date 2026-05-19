import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ProfileTab() {
  const { user } = useAuth();
  
  // Datos del usuario con valores por defecto por si no hay sesión activa
  const nombreCompleto = user ? `${user.nombre} ${user.apellido || ""}`.trim() : "Usuario Invitado";
  const correo = user ? user.correo : "invitado@nexus.com";
  const rol = "Miembro Premium"; // Rol visual destacado

  return (
    <Animated.View 
      entering={FadeInDown.duration(400)} 
      className="flex-1 px-4 py-6"
    >
      {/* Tarjeta de Perfil Principal */}
      <View className="items-center bg-white rounded-3xl p-6 border border-slate-100 shadow-soft mb-6">
        <View className="relative mb-4">
          {/* Avatar con borde circular y sombra */}
          <Image
            source={require('../../../assets/img/usuario.png')}
            className="w-28 h-28 rounded-full border-4 border-slate-100"
          />
          <View className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white" />
        </View>
        
        <Text className="text-2xl font-SpaceGroteskBold text-slate-900 mb-1">
          {nombreCompleto}
        </Text>
        
        <Text className="text-sm font-InterRegular text-slate-500 mb-3">
          {correo}
        </Text>
        
        {/* Badge de Rol */}
        <View className="bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
          <Text className="text-xs font-InterBold text-amber-700 uppercase tracking-wider">
            {rol}
          </Text>
        </View>
      </View>

      {/* Tarjetas de Resumen (Grid de 2 columnas o Row con Wrap) */}
      <View className="flex-row flex-wrap justify-between gap-4">
        {/* Tarjeta 1 */}
        <View className="flex-1 min-w-[45%] bg-slate-50 rounded-2xl p-5 border border-slate-200/60 shadow-sm">
          <View className="bg-blue-50 w-10 h-10 rounded-xl items-center justify-center mb-3">
            <Text className="text-lg">📚</Text>
          </View>
          <Text className="text-sm font-InterBold text-slate-800 mb-1">
            Libro en préstamo
          </Text>
          <Text className="text-xs font-InterRegular text-slate-500 leading-4">
            Próximamente disponible
          </Text>
        </View>

        {/* Tarjeta 2 */}
        <View className="flex-1 min-w-[45%] bg-slate-50 rounded-2xl p-5 border border-slate-200/60 shadow-sm">
          <View className="bg-emerald-50 w-10 h-10 rounded-xl items-center justify-center mb-3">
            <Text className="text-lg">🏢</Text>
          </View>
          <Text className="text-sm font-InterBold text-slate-800 mb-1">
            Próximo coworking
          </Text>
          <Text className="text-xs font-InterRegular text-slate-500 leading-4">
            Sistema de reservas en desarrollo
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
