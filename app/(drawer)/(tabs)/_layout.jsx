import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from '../../../context/CartContext';
import TopBar from "../../../components/layout/TopBar";

const TabsLayout = () => {
    return (
        <CartProvider>
            <TopBar />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#1e2540",
                        borderTopColor: "#374151",
                        
                    },
                    tabBarActiveTintColor: "#3b82f6",
                    tabBarInactiveTintColor: "#9ca3af",
                }}
                className="border-t border-gray-700"
                >
                <Tabs.Screen
                    name="dashboard"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="library/index"
                    options={{
                        title: "Library",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="coworking"
                    options={{
                        title: "Coworking",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="briefcase" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </CartProvider>
    );
};

export default TabsLayout;