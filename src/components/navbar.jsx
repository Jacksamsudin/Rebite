
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/beranda" className="navbar-logo">
        ReBite
      </Link>

      <nav className="navbar-menu" aria-label="Navigasi utama">
        <Link to="/beranda">Beranda</Link>
        <Link to="/riwayat-pesanan">Pesanan</Link>
        <Link to="/profil">Profil</Link>
        <Link to="/login">Masuk</Link>
      </nav>
    </header>
  );
}

export default Navbar;
