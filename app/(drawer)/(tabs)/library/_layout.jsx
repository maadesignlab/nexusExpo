import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function LibraryStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

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
        name="index"
        options={{
          title: "Librería",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalles del libro",
        }}
      />

    </Stack>
  );
}