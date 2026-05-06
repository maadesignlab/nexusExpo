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
                    '/(drawer)/(tabs)/(stack)/landing'
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
        <View className="w-full px-8">

            <Text className="text-2xl font-bold text-white mb-6 text-center">
                Iniciar Sesión
            </Text>

            {/* EMAIL */}
            <View className="mb-4">

                <Text className="text-white mb-2">
                    Email
                </Text>

                <TextInput
                    className="bg-white rounded-lg px-4 py-4 text-gray-900"
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

            </View>

            {/* PASSWORD */}
            <View className="mb-6">

                <Text className="text-white mb-2">
                    Contraseña
                </Text>

                <TextInput
                    className="bg-white rounded-lg px-4 py-4 text-gray-900"
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    editable={!loading}
                />

            </View>

            {/* BOTÓN */}
            <Pressable
                onPress={handleLogin}
                disabled={loading}
                className={`
                    py-4
                    rounded-lg
                    mb-4
                    ${loading
                        ? 'bg-gray-400'
                        : 'bg-blue-500 active:bg-blue-600'
                    }
                `}
            >

                <Text className="text-white text-center font-bold text-lg">

                    {loading
                        ? 'Ingresando...'
                        : 'Entrar'
                    }

                </Text>

            </Pressable>

            {/* REGISTER */}
            <View className="flex-row justify-center mt-4">

                <Text className="text-gray-300">
                    ¿No tienes cuenta?
                </Text>

                <Pressable
                    onPress={onSwitchToRegister}
                    disabled={loading}
                >

                    <Text className="text-blue-500 font-bold">
                        {' '}Regístrate
                    </Text>

                </Pressable>

            </View>

        </View>
    );
}