import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CheckoutPage from './pages/CheckoutPage';
import OrderTicket from './pages/OrderTicket';
import ProfilePage from './pages/ProfilePage';
import RiwayatPesanan from './pages/RiwayatPesanan';
import HomePage from './pages/HomePage';
import DetailMakanan from './pages/DetailMakanan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beranda" element={<HomePage />} />
        <Route path="/detail-makanan" element={<DetailMakanan />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-ticket" element={<OrderTicket />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/riwayat-pesanan" element={<RiwayatPesanan />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;