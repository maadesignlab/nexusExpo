import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from "react-native-reanimated";

export default function CoworkingSiteCard({ space, onPress, delay = 0 }) {
    const isOccupied = space.ocupado;

    return (
        <Animated.View entering={FadeInDown.delay(delay).duration(400)}>
            <Pressable
                onPress={onPress}
                className="mb-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm active:scale-[0.98] transition-transform"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 pr-2">
                        <Text className="text-xl font-SpaceGroteskBold text-slate-900" numberOfLines={1}>
                            {space.nombre}
                        </Text>
                        <Text className="text-sm font-InterMedium text-slate-500 mt-1 capitalize">
                            {space.tipo || 'Espacio'}
                        </Text>
                    </View>
                    
                    <View className={isOccupied ? "rounded-full px-3 py-1 bg-red-50 border border-red-200" : "rounded-full px-3 py-1 bg-emerald-50 border border-emerald-200"}>
                        <Text className={isOccupied ? "text-xs font-InterBold text-red-600" : "text-xs font-InterBold text-emerald-600"}>
                            {isOccupied ? 'Ocupado' : 'Disponible'}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center">
                        <Ionicons name="people-outline" size={16} color="#64748b" />
                        <Text className="text-sm font-InterRegular text-slate-500 ml-1">
                            Capacidad: {space.capacidad} {space.capacidad === 1 ? 'persona' : 'personas'}
                        </Text>
                    </View>
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <Ionicons name="chevron-forward" size={16} color="#0f172a" />
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
}
