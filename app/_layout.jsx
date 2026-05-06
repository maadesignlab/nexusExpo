import "../global.css";
import React, { useEffect } from "react";
import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import Providers from "../context/Providers";

// Evita ocultar el splash antes de cargar fuentes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    // Carga de fuentes
    const [fontsLoaded, error] = useFonts({
        "Inter-Variable": require(
            "../assets/fonts/Inter-VariableFont_opsz,wght.ttf"
        ),

        "Inter-VariableItalic": require(
            "../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf"
        ),
    });

    // Ocultar splash cuando todo esté listo
    useEffect(() => {
        if (error) {
            throw error;
        }
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    // Esperar fuentes
    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <Providers>
            <Slot />
        </Providers>
    );
}