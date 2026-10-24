import './DetailMakanan.css';

function formatRupiah(harga) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(harga);
}

function DetailMakanan({ makanan, onPesan, onKembali }) {
    if (!makanan) {
        return (
            <main className="detail-makanan">
                <p>Data Makananan tidak ditemukan</p>
                <button type="button" onClick={onKembali}>
                    Kembali ke Marpetplace</button>
            </main>


        );
    }


    const diskon =
        makanan.hargaNormal > 0
            ? Math.round(
                ((makanan.hargaNormal - makanan.hargaDiskon) /
                    makanan.hargaNormal) *
                100
            )
            : 0;

    const stokTersedia = makanan.stok > 0;

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
                        <img src={makanan.foto} alt={makanan.nama} />
                    ) : (
                        <p>Foto makanan belum tersedia.</p>
                    )}

                    {diskon > 0 && (
                        <span className="detail-discount">{diskon}% OFF</span>
                    )}
                </div>

                <div className="detail-content">
                    <p className="detail-category">{makanan.kategori}</p>
                    <h1>{makanan.nama}</h1>
                    <p className="detail-description">{makanan.deskripsi}</p>

                    <div className="detail-prices">
                        <span className="detail-original-price">
                            {formatRupiah(makanan.hargaNormal)}
                        </span>
                        <strong>{formatRupiah(makanan.hargaDiskon)}</strong>
                    </div>

                    <p className="detail-stock">
                        Stok tersedia: <strong>{makanan.stok}</strong>
                    </p>

                    <div className="detail-seller">
                        <div className="detail-seller-avatar">
                            {makanan.penjual?.charAt(0) || '?'}
                        </div>
                        <div>
                            <p className="detail-seller-label">Dijual oleh</p>
                            <strong>{makanan.penjual || 'Informasi penjual belum tersedia'}</strong>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="detail-order-button"
                        disabled={!stokTersedia}
                        onClick={() => onPesan?.(makanan)}
                    >
                        {stokTersedia ? 'Pesan Sekarang' : 'Stok Habis'}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default DetailMakanan;