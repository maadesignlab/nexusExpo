import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { CoworkingProvider } from "./CoworkingContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CoworkingProvider>
          {children}
        </CoworkingProvider>
      </CartProvider>
    </AuthProvider>
  );
}