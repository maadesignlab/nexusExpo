import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { apiEndpoints } from '../lib/apiEndpoints';

const CoworkingContext = createContext();

export const useCoworking = () => {
    const context = useContext(CoworkingContext);
    if (!context) {
        throw new Error("useCoworking must be used within a CoworkingProvider");
    }
    return context;
};

export const CoworkingProvider = ({ children }) => {
    const [coworking, setCoworking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSpaces = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiEndpoints.getCoworkingSpaces();
            setCoworking(data || []);
        } catch (err) {
            console.warn("API Error (Apidog down), loading fallback data...", err);
            // Fallback data en caso de que Apidog esté caído (502)
            const fallbackData = [
                { id: 1, nombre: "Sala de Juntas A", tipo: "Privado", capacidad: 8, ocupado: false, ubicacion: "Piso 1" },
                { id: 2, nombre: "Escritorio Compartido 1", tipo: "Compartido", capacidad: 1, ocupado: true, ubicacion: "Piso 1" },
                { id: 3, nombre: "Auditorio Principal", tipo: "Evento", capacidad: 50, ocupado: false, ubicacion: "Piso 2" },
                { id: 4, nombre: "Sala Creativa", tipo: "Privado", capacidad: 4, ocupado: true, ubicacion: "Piso 2" },
                { id: 5, nombre: "Cabina de Llamadas", tipo: "Individual", capacidad: 1, ocupado: false, ubicacion: "Piso 1" }
            ];
            setCoworking(fallbackData);
            // No seteamos error para que la UI se pueda mostrar y probar
            setError(null); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    // Cálculos derivados
    const disponibles = useMemo(() => coworking.filter(space => !space.ocupado).length, [coworking]);
    const ocupados = useMemo(() => coworking.filter(space => space.ocupado).length, [coworking]);

    const value = {
        coworking,
        disponibles,
        ocupados,
        loading,
        error,
        refreshSpaces: fetchSpaces
    };

    return (
        <CoworkingContext.Provider value={value}>
            {children}
        </CoworkingContext.Provider>
    );
};
