import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <AppRoutes />
          <Toaster position="bottom-right" />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default App