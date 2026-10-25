
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import CheckoutPage from './pages/CheckoutPage';
import DetailMakanan from './pages/DetailMakanan';
import OrderTicket from './pages/OrderTicket';
import ProfilePage from './pages/ProfilePage';
import RiwayatPesanan from './pages/RiwayatPesanan';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
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
