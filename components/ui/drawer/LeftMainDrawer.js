import React from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "expo-router";

const LeftMainDrawer = (props) => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/home");
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={true}
            >
                {/* Logo de la Escuela */}
                <View className="flex justify-center items-center mx-3 p-10 mb-10 h-[150px] bg-unirLogoBg rounded-md">
                    <View className="flex-1 w-full h-fit items-center self-center absolute">
                        <Image
                            source={require('../../../assets/unirLogo.png')}
                            style={{
                                width: 150,
                                height: 100,
                                backgroundColor: '#0096c3',
                            }}
                        />
                    </View>
                </View>

                {/* Renderizar items automáticos (Inicio y Sobre nosotros) */}
                <DrawerItemList {...props} />

                {/* Item Personalizado: Mi Cuenta */}
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