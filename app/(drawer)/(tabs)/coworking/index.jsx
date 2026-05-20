import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn, SlideInRight, SlideOutRight } from "react-native-reanimated";

import { useCoworking } from '../../../../context/CoworkingContext';
import CoworkingSiteCard from '../../../../components/ui/coworking/CoworkingSiteCard';
import CoworkingModal from '../../../../components/ui/coworking/CoworkingModal';
import BookingFlowModal from '../../../../components/ui/coworking/BookingFlowModal';

export default function CoworkingScreen() {
    const { coworking, disponibles, ocupados, loading, error } = useCoworking();

    const [selectedSpace, setSelectedSpace] = useState(null);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [bookingVisible, setBookingVisible] = useState(false);
    
    // Filtros
    const [estadoFiltro, setEstadoFiltro] = useState('todos');
    const [openFilters, setOpenFilters] = useState(false);

    const espaciosFiltrados = useMemo(() => {
        if (estadoFiltro === "disponible") return coworking.filter(s => !s.ocupado);
        if (estadoFiltro === "ocupado") return coworking.filter(s => s.ocupado);
        return coworking;
    }, [coworking, estadoFiltro]);

    // Agrupamos por ubicación para el SectionList
    const espaciosAgrupados = useMemo(() => {
        const grupos = {};
        espaciosFiltrados.forEach(space => {
            const ubicacion = space.ubicacion || 'Otros Espacios';
            if (!grupos[ubicacion]) {
                grupos[ubicacion] = [];
            }
            grupos[ubicacion].push(space);
        });

        // Convertimos a array estructurado para SectionList
        return Object.keys(grupos).sort().map(key => ({
            title: key,
            data: grupos[key]
        }));
    }, [espaciosFiltrados]);

    const handleOpenDetails = (space) => {
        setSelectedSpace(space);
        setDetailsVisible(true);
    };

    const handleOpenBooking = () => {
        setDetailsVisible(false);
        setTimeout(() => setBookingVisible(true), 300);
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-[#F8FAFC] justify-center items-center px-6">
                <ActivityIndicator size="large" color="#0f172a" />
                <Text className="mt-4 text-slate-500 font-InterMedium">Cargando espacios...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-[#F8FAFC] justify-center items-center px-6">
                <Ionicons name="warning" size={48} color="#ef4444" />
                <Text className="mt-4 text-slate-900 text-lg font-bold text-center">Error al cargar</Text>
                <Text className="mt-2 text-slate-500 text-center">{error}</Text>
            </SafeAreaView>
        );
    }

    // Cabecera principal + Botón de Filtros
    const renderHeader = () => (
        <View className="mb-6">
            <View className="mb-6">
                <Text className="text-[12px] font-InterSemiBold text-slate-400 uppercase tracking-[2px] mb-2">
                    Estudios & Espacios
                </Text>
                <Text className="text-3xl font-SpaceGroteskBold text-slate-900 mb-2">
                    Coworking
                </Text>
                <Text className="text-slate-600 font-InterRegular leading-6">
                    Reserva tu espacio de trabajo ideal gratis.
                </Text>
            </View>

            {/* Estadísticas */}
            <View className="flex-row justify-between gap-2.5 mb-8">
                <View className="flex-1 rounded-[24px] border border-slate-200 bg-white p-4 items-center shadow-sm">
                    <Text className="text-2xl font-SpaceGroteskBold text-slate-950">{coworking.length}</Text>
                    <Text className="text-[10px] font-InterSemiBold text-slate-400 mt-1 uppercase tracking-wider">Total</Text>
                </View>
                <View className="flex-1 rounded-[24px] border border-emerald-100 bg-emerald-50/50 p-4 items-center">
                    <Text className="text-2xl font-SpaceGroteskBold text-emerald-700">{disponibles}</Text>
                    <Text className="text-[10px] font-InterSemiBold text-emerald-600 mt-1 uppercase tracking-wider">Libres</Text>
                </View>
                <View className="flex-1 rounded-[24px] border border-red-100 bg-red-50/50 p-4 items-center">
                    <Text className="text-2xl font-SpaceGroteskBold text-red-700">{ocupados}</Text>
                    <Text className="text-[10px] font-InterSemiBold text-red-500 mt-1 uppercase tracking-wider">Ocupados</Text>
                </View>
            </View>

            {/* FILTROS HORIZONTALES (DISEÑO ANTERIOR) */}
            <View className="flex-row bg-slate-200 p-1 rounded-xl mb-4">
                {[
                    { key: "todos", label: "Todos" },
                    { key: "disponible", label: "Disponibles" },
                    { key: "ocupado", label: "Ocupados" },
                ].map((item) => {
                    const isActive = estadoFiltro === item.key;
                    return (
                        <Pressable
                            key={item.key}
                            onPress={() => setEstadoFiltro(item.key)}
                            className={
                                isActive
                                    ? "flex-1 py-2.5 items-center rounded-lg bg-white shadow-sm"
                                    : "flex-1 py-2.5 items-center rounded-lg"
                            }
                        >
                            <Text
                                className={
                                    isActive
                                        ? "text-xs font-InterBold text-slate-900"
                                        : "text-xs font-InterSemiBold text-slate-500"
                                }
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#F8FAFC]">
            <View className="flex-1 px-5">
                <SectionList
                    sections={espaciosAgrupados}
                    keyExtractor={(item) => (item.id ? item.id.toString() : item.nombre)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListHeaderComponent={renderHeader}
                    renderSectionHeader={({ section: { title } }) => (
                        <View className="mb-4 mt-2">
                            <Text className="text-lg font-SpaceGroteskBold text-slate-900">{title}</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <CoworkingSiteCard 
                            space={item} 
                            delay={index * 60}
                            onPress={() => handleOpenDetails(item)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <View className="items-center py-24">
                            <Ionicons name="search" size={48} color="#cbd5e1" />
                            <Text className="text-slate-500 font-InterMedium mt-4">
                                No hay espacios para este filtro.
                            </Text>
                        </View>
                    )}
                />
            </View>

            <CoworkingModal 
                visible={detailsVisible}
                space={selectedSpace}
                onClose={() => setDetailsVisible(false)}
                onBookPress={handleOpenBooking}
            />

            <BookingFlowModal
                visible={bookingVisible}
                space={selectedSpace}
                onClose={() => setBookingVisible(false)}
            />
        </SafeAreaView>
    );
}