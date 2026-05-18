import React from 'react';
import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CoworkingModal({ visible, space, onClose, onBookPress }) {
    if (!space) return null;

    const isOccupied = space.ocupado;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/50">
                <Pressable className="flex-1" onPress={onClose} />
                
                <View className="bg-white rounded-t-3xl pt-6 px-6 pb-10 max-h-[80%]">
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-2xl font-bold text-slate-900 flex-1">
                            {space.nombre}
                        </Text>
                        <Pressable onPress={onClose} className="h-10 w-10 bg-slate-100 rounded-full items-center justify-center">
                            <Ionicons name="close" size={24} color="#0f172a" />
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text className="text-base text-slate-600 mb-6">
                            Este es un espacio de tipo {space.tipo} con una capacidad de {space.capacidad} personas.
                        </Text>

                        {/* Próximos horarios (Simulados) */}
                        <Text className="text-lg font-semibold text-slate-900 mb-3">
                            Próximos horarios disponibles
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                            {['12:00h', '13:00h', '15:00h', '17:00h'].map((time) => (
                                <View key={time} className="mr-3 px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl">
                                    <Text className="text-slate-700 font-medium">{time}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        
                        {/* Status Alert */}
                        {isOccupied && (
                            <View className="bg-red-50 p-4 rounded-2xl mb-6 border border-red-100">
                                <View className="flex-row items-center mb-1">
                                    <Ionicons name="alert-circle" size={20} color="#b91c1c" />
                                    <Text className="ml-2 font-semibold text-red-800">Espacio Ocupado</Text>
                                </View>
                                <Text className="text-red-600 text-sm">
                                    Este espacio se encuentra actualmente en uso. Por favor, selecciona otro espacio disponible.
                                </Text>
                            </View>
                        )}
                    </ScrollView>

                    {/* Book Button */}
                    <View className="pt-4 border-t border-slate-100">
                        <Pressable
                            onPress={onBookPress}
                            disabled={isOccupied}
                            className={`w-full py-4 rounded-2xl items-center justify-center ${
                                isOccupied ? 'bg-slate-300' : 'bg-slate-900'
                            }`}
                        >
                            <Text className={`text-lg font-bold ${isOccupied ? 'text-slate-500' : 'text-white'}`}>
                                {isOccupied ? 'No disponible' : 'Reservar ahora'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
