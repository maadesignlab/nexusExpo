import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiEndpoints } from '../lib/apiEndpoints';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    // RESTAURAR SESIÓN
    useEffect(() => {

        const restoreSession = async () => {

            try {

                const savedUser =
                    await AsyncStorage.getItem(
                        'auth_user'
                    );

                if (savedUser) {

                    setUser(
                        JSON.parse(savedUser)
                    );
                }

            } catch (error) {

                console.log(
                    'Restore session error:',
                    error
                );

            } finally {

                setLoading(false);
            }
        };

        restoreSession();

    }, []);

    // LOGIN
    const login = async (
        email,
        password
    ) => {

        try {

            const response =
                await apiEndpoints.getUserByEmail(
                    email
                );

            console.log(
                'LOGIN RESPONSE:',
                response
            );

            // Si la API devuelve array
            const user = Array.isArray(response)
                ? response[0]
                : response;

            // Usuario no encontrado
            if (!user?.id) {

                return {
                    success: false,
                    error:
                        'Usuario no encontrado',
                };
            }

            // Password incorrecta
            if (
                user.contrasena !== password
            ) {

                return {
                    success: false,
                    error:
                        'Contraseña incorrecta',
                };
            }

            // Usuario seguro
            const safeUser = {
                id: user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
            };

            // Guardar sesión
            await AsyncStorage.setItem(
                'auth_user',
                JSON.stringify(safeUser)
            );

            setUser(safeUser);

            return {
                success: true,
                user: safeUser,
            };

        } catch (error) {

            console.log(
                'LOGIN ERROR:',
                error
            );

            return {
                success: false,
                error:
                    'Error de conexión',
            };
        }
    };

    // LOGOUT
    const logout = async () => {

        try {

            await AsyncStorage.removeItem(
                'auth_user'
            );

            setUser(null);

        } catch (error) {

            console.log(
                'Logout error:',
                error
            );
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}