import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';

import { useState } from 'react';

import * as Haptics from 'expo-haptics';

import { useRouter } from 'expo-router';

import { useAuth } from '../../context/AuthContext';

export default function LoginForm({
    onSwitchToRegister,
}) {

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const router = useRouter();

    const { login } = useAuth();

    const handleLogin = async () => {

        if (!email || !password) {

            Alert.alert(
                'Campos requeridos',
                'Debes ingresar email y contraseña'
            );

            return;
        }

        try {

            setLoading(true);

            await Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Medium
            );

            const result = await login(
                email,
                password
            );

            if (result.success) {

                router.replace(
                    '/(drawer)/(tabs)/dashboard'
                );

            } else {

                Alert.alert(
                    'Error',
                    result.error
                );
            }

        } catch (error) {

            Alert.alert(
                'Error',
                'Ocurrió un problema inesperado'
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <View className="w-full">
            <Text className="text-[22px] font-SpaceGroteskBold text-[#1A202C] mb-8 text-center">
                Iniciar sesión
            </Text>

            {/* EMAIL */}
            <View className="mb-4">
                <Text className="text-[#2D3748] text-sm mb-1.5 font-InterMedium">
                    Correo electrónico
                </Text>
                <TextInput
                    className="bg-white border border-[#E2E8F0] rounded-lg px-4 py-3.5 text-slate-900 font-InterRegular"
                    placeholder="Usuario"
                    placeholderTextColor="#A0AEC0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoFocus={true}
                    editable={!loading}
                />
            </View>

            {/* PASSWORD */}
            <View className="mb-6">
                <Text className="text-[#2D3748] text-sm mb-1.5 font-InterMedium">
                    Contraseña
                </Text>
                <TextInput
                    className="bg-white border border-[#E2E8F0] rounded-lg px-4 py-3.5 text-slate-900 font-InterRegular"
                    placeholder="Contraseña"
                    placeholderTextColor="#A0AEC0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    editable={!loading}
                />
            </View>

            {/* CAJA DE CREDENCIALES (GRIS) */}
            <View className="bg-slate-100 border border-slate-200 rounded-xl p-4 mb-8">
                <Text className="text-[#4A5568] text-sm mb-2 font-InterMedium">
                    Credenciales de acceso:
                </Text>
                <Text className="text-[#1A202C] text-sm mb-1 font-InterMedium">
                    <Text className="font-InterBold">Usuario: </Text>
                    miguel@gmail.com
                </Text>
                <Text className="text-[#1A202C] text-sm font-InterMedium">
                    <Text className="font-InterBold">Contraseña: </Text>
                    12345678
                </Text>
            </View>

            {/* BOTÓN ENTRAR */}
            <Pressable
                onPress={handleLogin}
                disabled={loading}
                className={
                    loading
                        ? "bg-slate-400 py-4 rounded-2xl items-center mb-4"
                        : "bg-[#111111] active:bg-black py-4 rounded-2xl items-center mb-4"
                }
            >
                <Text className="text-white text-center font-InterBold text-[16px]">
                    {loading ? 'Ingresando...' : 'Entrar'}
                </Text>
            </Pressable>

            {/* REGISTER (Opcional, centrado debajo) */}
            <View className="flex-row justify-center mt-2">
                <Text className="text-slate-500 font-InterRegular">
                    ¿No tienes cuenta?
                </Text>
                <Pressable onPress={onSwitchToRegister} disabled={loading}>
                    <Text className="text-[#111111] font-InterBold ml-1">
                        Regístrate
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}