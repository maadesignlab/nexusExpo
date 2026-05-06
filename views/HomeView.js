import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import { useState } from 'react';

import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';

import Logo from '../assets/nexus.svg';

export default function HomeView() {

    const [showLogin, setShowLogin] = useState(true);

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

                        <Text className="text-4xl font-bold text-black text-center mt-12">
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
