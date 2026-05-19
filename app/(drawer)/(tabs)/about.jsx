import {
  View,
  Text,
  ScrollView,
} from "react-native";

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <View className="px-5 pt-6">

          {/* HEADER */}
          <View className="rounded-[32px] bg-white px-6 py-8">
            <Text
              className="text-center text-[30px] leading-9 text-slate-950"
              style={{
                fontFamily: "SpaceGroteskBold",
              }}
            >
              Acerca de Nexus
            </Text>

            <Text
              className="mt-3 text-center text-base leading-6 text-slate-500"
              style={{
                fontFamily: "InterRegular",
              }}
            >
              Librería, compras y coworking en una sola experiencia.
            </Text>
          </View>

          {/* DESCRIPCIÓN */}
          <View className="mt-6 rounded-[28px] bg-white p-5">
            <Text
              className="mb-3 text-lg text-slate-950"
              style={{
                fontFamily: "InterBold",
              }}
            >
              ¿Qué es Nexus?
            </Text>

            <Text
              className="text-base leading-7 text-slate-500"
              style={{
                fontFamily: "InterRegular",
              }}
            >
              Nexus es una aplicación académica diseñada para centralizar la
              consulta de libros, la gestión de compras y el acceso a espacios
              de coworking desde un entorno simple, moderno y fácil de usar.
            </Text>
          </View>

          {/* SERVICIOS */}
          <View className="mt-6 rounded-[28px] bg-white p-5">
            <Text
              className="mb-4 text-lg text-slate-950"
              style={{
                fontFamily: "InterBold",
              }}
            >
              Servicios principales
            </Text>

            <FeatureItem
              title="Librería"
              description="Consulta libros disponibles, revisa detalles y precios."
            />

            <FeatureItem
              title="Compras"
              description="Agrega productos al carrito y gestiona tus selecciones."
            />

            <FeatureItem
              title="Coworking"
              description="Explora espacios pensados para estudiar, trabajar y colaborar."
            />
          </View>

          {/* VERSIÓN */}
          <View className="mt-6 items-center">
            <Text
              className="text-sm text-slate-400"
              style={{
                fontFamily: "InterRegular",
              }}
            >
              Versión 1.0.0
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

function FeatureItem({
  title,
  description,
}) {
  return (
    <View className="mb-5 flex-row">
      <View className="mt-1 h-3 w-3 rounded-full bg-yellow-300" />

      <View className="ml-4 flex-1">
        <Text
          className="text-base text-slate-950"
          style={{
            fontFamily: "InterBold",
          }}
        >
          {title}
        </Text>

        <Text
          className="mt-1 text-sm leading-6 text-slate-500"
          style={{
            fontFamily: "InterRegular",
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}