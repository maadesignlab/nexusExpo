import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeView from '../views/HomeView';

/**
 * Ruta /home - Pantalla de login/registro
 * Esta es la pantalla inicial antes de autenticarse
 */
export default function HomeScreen() {
    return (
        <SafeAreaView  className="flex-1 bg-[#F4F7F9]">
            <StatusBar barStyle="auto" />
            <HomeView />
        </SafeAreaView>
    );
}