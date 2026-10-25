import React from 'react';
import './RiwayatPesanan.css';

const RiwayatPesanan = () => {
  const pesananList = [
    {
      id: "RB-89231",
      tanggal: "24 Okt 2026",
      status: "Selesai",
      items: [
        { nama: "Nasi Goreng Spesial", porsi: 2, harga: 25000 }
      ],
      total: 50000
    },
    {
      id: "RB-89104",
      tanggal: "20 Okt 2026",
      status: "Dibatalkan",
      items: [
        { nama: "Ayam Bakar Madu", porsi: 1, harga: 30000 }
      ],
      total: 30000
    }
  ];

  return (
    <div className="riwayat-container">
      <h1 className="riwayat-title">Riwayat Pesanan</h1>

      <div className="riwayat-list">
        {pesananList.map((pesanan) => (
          <div key={pesanan.id} className="pesanan-card">
            <div className="pesanan-header">
              <span className="pesanan-id">ID: {pesanan.id}</span>
              <span className={`status-badge status-${pesanan.status.toLowerCase()}`}>
                {pesanan.status}
              </span>
            </div>

            <p className="pesanan-tanggal">{pesanan.tanggal}</p>

            <div className="pesanan-body">
              {pesanan.items.map((item, idx) => (
                <div key={idx} className="pesanan-item">
                  <span>{item.nama} x{item.porsi}</span>
                  <span>Rp {item.harga.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="pesanan-footer">
              <div className="total-harga">
                <span>Total Pesanan:</span>
                <strong>Rp {pesanan.total.toLocaleString('id-ID')}</strong>
              </div>
              <button className="btn-detail">Lihat Detail</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiwayatPesanan;