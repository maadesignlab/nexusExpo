import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "expo-router";
import Logo from "../../../assets/nexus.svg";

const LeftMainDrawer = (props) => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/home");
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={true}
            >
                {/* Logo */}
                <View className="flex justify-center items-center py-10 mb-5">
                    <Logo
                        style={{ width: 130, height: 60 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Items Personalizados */}
                <DrawerItem
                    label="Inicio"
                    labelStyle={{ color: '#0F172A', fontFamily: 'InterSemiBold', fontSize: 14 }}
                    icon={({ focused, color, size }) => (
                        <Ionicons name="home-outline" size={24} color="#0F172A" />
                    )}
                    onPress={() => {
                        props.navigation.closeDrawer();
                        router.push('/dashboard');
                    }}
                />
                <DrawerItem
                    label="Librería"
                    labelStyle={{ color: '#0F172A', fontFamily: 'InterSemiBold', fontSize: 14 }}
                    icon={({ focused, color, size }) => (
                        <Ionicons name="book-outline" size={24} color="#0F172A" />
                    )}
                    onPress={() => {
                        props.navigation.closeDrawer();

                        requestAnimationFrame(() => {
                            router.push("/library");
                        });

                    }}
                />
                <DrawerItem
                    label="Coworking"
                    labelStyle={{ color: '#0F172A', fontFamily: 'InterSemiBold', fontSize: 14 }}
                    icon={({ focused, color, size }) => (
                        <Ionicons name="briefcase-outline" size={24} color="#0F172A" />
                    )}
                    onPress={() => {
                        props.navigation.closeDrawer();
                        router.push('/coworking');
                    }}
                />
                <DrawerItem
                    label="Mi cuenta"
                    labelStyle={{ color: '#0F172A', fontFamily: 'InterSemiBold', fontSize: 14 }}
                    icon={({ focused, color, size }) => (
                        <Ionicons name="person-outline" size={24} color="#0F172A" />
                    )}
                    onPress={() => {
                        props.navigation.closeDrawer();
                        router.push('/account');
                    }}
                />
            </DrawerContentScrollView>

            {/* Botón de Cerrar Sesión en la parte inferior */}
            <View className="p-5 border-t border-slate-200">
                <TouchableOpacity
                    onPress={handleLogout}
                    activeOpacity={0.8}
                    className="flex-row items-center justify-center bg-red-50 py-3.5 rounded-xl border border-red-100"
                >
                    <Ionicons name="log-out-outline" size={18} color="#ef4444" className="mr-2" />
                    <Text className="text-red-600 font-InterBold text-sm">
                        Cerrar Sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LeftMainDrawer;