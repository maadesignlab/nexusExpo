import { useEffect, useState } from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import Animated, {
  FadeIn,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import BookCard from "../../../../components/ui/library/BookCard";
import LibraryFilters from "../../../../components/ui/library/LibraryFilters";

import { storeService } from "../../../../services/storeService";

export default function LibraryScreen() {
  const searchParams = useLocalSearchParams();

  const [openFilters, setOpenFilters] =
    useState(false);

  const [books, setBooks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState(null);

  /* LOAD */

  useEffect(() => {
    loadBooks();
  }, [
    searchParams.categoria,
    searchParams.año,
    searchParams.top,
  ]);

  async function loadBooks() {
    try {
      setLoading(true);

      setError(null);

      const filters = {
        categoria: searchParams.categoria,
        año: searchParams.año,
        top: searchParams.top,
      };

      const response =
        await storeService.getLibros(filters);

      // fallback seguro
      const normalized = Array.isArray(response)
        ? response
        : response?.data || [];

      setBooks(normalized);
    } catch (err) {
      console.log(err);

      setError(
        "No fue posible cargar los libros."
      );
    } finally {
      setLoading(false);
    }
  }

  /* LOADING */

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F8FAFC]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  /* ERROR */

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F8FAFC] px-8">
        <Text className="text-center text-slate-500">
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* FILTER BUTTON */}

      <View className="px-5 pt-5">
        <Pressable
          onPress={() => setOpenFilters(true)}
          className="
            flex-row items-center justify-center gap-2
            rounded-2xl border border-slate-200
            bg-white py-3
          "
        >
          <Ionicons
            name="options-outline"
            size={18}
            color="#0F172A"
          />

          <Text className="font-semibold text-slate-950">
            Filtrar por
          </Text>
        </Pressable>
      </View>

      {/* LIST */}

      <FlatList
        data={books}
        keyExtractor={(item) =>
          item.id.toString()
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 14,
        }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 140,
          gap: 14,
        }}
        renderItem={({ item, index }) => (
          <View className="w-1/2">
            <BookCard
              libro={item}
              delay={index * 60}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center py-24">
            <Text className="text-slate-500">
              No hay libros disponibles.
            </Text>
          </View>
        )}
      />

      {/* FILTER DRAWER */}

      {openFilters && (
        <>
          {/* OVERLAY */}

          <Animated.View
            entering={FadeIn.duration(200)}
            className="
              absolute inset-0 z-40
              bg-black/40
            "
          >
            <Pressable
              className="flex-1"
              onPress={() =>
                setOpenFilters(false)
              }
            />
          </Animated.View>

          {/* DRAWER */}

          <Animated.View
            entering={SlideInRight.duration(300)}
            exiting={SlideOutRight.duration(250)}
            className="
              absolute right-0 top-0 z-50
              h-full w-[85%]
              bg-white
              px-6 pt-16
              shadow-2xl
            "
          >
            <Pressable
              onPress={() =>
                setOpenFilters(false)
              }
              className="
                absolute right-5 top-5
                h-11 w-11
                items-center justify-center
                rounded-full
                bg-slate-100
              "
            >
              <Ionicons
                name="close"
                size={22}
                color="#0F172A"
              />
            </Pressable>

            <LibraryFilters />
          </Animated.View>
        </>
      )}
    </View>
  );
}