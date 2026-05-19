import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import TopBar from "../../../components/layout/TopBar";

const TabsLayout = () => {
    return (
        <>
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
                    name="library/library"
                    options={{
                        title: "Library",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="coworking/coworking"
                    options={{
                        title: "Coworking",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="briefcase" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="account"
                    options={{
                        title: "Cuenta",
                        href: null,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;