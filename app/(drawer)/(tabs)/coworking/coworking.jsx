import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useCoworking } from '../../../../context/CoworkingContext';
import CoworkingSiteCard from '../../../../components/ui/coworking/CoworkingSiteCard';
import CoworkingModal from '../../../../components/ui/coworking/CoworkingModal';
import BookingFlowModal from '../../../../components/ui/coworking/BookingFlowModal';

export default function CoworkingScreen() {
    const { coworking, disponibles, ocupados, loading, error } = useCoworking();

    const [selectedSpace, setSelectedSpace] = useState(null);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [bookingVisible, setBookingVisible] = useState(false);
    const [estadoFiltro, setEstadoFiltro] = useState('todos');

    const espaciosFiltrados = useMemo(() => {
        if (estadoFiltro === "disponible") return coworking.filter(s => !s.ocupado);
        if (estadoFiltro === "ocupado") return coworking.filter(s => s.ocupado);
        return coworking;
    }, [coworking, estadoFiltro]);

    const espaciosPorUbicacion = useMemo(() => {
        return espaciosFiltrados.reduce((acc, space) => {
            const ubi = space.ubicacion || 'General';
            if (!acc[ubi]) acc[ubi] = [];
            acc[ubi].push(space);
            return acc;
        }, {});
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
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0f172a" />
                <Text style={styles.loadingText}>Cargando espacios...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Ionicons name="warning" size={48} color="#ef4444" />
                <Text style={styles.errorTitle}>Error al cargar</Text>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Coworking</Text>
                    <Text style={styles.headerSubtitle}>Reserva tu espacio de trabajo ideal</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={[styles.statCard, styles.statCardTotal]}>
                        <Text style={[styles.statValue, styles.statValueTotal]}>{coworking.length}</Text>
                        <Text style={[styles.statLabel, styles.statLabelTotal]}>Total</Text>
                    </View>
                    <View style={[styles.statCard, styles.statCardAvailable]}>
                        <Text style={[styles.statValue, styles.statValueAvailable]}>{disponibles}</Text>
                        <Text style={[styles.statLabel, styles.statLabelAvailable]}>Libres</Text>
                    </View>
                    <View style={[styles.statCard, styles.statCardOccupied]}>
                        <Text style={[styles.statValue, styles.statValueOccupied]}>{ocupados}</Text>
                        <Text style={[styles.statLabel, styles.statLabelOccupied]}>Ocupados</Text>
                    </View>
                </View>

                <View style={styles.filtersContainer}>
                    {['todos', 'disponible', 'ocupado'].map((filtro) => {
                        const isActive = estadoFiltro === filtro;
                        const labels = { todos: 'Todos', disponible: 'Disponibles', ocupado: 'Ocupados' };
                        return (
                            <Pressable
                                key={filtro}
                                onPress={() => setEstadoFiltro(filtro)}
                                style={[styles.filterButton, isActive && styles.filterButtonActive]}
                            >
                                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                                    {labels[filtro]}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {Object.keys(espaciosPorUbicacion).length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search" size={48} color="#cbd5e1" />
                        <Text style={styles.emptyText}>No hay espacios para este filtro</Text>
                    </View>
                ) : (
                    Object.entries(espaciosPorUbicacion).map(([ubicacion, espacios]) => (
                        <View key={ubicacion} style={styles.groupContainer}>
                            <Text style={styles.groupTitle}>{ubicacion}</Text>
                            {espacios.map((space) => (
                                <CoworkingSiteCard 
                                    key={space.id || space.nombre}
                                    space={space} 
                                    onPress={() => handleOpenDetails(space)}
                                />
                            ))}
                        </View>
                    ))
                )}
            </ScrollView>

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

const styles = StyleSheet.create({
    centerContainer: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
    loadingText: { marginTop: 16, color: '#64748b', fontWeight: '500' },
    errorTitle: { marginTop: 16, color: '#1e293b', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    errorText: { marginTop: 8, color: '#64748b', textAlign: 'center' },
    safeArea: { flex: 1, backgroundColor: '#f8fafc' },
    scrollContent: { padding: 20, paddingBottom: 100 },
    header: { marginBottom: 24 },
    headerTitle: { fontSize: 30, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
    headerSubtitle: { color: '#64748b', fontSize: 16 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    statCard: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, marginHorizontal: 4 },
    statCardTotal: { backgroundColor: '#fff', borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    statCardAvailable: { backgroundColor: '#ecfdf5', borderColor: '#d1fae5' },
    statCardOccupied: { backgroundColor: '#fef2f2', borderColor: '#fee2e2' },
    statValue: { fontSize: 28, fontWeight: 'bold' },
    statValueTotal: { color: '#1e293b' },
    statValueAvailable: { color: '#059669' },
    statValueOccupied: { color: '#dc2626' },
    statLabel: { fontSize: 10, fontWeight: '600', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
    statLabelTotal: { color: '#64748b' },
    statLabelAvailable: { color: '#059669' },
    statLabelOccupied: { color: '#dc2626' },
    filtersContainer: { flexDirection: 'row', marginBottom: 24, backgroundColor: '#e2e8f0', padding: 4, borderRadius: 12 },
    filterButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
    filterButtonActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 1 },
    filterText: { fontWeight: '600', textTransform: 'capitalize', color: '#64748b' },
    filterTextActive: { color: '#0f172a' },
    emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
    emptyText: { color: '#64748b', marginTop: 16, fontWeight: '500' },
    groupContainer: { marginBottom: 24 },
    groupTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 16, marginLeft: 4 }
});