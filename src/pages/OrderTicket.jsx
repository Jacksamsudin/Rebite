import { Link, useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import "./OrderTicket.css";

function OrderTicket() {
  const location = useLocation();

  const demoOrder = {
    id: "RB-20261024-001",
    productName: "Paket Makanan Surplus",
    storeName: "Warung ReBite",
    quantity: 2,
    total: 24000,
    pickupAddress: "Bojongsoang, Bandung",
    pickupTime: "16.00–19.00 WIB",
  };

  const order = location.state?.order || demoOrder;

  const orderId = order.id || order.orderId || demoOrder.id;
  const productName =
    order.productName || demoOrder.productName;
  const storeName =
    order.storeName || demoOrder.storeName;

  const quantity = Number(
    order.quantity ?? demoOrder.quantity
  );

  const total = Number(
    order.total ?? demoOrder.total
  );

  const claimCode = `REBITE-CLAIM-${orderId}`;

  function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return (
    <main className="ticket-page">
      <div className="ticket-container">

        <div
          className="ticket-success-icon"
          aria-hidden="true"
        >
          ✓
        </div>

        <p className="ticket-eyebrow">
          ORDER SUCCESSFUL
        </p>

        <h1>Pesanan Berhasil!</h1>

        <p className="ticket-description">
          Tunjukkan QR Code ini kepada staf gerai
          saat mengambil makananmu.
        </p>

        <section
          className="ticket-card"
          aria-label="Tiket pesanan"
        >

          <div className="ticket-header">
            <div>
              <span className="ticket-brand">
                ReBite
              </span>

              <p>Food Rescue Ticket</p>
            </div>

            <span className="ticket-status">
              Berhasil
            </span>
          </div>

          <div className="ticket-product">
            <div>
              <h2>{productName}</h2>
              <p>{storeName}</p>
              <p>{quantity} porsi</p>
            </div>

            <strong>
              {formatRupiah(total)}
            </strong>
          </div>

          <div className="ticket-qr">
            <QRCodeSVG
              value={claimCode}
              size={190}
              level="M"
              marginSize={4}
              title={`QR Code klaim pesanan ${orderId}`}
            />

            <p>KODE KLAIM</p>

            <h3>{orderId}</h3>

            <p className="ticket-qr-note">
              Simpan kode ini untuk proses pengambilan.
            </p>
          </div>

          <div className="ticket-divider" />

          <div className="ticket-info">
            <div>
              <span>Lokasi pengambilan</span>

              <strong>
                {order.pickupAddress ||
                  demoOrder.pickupAddress}
              </strong>
            </div>

            <div>
              <span>Waktu pengambilan</span>

              <strong>
                {order.pickupTime ||
                  demoOrder.pickupTime}
              </strong>
            </div>
          </div>
        </section>

        <div className="ticket-actions">
          <button
            type="button"
            className="ticket-print-button"
            onClick={() => window.print()}
          >
            Cetak Tiket
          </button>

          <Link
            to="/"
            className="ticket-home-button"
          >
            Kembali ke Beranda
          </Link>
        </div>

        <p className="ticket-note">
          Ini adalah tiket demo untuk pengujian aplikasi.
          Tunjukkan tiket kepada penjual saat pengambilan.
        </p>

      </div>
    </main>
  );
}

export default OrderTicket;