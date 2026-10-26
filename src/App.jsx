
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailMakanan from './pages/Detailmakanan.jsx';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import CheckoutPage from './pages/CheckoutPage';
import DetailMakanan from './pages/DetailMakanan';
import OrderTicket from './pages/OrderTicket';
import ProfilePage from './pages/ProfilePage';
import RiwayatPesanan from './pages/RiwayatPesanan';
import HomePage from './pages/HomePage';
main

function App() {
  return (
    <BrowserRouter>
      <Routes>
 feature/detail-makanan
        <Route
          path="/"
          element={<DetailMakanan />}
        />
        <Route
          path="/detail-makanan"
          element={<DetailMakanan />}
        />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/beranda" element={<HomePage />} />

        <Route path="/detail-makanan" element={<DetailMakanan />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-ticket" element={<OrderTicket />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/riwayat-pesanan" element={<RiwayatPesanan />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
 main
      </Routes>
    </BrowserRouter>
  );
}

export default App;
feature/detail-makanan main