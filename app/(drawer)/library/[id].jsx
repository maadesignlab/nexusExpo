import { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { storeService } from "../../../services/storeService";
import { bookImageMap } from "../../../lib/bookImageMap";
import { useCart } from "../../../context/CartContext";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBook();
  }, [id]);

  async function loadBook() {
    try {
      setLoading(true);
      setError(null);

      const response = await storeService.getLibros();

      const books = Array.isArray(response)
        ? response
        : response?.data || [];

      const selectedBook = books.find(
        (item) =>
          item.id?.toString() === id?.toString()
      );

      if (!selectedBook) {
        setError("Libro no encontrado.");
        return;
      }

      setBook(selectedBook);
    } catch (err) {
      console.log(err);
      setError("No fue posible cargar el detalle del libro.");
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    if (!book) return;

    addToCart({
      ...book,
      bookId: book.id,
    });
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F8FAFC]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !book) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F8FAFC] px-8">
        <Text
          className="text-center text-base text-slate-500"
          style={{
            fontFamily: "InterRegular",
          }}
        >
          {error || "Libro no encontrado."}
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="mt-6 rounded-2xl bg-slate-950 px-6 py-3"
        >
          <Text
            className="text-white"
            style={{
              fontFamily: "InterBold",
            }}
          >
            Volver
          </Text>
        </Pressable>
      </View>
    );
  }

  const imageSource = bookImageMap[book.imagen];

  const sinopsis =
    book.sinopsis ||
    book.descripcion ||
    book.description ||
    "Sin sinopsis disponible por el momento.";

  return (
    <ScrollView
      className="flex-1 bg-[#F8FAFC]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 140,
      }}
    >
      <View className="px-5 pt-5">

        {/* BACK */}
        <Pressable
          onPress={() => router.back()}
          className="
            mb-5 h-11 w-11
            items-center justify-center
            rounded-full border border-slate-200
            bg-white
          "
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#0F172A"
          />
        </Pressable>

        {/* IMAGE */}
        <View
          className="
            overflow-hidden rounded-[32px]
            border border-slate-200
            bg-white p-4
          "
        >
          <View
            className="
              h-[420px]
              overflow-hidden rounded-[24px]
              bg-slate-100
            "
          >
            {imageSource ? (
              <Image
                source={imageSource}
                resizeMode="cover"
                className="h-full w-full"
              />
            ) : (
              <View className="h-full w-full items-center justify-center px-6">
                <Text
                  className="text-center text-sm text-slate-400"
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                  Imagen no disponible
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* CONTENT */}
        <View className="mt-7">
          {book.masVendido && (
            <View className="mb-4 self-start rounded-full bg-yellow-300 px-4 py-2">
              <Text
                className="text-xs text-slate-950"
                style={{
                  fontFamily: "InterBold",
                }}
              >
                Más vendido
              </Text>
            </View>
          )}

          <Text
            className="text-[30px] leading-9 text-slate-950"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            {book.titulo}
          </Text>

          <Text
            className="mt-3 text-base text-slate-600"
            style={{
              fontFamily: "InterRegular",
            }}
          >
            {book.autor}
          </Text>

          <Text
            className="mt-2 text-sm text-blue-700"
            style={{
              fontFamily: "InterSemiBold",
            }}
          >
            {book.categoria}
          </Text>

          <Text
            className="mt-6 text-[30px] text-slate-950"
            style={{
              fontFamily: "InterBold",
            }}
          >
            ${book.precio?.toLocaleString()}
          </Text>

          {/* SINOPSIS */}
          <View className="mt-7 rounded-[28px] bg-white p-5">
            <Text
              className="mb-3 text-base text-slate-950"
              style={{
                fontFamily: "InterBold",
              }}
            >
              Sinopsis
            </Text>

            <Text
              className="text-base leading-7 text-slate-500"
              style={{
                fontFamily: "InterRegular",
              }}
            >
              {sinopsis}
            </Text>
          </View>

          {/* ACTION */}
          <Pressable
            onPress={handleAddToCart}
            className="
              mt-7 flex-row items-center justify-center gap-2
              rounded-2xl bg-slate-950 py-4
            "
          >
            <Ionicons
              name="cart-outline"
              size={20}
              color="#FFFFFF"
            />

            <Text
              className="text-base text-white"
              style={{
                fontFamily: "InterBold",
              }}
            >
              Añadir al carrito
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}