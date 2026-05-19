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
                'Debes ingresar tu correo electrónico y contraseña.'
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
                    'Error al iniciar sesión',
                    result.error
                );
            }

        } catch (error) {
            Alert.alert(
                'Error',
                'Ocurrió un problema inesperado. Inténtalo nuevamente.'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="w-full px-8">

            {/* EMAIL */}
            <View className="mb-5">
                <Text
                    className="
                        mb-2
                        text-sm
                        text-slate-700
                    "
                    style={{
                        fontFamily: 'InterSemiBold',
                    }}
                >
                    Correo electrónico
                </Text>

                <TextInput
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-4
                        text-base
                        text-slate-950
                    "
                    style={{
                        fontFamily: 'InterRegular',
                    }}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />
            </View>

            {/* PASSWORD */}
            <View className="mb-7">
                <Text
                    className="
                        mb-2
                        text-sm
                        text-slate-700
                    "
                    style={{
                        fontFamily: 'InterSemiBold',
                    }}
                >
                    Contraseña
                </Text>

                <TextInput
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-4
                        text-base
                        text-slate-950
                    "
                    style={{
                        fontFamily: 'InterRegular',
                    }}
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
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
                    rounded-2xl
                    py-4
                    ${loading
                        ? 'bg-slate-400'
                        : 'bg-slate-950 active:bg-slate-800'
                    }
                `}
            >
                <Text
                    className="
                        text-center
                        text-base
                        text-white
                    "
                    style={{
                        fontFamily: 'InterBold',
                    }}
                >
                    {loading
                        ? 'Ingresando...'
                        : 'Entrar'
                    }
                </Text>
            </Pressable>

            {/* REGISTER */}
            <View className="mt-6 flex-row justify-center">
                <Text
                    className="text-base text-slate-400"
                    style={{
                        fontFamily: 'InterRegular',
                    }}
                >
                    ¿No tienes cuenta?
                </Text>

                <Pressable
                    onPress={onSwitchToRegister}
                    disabled={loading}
                >
                    <Text
                        className="
                            text-base
                            text-slate-950
                        "
                        style={{
                            fontFamily: 'InterBold',
                        }}
                    >
                        {' '}Regístrate
                    </Text>
                </Pressable>
            </View>

        </View>
    );
}