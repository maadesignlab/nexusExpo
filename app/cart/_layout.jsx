import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function CartStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,

        headerTitleAlign: "center",

        headerShadowVisible:
          Platform.OS === "ios",

        headerStyle: {
          backgroundColor: "#131827",
        },

        headerTintColor: "white",

        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },

        headerBackTitle: "Atrás",

        animation:
          Platform.OS === "ios"
            ? "slide_from_right"
            : "fade_from_bottom",

        contentStyle: {
          backgroundColor: "#F8FAFC",
        },
      }}
    >
      <Stack.Screen
        name="Carrito"
        options={{
          title: "Carrito",
        }}
      />

      <Stack.Screen
        name="Checkout"
        options={{
          title: "Paso 1 de 2",
        }}
      />

      <Stack.Screen
        name="Pago"
        options={{
          title: "Paso 2 de 2",
        }}
      />
    </Stack>
  );
}