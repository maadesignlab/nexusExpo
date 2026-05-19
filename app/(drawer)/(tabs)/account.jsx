import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Importación de las 4 secciones creadas (con ruta ../../../ corregida para app/(drawer)/(tabs)/account.jsx)
import ProfileTab from "../../../components/ui/account/ProfileTab";
import PurchasesTab from "../../../components/ui/account/PurchasesTab";
import BookingsTab from "../../../components/ui/account/BookingsTab";
import PreferencesTab from "../../../components/ui/account/PreferencesTab";

export default function AccountScreen() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Perfil", icon: "person" },
    { id: "purchases", label: "Compras", icon: "receipt" },
    { id: "bookings", label: "Reservas", icon: "calendar" },
    { id: "preferences", label: "Ajustes", icon: "settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "purchases":
        return <PurchasesTab />;
      case "bookings":
        return <BookingsTab />;
      case "preferences":
        return <PreferencesTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["bottom"]}>
      {/* 
        1. Barra de Selección de Pestañas (Segmented Controls) 
        El encabezado superior ya es provisto de manera consistente por el TopBar global 
        que renderiza el menú del drawer y el carrito, manteniendo los mismos espacios.
      */}
      <View className="bg-[#131827] py-4 px-3 border-b border-slate-800 shadow-sm">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 8,
            gap: 8,
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`flex-row items-center gap-2 px-5 py-3 rounded-2xl ${
                  isActive ? "bg-amber-400" : "bg-[#1e2540]"
                }`}
                style={({ pressed }) => ({
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                })}
              >
                <Ionicons
                  name={isActive ? tab.icon : `${tab.icon}-outline`}
                  size={16}
                  color={isActive ? "#0f172a" : "#9ca3af"}
                />
                <Text
                  className={`text-xs font-InterBold ${
                    isActive ? "text-slate-950" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* 2. Contenido Dinámico de la Pestaña */}
      <View className="flex-1">
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
}
