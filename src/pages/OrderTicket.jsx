import "./OrderTicket.css";

function OrderTicket() {
  const order = {
    id: "RB-20261024-001",
    productName: "Paket Makanan Surplus",
    storeName: "Warung ReBite",
    quantity: 2,
    total: 24000,
    pickupAddress: "Bojongsoang, Bandung",
    pickupTime: "16.00–19.00 WIB",
  };

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
              Tiket Demo
            </span>
          </div>

          <div className="ticket-product">
            <div>
              <h2>{order.productName}</h2>
              <p>{order.storeName}</p>
              <p>{order.quantity} porsi</p>
            </div>

            <strong>
              {formatRupiah(order.total)}
            </strong>
          </div>

          <div className="ticket-qr">
            <img
              src="/qr-demo.png"
              alt={`QR Code klaim pesanan ${order.id}`}
              width="190"
              height="190"
            />

            <p>KODE KLAIM</p>
            <h3>{order.id}</h3>

            <p className="ticket-qr-note">
              Simpan kode ini untuk proses pengambilan.
            </p>
          </div>

          <div className="ticket-divider" />

          <div className="ticket-info">
            <div>
              <span>Lokasi pengambilan</span>
              <strong>{order.pickupAddress}</strong>
            </div>

            <div>
              <span>Waktu pengambilan</span>
              <strong>{order.pickupTime}</strong>
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
        </div>

        <p className="ticket-note">
          Ini adalah tiket demo untuk pengujian
          frontend ReBite.
        </p>

      </div>
    </main>
  );
}

export default OrderTicket;