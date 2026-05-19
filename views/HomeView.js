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
            className="flex-1"
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
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center items-center px-4 py-8">

                    {/* Logo */}
                    <View className="mb-4 items-center">

                        <Logo
                            className="mb-4"
                            style={{
                                width: 120,
                                height: 120,
                                alignSelf: 'center',
                            }}
                        />

                        <Text className="text-4xl font-SpaceGroteskRegular text-black text-center mt-12">
                            UNIR CINEMA
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