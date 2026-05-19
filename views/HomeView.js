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
            className="flex-1 bg-[#F4F7F9]"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Contenedor Full Screen */}
                <View className="flex-1 w-full justify-center max-w-md self-center">
                    
                    {/* Logo Central */}
                    <View className="items-center mb-10">
                        <Logo
                            style={{ width: 160, height: 70, alignSelf: 'center' }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Formularios */}
                    {showLogin ? (
                        <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
                    )}

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
