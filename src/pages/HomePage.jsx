import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { getDaftarMakanan } from '../services/makananservice';
import '../styles/HomePage.css';


const formatRupiah = (harga) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(harga);

function HomePage() {
    const [kataKunci, setKataKunci] = useState('');
    const [kategoriAktif, setKategoriAktif] = useState('Semua');

    const [daftarMakanan, setDaftarMakanan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function ambilMakanan() {
            try {
                setLoading(true);
                setError('');

                const data = await getDaftarMakanan();
                setDaftarMakanan(data);
            } catch (err) {
                setError(
                    err.message || 'Gagal mengambil data makanan.'
                );
            } finally {
                setLoading(false);
            }
        }

        ambilMakanan();
    }, []);

    const kategori = [
        'Semua',
        'Makanan Berat',
        'Roti & Kue',
        'Makanan Sehat',
    ];

    const makananDitampilkan = daftarMakanan.filter((makanan) => {
        const cocokNama = makanan.nama
            .toLowerCase()
            .includes(kataKunci.toLowerCase());

        const cocokKategori =
            kategoriAktif === 'Semua' ||
            makanan.kategori === kategoriAktif;

        return cocokNama && cocokKategori;
    });

    return (
        <main className="home-page">
            <Navbar />

            <section className="home-hero">
                <div className="home-hero-content">
                    <span className="home-eyebrow">
                        ♻️ Belanja hemat, kurangi limbah
                    </span>

                    <h1>
                        Makanan enak,
                        <br />
                        harga lebih <span>hemat.</span>
                    </h1>

                    <p>
                        Temukan makanan berkualitas dengan harga spesial
                        sekaligus bantu mengurangi makanan terbuang.
                    </p>

                    <a href="#daftar-makanan" className="home-hero-button">
                        Jelajahi Makanan →
                    </a>
                </div>

                <div className="home-hero-illustration" aria-hidden="true">
                    <span>🥗</span>
                    <span>🥐</span>
                    <span>🍱</span>
                    <div className="home-hero-badge">
                        Hemat hingga 50%
                    </div>
                </div>
            </section>

            <section className="home-food-section" id="daftar-makanan">
                <div className="home-section-heading">
                    <div>
                        <span className="home-section-label">PILIHAN HARI INI</span>
                        <h2>Temukan makananmu</h2>
                        <p>Makanan favorit dengan harga yang lebih bersahabat.</p>
                    </div>
                </div>

                <label className="home-search">
                    <span aria-hidden="true">⌕</span>
                    <input
                        type="search"
                        placeholder="Cari makanan favoritmu..."
                        value={kataKunci}
                        onChange={(event) => setKataKunci(event.target.value)}
                        aria-label="Cari makanan"
                    />
                </label>

                <div className="home-categories" aria-label="Filter kategori">
                    {kategori.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={
                                kategoriAktif === item
                                    ? 'home-category active'
                                    : 'home-category'
                            }
                            onClick={() => setKategoriAktif(item)}
                            aria-pressed={kategoriAktif === item}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p role="status">Memuat daftar makanan...</p>
                ) : error ? (
                    <div role="alert">
                        <p>{error}</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : (
                    <div className="home-food-grid">
                        {makananDitampilkan.map((makanan) => (
                            <article className="home-food-card" key={makanan.id}>
                                <div className="home-food-image">
                                    <span aria-hidden="true">{makanan.emoji}</span>
                                    <span className="home-discount">
                                        Hemat {Math.round(
                                            (1 - makanan.hargaDiskon / makanan.hargaNormal) * 100
                                        )}%
                                    </span>
                                </div>

                                <div className="home-food-info">
                                    <span className="home-food-category">
                                        {makanan.kategori}
                                    </span>
                                    <h3>{makanan.nama}</h3>
                                    <p className="home-food-location">
                                        {makanan.lokasi}
                                    </p>

                                    <div className="home-food-prices">
                                        <strong>{formatRupiah(makanan.hargaDiskon)}</strong>
                                        <del>{formatRupiah(makanan.hargaNormal)}</del>
                                    </div>

                                    <Link
                                        to={`/detail-makanan?id=${makanan.id}`}
                                        state={{ makanan }}
                                        className="home-detail-button"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {makananDitampilkan.length === 0 && (
                    <p className="home-empty">
                        Makanan tidak ditemukan. Coba kata kunci lain.
                    </p>
                )}
            </section>

            <footer className="home-footer">
                <a href="/" className="home-logo">
                    Re<span>Bite</span>
                </a>
                <p>Makan lebih hemat, selamatkan lebih banyak makanan.</p>
            </footer>
        </main>
    );
}

export default HomePage;
