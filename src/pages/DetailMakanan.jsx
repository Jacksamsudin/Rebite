import './DetailMakanan.css';

function formatRupiah(harga) {
    const nilai = Number(harga);

    if (!Number.isFinite(nilai)) {
        return 'Harga belum tersedia';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(nilai);
}

function DetailMakanan({ makanan, onPesan, onKembali }) {
    if (!makanan) {
        return (
            <main className="detail-makanan">
                <p>Data makanan tidak ditemukan.</p>
                <button
                    type="button"
                    className="detail-back-button"
                    onClick={onKembali}
                >
                    Kembali ke Marketplace
                </button>
            </main>
        );
    }

    const hargaNormal = Number(makanan.hargaNormal);
    const hargaDiskon = Number(makanan.hargaDiskon);
    const stok = Number(makanan.stok);

    const hargaValid =
        Number.isFinite(hargaNormal) &&
        Number.isFinite(hargaDiskon) &&
        hargaNormal > 0 &&
        hargaDiskon >= 0;

    const diskon = hargaValid && hargaDiskon < hargaNormal
        ? Math.round(
            ((hargaNormal - hargaDiskon) / hargaNormal) * 100
        )
        : 0;

    const stokTersedia = Number.isFinite(stok) && stok > 0;

    return (
        <main className="detail-makanan">
            <button
                type="button"
                className="detail-back-button"
                onClick={onKembali}
            >
                &larr; Kembali
            </button>

            <section className="detail-card">
                <div className="detail-image">
                    {makanan.foto ? (
                        <img
                            src={makanan.foto}
                            alt={makanan.nama || 'Foto makanan'}
                        />
                    ) : (
                        <p>Foto makanan belum tersedia.</p>
                    )}

                    {diskon > 0 && (
                        <span className="detail-discount">
                            {diskon}% OFF
                        </span>
                    )}
                </div>

                <div className="detail-content">
                    <p className="detail-category">
                        {makanan.kategori || 'Kategori belum tersedia'}
                    </p>

                    <h1>{makanan.nama || 'Nama makanan belum tersedia'}</h1>

                    <p className="detail-description">
                        {makanan.deskripsi || 'Deskripsi belum tersedia.'}
                    </p>

                    <div className="detail-prices">
                        {diskon > 0 && (
                            <span className="detail-original-price">
                                {formatRupiah(hargaNormal)}
                            </span>
                        )}

                        <strong>
                            {formatRupiah(
                                makanan.hargaDiskon ?? makanan.hargaNormal
                            )}
                        </strong>
                    </div>

                    <p className="detail-stock">
                        Stok tersedia:{' '}
                        <strong>{stokTersedia ? stok : 0}</strong>
                    </p>

                    <div className="detail-seller">
                        <div className="detail-seller-avatar">
                            {makanan.penjual?.charAt(0)?.toUpperCase() || '?'}
                        </div>

                        <div>
                            <p className="detail-seller-label">
                                Dijual oleh
                            </p>

                            <strong>
                                {makanan.penjual ||
                                    'Informasi penjual belum tersedia'}
                            </strong>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="detail-order-button"
                        disabled={!stokTersedia || typeof onPesan !== 'function'}
                        onClick={() => onPesan(makanan)}
                    >
                        {!stokTersedia
                            ? 'Stok Habis'
                            : typeof onPesan !== 'function'
                                ? 'Pemesanan Belum Tersedia'
                                : 'Pesan Sekarang'}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default DetailMakanan;