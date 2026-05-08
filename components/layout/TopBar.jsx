import {
  View,
  Pressable,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { DrawerActions } from "@react-navigation/native";

import {
  useNavigation,
  useRouter,
} from "expo-router";

import Logo from "../../assets/nexus.svg";

import { useCart } from "../../context/CartContext";

export default function TopBar() {
  const navigation = useNavigation();

  const router = useRouter();

  const { cart } = useCart();

  /* TOTAL ITEMS */

  const totalItems = cart.reduce(
    (acc, item) =>
      acc + Number(item.cantidad || 0),
    0
  );

  console.log("TOPBAR CART:", cart);
  console.log("TOPBAR TOTAL ITEMS:", totalItems);

  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-[#F8FAFC]"
    >
      <View
        className="
          flex-row items-center justify-between
          border-b border-slate-200
          px-5 py-3
        "
      >
        {/* DRAWER BUTTON */}

        <Pressable
          onPress={() =>
            navigation.dispatch(
              DrawerActions.openDrawer()
            )
          }
          className="
            h-11 w-11
            items-center justify-center
            rounded-full
            border border-slate-200
            bg-white
          "
        >
          <Ionicons
            name="menu-outline"
            size={22}
            color="#0F172A"
          />
        </Pressable>

        {/* LOGO */}

        <Logo
          style={{
            width: 100,
            height: 30,
          }}
        />

        {/* CART */}

        <Pressable
          onPress={() =>
            router.navigate("/cart/Carrito")
          }
          className="
            relative
            h-11 w-11
            items-center justify-center
            rounded-full
            border border-slate-200
            bg-white
          "
        >
          <Ionicons
            name="cart-outline"
            size={22}
            color="#0F172A"
          />

          {/* BADGE */}

          {totalItems > 0 && (
            <View
              className="
                absolute -right-1 -top-1
                min-h-[20px]
                min-w-[20px]
                items-center justify-center
                rounded-full
                bg-yellow-300
                px-1
              "
            >
              <Text
                className="
                  text-[10px]
                  font-bold
                  text-slate-950
                "
              >
                {totalItems}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
      
    </SafeAreaView>
  );
}