import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function PreferencesTab() {
  // Estado local para los switches de Notificaciones
  const [reminders, setReminders] = useState(true);
  const [updates, setUpdates] = useState(true);
  const [promo, setPromo] = useState(false);

  // Estado local para los switches de Privacidad
  const [publicProfile, setPublicProfile] = useState(false);
  const [showActivity, setShowActivity] = useState(true);

  // Estado local para los switches de Apariencia
  const [darkMode, setDarkMode] = useState(false);

  // Acción al guardar preferencias
  const handleSave = () => {
    Alert.alert(
      "Preferencias Guardadas",
      "Tus configuraciones de cuenta se han actualizado correctamente en este dispositivo.",
      [{ text: "Entendido", style: "default" }]
    );
  };

  // Componente helper para las filas de configuración
  const PreferenceRow = ({ icon, label, value, onValueChange, color = "text-slate-600" }) => (
    <View className="flex-row items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
      <View className="flex-row items-center gap-3">
        <View className="w-8 h-8 rounded-lg bg-slate-50 items-center justify-center border border-slate-100">
          <Ionicons name={icon} size={16} color="#475569" />
        </View>
        <Text className="text-sm font-InterMedium text-slate-800">
          {label}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e2e8f0", true: "#3b82f6" }}
        thumbColor={value ? "#ffffff" : "#f1f5f9"}
        ios_backgroundColor="#e2e8f0"
      />
    </View>
  );

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
      className="flex-1 px-4 py-4"
    >
      <Animated.View entering={FadeInDown.duration(400)}>
        
        {/* BLOQUE 1: NOTIFICACIONES */}
        <Text className="text-xs font-SpaceGroteskBold text-slate-400 uppercase tracking-widest mb-2 px-1">
          Notificaciones
        </Text>
        <View className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-soft mb-6">
          <PreferenceRow
            icon="alarm-outline"
            label="Recordatorios de préstamos"
            value={reminders}
            onValueChange={setReminders}
          />
          <PreferenceRow
            icon="cube-outline"
            label="Actualizaciones de pedidos"
            value={updates}
            onValueChange={setUpdates}
          />
          <PreferenceRow
            icon="gift-outline"
            label="Ofertas y promociones"
            value={promo}
            onValueChange={setPromo}
          />
        </View>

        {/* BLOQUE 2: PRIVACIDAD */}
        <Text className="text-xs font-SpaceGroteskBold text-slate-400 uppercase tracking-widest mb-2 px-1">
          Privacidad
        </Text>
        <View className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-soft mb-6">
          <PreferenceRow
            icon="lock-closed-outline"
            label="Perfil público"
            value={publicProfile}
            onValueChange={setPublicProfile}
          />
          <PreferenceRow
            icon="eye-outline"
            label="Mostrar actividad reciente"
            value={showActivity}
            onValueChange={setShowActivity}
          />
        </View>

        {/* BLOQUE 3: APARIENCIA */}
        <Text className="text-xs font-SpaceGroteskBold text-slate-400 uppercase tracking-widest mb-2 px-1">
          Apariencia
        </Text>
        <View className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-soft mb-6">
          <PreferenceRow
            icon="moon-outline"
            label="Modo oscuro"
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        {/* BOTÓN PRINCIPAL */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSave}
          className="bg-slate-950 py-4 rounded-2xl items-center justify-center shadow-md flex-row"
        >
          <Ionicons name="checkmark-circle-outline" size={18} color="white" className="mr-2" />
          <Text className="text-white font-InterBold text-sm tracking-wide">
            Guardar Preferencias
          </Text>
        </TouchableOpacity>
        
      </Animated.View>
    </ScrollView>
  );
}
