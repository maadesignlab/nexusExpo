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
        "InterRegular": require(
            "../assets/fonts/Inter_18pt-Regular.ttf"
        ),
        "InterMedium": require(
            "../assets/fonts/Inter_18pt-Medium.ttf"
        ),
        "InterSemiBold": require(
            "../assets/fonts/Inter_18pt-SemiBold.ttf"
        ),
        "InterBold": require(
            "../assets/fonts/Inter_18pt-Bold.ttf"
        ),
        "SpaceGroteskRegular": require(
            "../assets/fonts/SpaceGrotesk-Regular.ttf"
        ),
        "SpaceGroteskMedium": require(
            "../assets/fonts/SpaceGrotesk-Medium.ttf"
        ),
        "SpaceGroteskSemiBold": require(
            "../assets/fonts/SpaceGrotesk-SemiBold.ttf"
        ),
        "SpaceGroteskBold": require(
            "../assets/fonts/SpaceGrotesk-Bold.ttf"
        )   
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