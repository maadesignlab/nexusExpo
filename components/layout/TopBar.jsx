import { View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Logo from '../../assets/nexus.svg';

export default function TopBar() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-[#F8FAFC]"
    >
      <View
        className="flex-row justify-between px-5 py-3 border-b border-slate-200"
      >
        {/* LOGO */}

        <Logo
            style={{
                width: 100,
                height: 30,
                alignSelf: 'center',
            }}
        />


        {/* ACTIONS */}

        <View className="flex-row items-center gap-3">

          {/* CART */}

          <Pressable
            className="
              h-11 w-11 items-center justify-center
              rounded-full border border-slate-200
              bg-white
            "
          >
            <Ionicons
              name="cart-outline"
              size={22}
              color="#0F172A"
            />
          </Pressable>

          {/* MENU */}

          <Pressable
            className="
              h-11 w-11 items-center justify-center
              rounded-full border border-slate-200
              bg-white
            "
          >
            <Ionicons
              name="person-outline"
              size={22}
              color="#0F172A"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}