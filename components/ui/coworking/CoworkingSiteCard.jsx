import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CoworkingSiteCard({ space, onPress }) {
    const isOccupied = space.ocupado;

    return (
        <View style={styles.cardContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.card,
                    { transform: [{ scale: pressed ? 0.97 : 1 }] }
                ]}
            >
                <View style={styles.headerRow}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{space.nombre}</Text>
                        <Text style={styles.type}>{space.tipo || 'Espacio'}</Text>
                    </View>
                    <View style={[styles.badge, isOccupied ? styles.badgeOccupied : styles.badgeAvailable]}>
                        <Text style={[styles.badgeText, isOccupied ? styles.textOccupied : styles.textAvailable]}>
                            {isOccupied ? 'Ocupado' : 'Disponible'}
                        </Text>
                    </View>
                </View>

                <View style={styles.footerRow}>
                    <View style={styles.capacityContainer}>
                        <Ionicons name="people-outline" size={16} color="#64748b" />
                        <Text style={styles.capacityText}>Capacidad: {space.capacidad}</Text>
                    </View>
                    <View style={styles.arrowIcon}>
                        <Ionicons name="chevron-forward" size={16} color="#0f172a" />
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: { marginBottom: 16 },
    card: { backgroundColor: '#fff', borderRadius: 24, padding: 20, borderColor: '#e2e8f0', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    titleContainer: { flex: 1, paddingRight: 8 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
    type: { fontSize: 14, color: '#64748b', marginTop: 4, textTransform: 'capitalize' },
    badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999 },
    badgeAvailable: { backgroundColor: '#d1fae5' },
    badgeOccupied: { backgroundColor: '#fee2e2' },
    badgeText: { fontSize: 12, fontWeight: '600' },
    textAvailable: { color: '#047857' },
    textOccupied: { color: '#b91c1c' },
    footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
    capacityContainer: { flexDirection: 'row', alignItems: 'center' },
    capacityText: { color: '#475569', fontSize: 14, marginLeft: 4 },
    arrowIcon: { height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#f1f5f9' }
});
