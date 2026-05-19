import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import { useEffect, useState } from 'react';

import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';

import Logo from '../assets/nexus.svg';

export default function HomeView() {
    const [showLogin, setShowLogin] = useState(true);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPreloader(false);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    if (showPreloader) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Image
                    source={require('../assets/preload.gif')}
                    className="h-[180px] w-[180px]"
                    resizeMode="contain"
                />

                <Text
                    className="mt-4 text-base text-slate-500"
                    style={{
                        fontFamily: 'InterRegular',
                    }}
                >
                    Cargando Nexus...
                </Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : 'height'
            }
            keyboardVerticalOffset={
                Platform.OS === 'ios'
                    ? 0
                    : 20
            }
        >
            <ScrollView
                className="bg-white"
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center bg-white px-4 py-8">

                    {/* Logo */}
                    <View className="mb-8 items-center">
                        <Logo
                            style={{
                                width: 150,
                                height: 150,
                                alignSelf: 'center',
                            }}
                        />

                        <Text
                            className="mt-5 text-center text-base leading-6 text-slate-500"
                            style={{
                                fontFamily: 'InterRegular',
                            }}
                        >
                            Librería, compras y coworking
                        </Text>
                    </View>

                    {/* Texto intro */}
                    <View className="mb-4 w-full px-8">
                        <Text
                            className="text-left text-base leading-6 text-slate-500"
                            style={{
                                fontFamily: 'InterRegular',
                            }}
                        >
                            Ingresa tus datos:
                        </Text>
                    </View>

                    {/* Formularios */}
                    {showLogin ? (
                        <LoginForm
                            onSwitchToRegister={() =>
                                setShowLogin(false)
                            }
                        />
                    ) : (
                        <RegisterForm
                            onSwitchToLogin={() =>
                                setShowLogin(true)
                            }
                        />
                    )}

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}