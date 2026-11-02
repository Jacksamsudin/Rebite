import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../styles/RiwayatPesanan.css';  

const RiwayatPesanan = () => {
  const [pesananList, setPesananList] = useState([]);
  const [selectedPesanan, setSelectedPesanan] = useState(null);

  useEffect(() => {

    const savedOrders = JSON.parse(localStorage.getItem('rebite_orders') || '[]');
    
    const defaultOrders = [
      {
        id: "RB-89231",
        tanggal: "24 Okt 2026",
        status: "Selesai",
        items: [
          { nama: "Nasi Goreng Spesial", porsi: 2, harga: 50000 }
        ],
        serviceFee: 1000,
        discount: 0,
        total: 51000,
        storeName: "Warung ReBite",
        pickupAddress: "Bojongsoang, Bandung",
        pickupTime: "16.00–19.00 WIB"
      },
      {
        id: "RB-89104",
        tanggal: "20 Okt 2026",
        status: "Dibatalkan",
        items: [
          { nama: "Ayam Bakar Madu", porsi: 1, harga: 30000 }
        ],
        serviceFee: 1000,
        discount: 0,
        total: 31000,
        storeName: "Ayam Bakar Pak Joko",
        pickupAddress: "Sukabirus, Bandung",
        pickupTime: "17.00–20.00 WIB"
      }
    ];

    setPesananList([...savedOrders, ...defaultOrders]);
  }, []);

  const getStatusClass = (status) => {
    if (status.toLowerCase().includes('menunggu') || status.toLowerCase().includes('siap')) {
      return 'status-proses';
    }
    if (status.toLowerCase().includes('selesai')) {
      return 'status-selesai';
    }
    return 'status-dibatalkan';
  };

  return (
    <>
      <Navbar />
      <div className="riwayat-container">
        <h1 className="riwayat-title">Riwayat Pesanan</h1>

        <div className="riwayat-list">
          {pesananList.map((pesanan) => (
            <div key={pesanan.id} className="pesanan-card">
              <div className="pesanan-header">
                <span className="pesanan-id">ID: {pesanan.id}</span>
                <span className={`status-badge ${getStatusClass(pesanan.status)}`}>
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
                  <span>Total Pesanan: </span>
                  <strong>Rp {pesanan.total.toLocaleString('id-ID')}</strong>
                </div>
                <button 
                  className="btn-detail"
                  onClick={() => setSelectedPesanan(pesanan)}
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPesanan && (
        <div className="modal-overlay" onClick={() => setSelectedPesanan(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Pesanan</h2>
              <button className="btn-close" onClick={() => setSelectedPesanan(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="modal-info-group">
                <span className="info-label">ID Pesanan</span>
                <strong>{selectedPesanan.id}</strong>
              </div>

              <div className="modal-info-group">
                <span className="info-label">Status</span>
                <span className={`status-badge ${getStatusClass(selectedPesanan.status)}`}>
                  {selectedPesanan.status}
                </span>
              </div>

              <div className="modal-info-group">
                <span className="info-label">Tanggal Transaksi</span>
                <p>{selectedPesanan.tanggal}</p>
              </div>

              <div className="modal-divider" />

              <div className="modal-info-group">
                <span className="info-label">Lokasi Pengambilan</span>
                <p><strong>{selectedPesanan.storeName || 'Warung ReBite'}</strong></p>
                <p>{selectedPesanan.pickupAddress || 'Bojongsoang, Bandung'}</p>
                <p className="time-text">Waktu: {selectedPesanan.pickupTime || '16.00–19.00 WIB'}</p>
              </div>

              <div className="modal-divider" />

              <div className="modal-info-group">
                <span className="info-label">Rincian Pembayaran</span>
                {selectedPesanan.items.map((item, idx) => (
                  <div key={idx} className="modal-item-row">
                    <span>{item.nama} (x{item.porsi})</span>
                    <span>Rp {item.harga.toLocaleString('id-ID')}</span>
                  </div>
                ))}

                <div className="modal-item-row fee-text">
                  <span>Biaya Layanan</span>
                  <span>Rp {(selectedPesanan.serviceFee || 1000).toLocaleString('id-ID')}</span>
                </div>

                {selectedPesanan.discount > 0 && (
                  <div className="modal-item-row discount-text">
                    <span>Diskon Promo</span>
                    <span>-Rp {selectedPesanan.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>

              <div className="modal-divider" />

              <div className="modal-total-row">
                <span>Total Pembayaran</span>
                <strong>Rp {selectedPesanan.total.toLocaleString('id-ID')}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-close-modal" onClick={() => setSelectedPesanan(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RiwayatPesanan;