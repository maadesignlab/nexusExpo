import { apiClient } from "./apiClient";

export const apiEndpoints = {

  // USER
  getUserByEmail: (email) =>
    apiClient(`/users?correo=${email}`),

  // LIBROS
  getProductos: () =>
    apiClient(`/itemslib`),

  getLibrosFiltrados: (filtros = {}) => {

    const clean = Object.fromEntries(
      Object.entries(filtros).filter(
        ([_, v]) => v
      )
    );

    const params =
      new URLSearchParams(clean).toString();

    return apiClient(
      `/itemslib?${params}`
    );
  },

  getLibroPorId: (id) =>
    apiClient(`/itemslib/${id}`),

  getTop10: () =>
    apiClient(
      `/itemslib/top10?masVendido=true`
    ),

  // COWORKING
  getCoworkingSpaces: () =>
    apiClient(`/coworkingnew/spaces`),

  getCoworkingSpacesById: (id) =>
    apiClient(`/coworkingnew/spaces/${id}`),

  // COMPRAS
  getPurchasedItems: (id) =>
    apiClient(`/compras?userId=${id}`),
};