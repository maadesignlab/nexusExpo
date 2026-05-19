import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { storeService } from "../../../services/storeService";
import { bookImageMap } from "../../../lib/bookImageMap";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

// Componente individual de compra
export function HistoryItem({ compra, index }) {
  // Traducir imagen usando bookImageMap o usar fallback remoto
  const getBookImage = (imgSrc) => {
    if (imgSrc && bookImageMap[imgSrc]) {
      return bookImageMap[imgSrc];
    }
    // Si es un path local relativo pero no mapeado, limpiar o poner placeholder
    if (typeof imgSrc === "string" && imgSrc.startsWith("http")) {
      return { uri: imgSrc };
    }
    return { uri: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=150&q=80" };
  };

  // Formateo de fecha seguro
  const formatDate = (dateStr) => {
    if (!dateStr) return "Fecha no disponible";
    try {
      const date = new Date(dateStr);
      // Validar si es una fecha correcta
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Formateo de precio seguro
  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).duration(400)}
      className="flex-row bg-white rounded-2xl p-4 border border-slate-100 shadow-soft items-center mb-3"
    >
      {/* Portada del libro / producto */}
      <View className="mr-4 shadow-sm">
        <Image
          source={getBookImage(compra.imagen)}
          className="w-16 h-24 rounded-lg bg-slate-100"
          resizeMode="cover"
        />
      </View>

      {/* Información detallada de la compra */}
      <View className="flex-1 justify-center">
        {/* Fila superior: Badge y Fecha */}
        <View className="flex-row items-center justify-between mb-1.5">
          <View className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            <Text className="text-[10px] font-InterBold text-emerald-600 uppercase">
              Completado
            </Text>
          </View>
          <Text className="text-[10px] font-InterMedium text-slate-400">
            {formatDate(compra.fechaCompra)}
          </Text>
        </View>

        {/* Título de libro */}
        <Text
          numberOfLines={1}
          className="text-base font-SpaceGroteskBold text-slate-900 mb-1"
        >
          {compra.titulo || compra.title || "Artículo comprado"}
        </Text>

        {/* Nro de orden y Precio */}
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-xs font-InterRegular text-slate-400">
            Orden: #{compra.purchaseId || compra.id || "00000"}
          </Text>
          <Text className="text-sm font-InterBold text-slate-950">
            {formatPrice(compra.precioPagado || compra.precio || compra.total)}
          </Text>
        </View>

        {/* Botón de ver detalles */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-3 flex-row items-center justify-center bg-slate-50 border border-slate-200/80 py-1.5 rounded-lg"
          onPress={() => alert(`Detalle de Orden #${compra.purchaseId || compra.id}`)}
        >
          <Text className="text-xs font-InterSemiBold text-slate-700 mr-1">
            Ver detalles
          </Text>
          <Ionicons name="chevron-forward" size={12} color="#475569" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

export default function PurchasesTab({ purchases: propsPurchases }) {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState(propsPurchases || []);
  const [loading, setLoading] = useState(!propsPurchases);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no se pasaron las compras por prop, las cargamos de forma dinámica
    if (!propsPurchases && user?.id) {
      loadHistory();
    } else if (propsPurchases) {
      setPurchases(propsPurchases);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [propsPurchases, user?.id]);

  async function loadHistory() {
    try {
      setLoading(true);
      setError(null);
      const data = await storeService.getPurchases(user.id);
      setPurchases(data);
    } catch (err) {
      console.error(err);
      setError("No pudimos cargar tu historial de compras.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <ActivityIndicator size="large" color="#0f172a" />
        <Text className="mt-3 text-slate-500 font-InterMedium">
          Cargando compras...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-8 py-16">
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text className="text-slate-900 text-lg font-bold text-center mt-3">
          Error al cargar
        </Text>
        <Text className="text-slate-500 text-center mt-1 mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-slate-950 px-5 py-2.5 rounded-full"
          onPress={loadHistory}
        >
          <Text className="text-white font-semibold">Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 py-4">
      <FlatList
        data={purchases}
        keyExtractor={(item, index) => (item.purchaseId || item.id || index).toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => (
          <HistoryItem compra={item} index={index} />
        )}
        ListEmptyComponent={() => (
          <Animated.View
            entering={FadeInDown.duration(400)}
            className="items-center justify-center py-20 px-8"
          >
            <View className="w-16 h-16 bg-slate-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="receipt-outline" size={28} color="#94a3b8" />
            </View>
            <Text className="text-slate-800 text-lg font-SpaceGroteskBold text-center mb-1">
              Historial vacío
            </Text>
            <Text className="text-slate-500 text-center font-InterRegular leading-5">
              Aún no tienes compras registradas en tu cuenta de Nexus.
            </Text>
          </Animated.View>
        )}
      />
    </View>
  );
}
