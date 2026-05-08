import {
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

export default function LibraryFilters() {
  const router = useRouter();

  const searchParams = useLocalSearchParams();

  const filtros = {
    categoria: searchParams.categoria || "",
    año: searchParams.año || "",
    top: searchParams.top || "",
  };

  const categorias = [
    "Drama",
    "Ficción",
    "Clásico",
    "Economía",
    "Arte y Cultura",
    "Estilo de vida",
  ];

  const años = [
    "2002",
    "2006",
    "2023",
    "2024",
  ];

  function updateFilter(key, value) {
    const nextParams = {
      ...searchParams,
    };

    if (nextParams[key] === value) {
      delete nextParams[key];
    } else {
      nextParams[key] = value;
    }

    if (key !== "top") {
      delete nextParams.top;
    }

    router.push({
      pathname: "/library",
      params: nextParams,
    });
  }

  function clearFilters() {
    router.push("/library");
  }

  return (
    <View className="flex-1">
      {/* HEADER */}

      <View className="border-b border-slate-200 pb-6">
        <Text className="text-2xl font-extrabold text-slate-950">
          Filtros
        </Text>
      </View>

      {/* CONTENT */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 40,
        }}
      >
        {/* TOP */}

        <FilterSection title="Destacados">
          <FilterButton
            label="🔥 Top 10 más vendidos"
            active={filtros.top === "top10"}
            onPress={() =>
              updateFilter("top", "top10")
            }
          />
        </FilterSection>

        {/* CATEGORY */}

        <FilterSection title="Categoría">
          {categorias.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              active={filtros.categoria === cat}
              onPress={() =>
                updateFilter("categoria", cat)
              }
            />
          ))}
        </FilterSection>

        {/* YEAR */}

        <FilterSection title="Año">
          {años.map((año) => (
            <FilterButton
              key={año}
              label={año}
              active={filtros.año === año}
              onPress={() =>
                updateFilter("año", año)
              }
            />
          ))}
        </FilterSection>

        {/* CLEAR */}

        <View className="border-t border-slate-200 pt-5">
          <Pressable onPress={clearFilters}>
            <Text
              className="
                text-center text-sm
                font-semibold text-blue-600
              "
            >
              Limpiar filtros
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

/* SECTION */

function FilterSection({
  title,
  children,
}) {
  return (
    <View className="mb-8">
      <Text
        className="
          mb-4 text-[11px]
          font-bold uppercase
          tracking-[2px]
          text-slate-400
        "
      >
        {title}
      </Text>

      <View className="gap-2">
        {children}
      </View>
    </View>
  );
}

/* BUTTON */

function FilterButton({
  label,
  active,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`
        rounded-2xl border px-4 py-3
        ${
          active
            ? "border-blue-300 bg-blue-100"
            : "border-slate-200 bg-white"
        }
      `}
    >
      <Text
        className={`
          text-sm
          ${
            active
              ? "font-semibold text-slate-950"
              : "text-slate-700"
          }
        `}
      >
        {label}
      </Text>
    </Pressable>
  );
}