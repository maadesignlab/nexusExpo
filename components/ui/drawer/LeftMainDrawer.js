import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";

const LeftMainDrawer = (props) => {
  const { navigation } = props;

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Inicio",
      path: "/dashboard",
      enabled: true,
    },
    {
      label: "Librería",
      path: "/library/library",
      enabled: true,
    },
    {
      label: "Coworking",
      path: "",
      enabled: false,
    },
    {
      label: "Mi cuenta",
      path: "",
      enabled: false,
    },
    {
    label: "Acerca de",
    path: "/about",
    enabled: true,
  },
  ];

  const handleNavigate = (item) => {
    if (!item.enabled) return;

    router.push(item.path);
    navigation.closeDrawer();
  };

  const handleLogout = () => {
    navigation.closeDrawer();
    router.replace("/");
  };

  const isItemActive = (item) => {
    if (item.label === "Inicio") {
      return pathname === "/dashboard";
    }

    if (item.label === "Librería") {
      return pathname.includes("/library");
    }

    return false;
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View className="flex-1 justify-between">
        <View>
          {/* LOGO */}
          <View className="items-center justify-center pt-12 pb-10">
            <Image
              source={require("../../../assets/nexus.png")}
              resizeMode="contain"
              className="h-[58px] w-[130px]"
            />
          </View>

          {/* MENU */}
          <View className="px-14">
            {menuItems.map((item) => {
              const isActive = isItemActive(item);

              return (
                <Pressable
                  key={item.label}
                  onPress={() => handleNavigate(item)}
                  className="mb-8"
                >
                  <Text
                    className={`
                      text-[22px] leading-7
                      ${
                        isActive
                          ? "text-slate-950"
                          : "text-[#46616A]"
                      }
                    `}
                    style={{
                      fontFamily: isActive
                        ? "InterBold"
                        : "InterMedium",
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* SALIR */}
        <View className="px-14 pb-12">
          <Pressable onPress={handleLogout}>
            <Text
              className="text-[22px] leading-7"
              style={{
                fontFamily: "InterBold",
              }}
            >
              Salir
            </Text>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default LeftMainDrawer;