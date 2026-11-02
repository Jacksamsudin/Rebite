
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CheckoutPage.css'

function formatRupiah(harga) {
  return Number(harga || 0).toLocaleString('id-ID')
}

function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Mengambil data makanan dari halaman Detail Makanan
  const makanan = location.state?.makanan

  const [quantity, setQuantity] = useState(1)
  const [promoCode, setPromoCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('ewallet')
  const [message, setMessage] = useState('')

  // Jika Checkout dibuka tanpa memilih makanan
  if (!makanan) {
    return (
      <main className="checkout-page">
        <header className="checkout-heading">
          <p className="checkout-eyebrow">REBITE FOOD RESCUE</p>
          <h1>Checkout</h1>
          <p>Data makanan tidak ditemukan.</p>
        </header>

        <button
          type="button"
          className="button-primary"
          onClick={() => navigate('/beranda')}
        >
          Kembali ke Beranda
        </button>
      </main>
    )
  }

  const stok = Math.max(0, Math.floor(Number(makanan.stok) || 0))
  const hargaNormal = Number(makanan.hargaNormal) || 0
  const hargaDiskon = Number(makanan.hargaDiskon)

  const harga =
    Number.isFinite(hargaDiskon) && hargaDiskon >= 0
      ? hargaDiskon
      : hargaNormal

  const serviceFee = 1000
  const subtotal = harga * quantity

  const promoValid = promoCode.trim().toUpperCase() === 'HEMAT10'
  const discount = promoValid ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + serviceFee - discount

  function handlePromo() {
    if (promoValid) {
      setMessage('Kode promo berhasil digunakan!')
    } else {
      setMessage('Kode promo tidak valid.')
    }
  }

    function handlePayment(event) {
      event.preventDefault()

    if (stok < 1) {
      setMessage('Maaf, stok makanan sudah habis.')
      return
    }

    if (quantity < 1 || quantity > stok) {
      setMessage(`Jumlah pesanan maksimal ${stok} paket.`)
      return
    }

    navigate('/order-ticket', {
      state: {
        makanan,
        quantity,
        subtotal,
        serviceFee,
        discount,
        total,
        paymentMethod,
      },
    })
  }

  return (
    <main className="checkout-page">
      <header className="checkout-heading">
        <p className="checkout-eyebrow">REBITE FOOD RESCUE</p>
        <h1>Checkout</h1>
        <p>Selangkah lagi menuju makanan favoritmu.</p>
      </header>

      <form className="checkout-layout" onSubmit={handlePayment}>
        <section className="checkout-card">
          <h2>Ringkasan Pesanan</h2>

          <article className="checkout-product">
            <div className="checkout-product-image">
              {makanan.foto ? (
                <img
                  src={makanan.foto}
                  alt={makanan.nama || 'Foto makanan'}
                />
              ) : (
                '🥐'
              )}
            </div>

            <div className="checkout-product-info">
              <h3>{makanan.nama || 'Nama makanan'}</h3>
              <p>{makanan.penjual || 'Penjual ReBite'}</p>

              {hargaNormal > harga && (
                <del>Rp{formatRupiah(hargaNormal)}</del>
              )}

              <strong>Rp{formatRupiah(harga)}</strong>
            </div>
          </article>

          <p className="checkout-stock">
            Stok tersedia: <strong>{stok}</strong>
          </p>

          <div className="checkout-quantity">
            <label htmlFor="quantity">Jumlah paket</label>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => {
                  setQuantity((current) => Math.max(1, current - 1))
                  setMessage('')
                }}
                disabled={quantity <= 1}
                aria-label="Kurangi jumlah"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => {
                  setQuantity((current) => Math.min(stok, current + 1))
                  setMessage('')
                }}
                disabled={quantity >= stok || stok < 1}
                aria-label="Tambah jumlah"
              >
                +
              </button>
            </div>
          </div>

          <div className="checkout-promo">
            <label htmlFor="promo">Kode promo</label>

            <div className="promo-controls">
              <input
                id="promo"
                type="text"
                placeholder="Contoh: HEMAT10"
                value={promoCode}
                onChange={(event) => {
                  setPromoCode(event.target.value)
                  setMessage('')
                }}
              />

              <button
                type="button"
                className="button-secondary"
                onClick={handlePromo}
              >
                Gunakan
              </button>
            </div>
          </div>

          <div className="checkout-payment">
            <h2>Metode Pembayaran</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="ewallet"
                checked={paymentMethod === 'ewallet'}
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              <span>👛</span>
              <span>E-Wallet</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              <span>💳</span>
              <span>Kartu Debit/Kredit</span>
            </label>
          </div>
        </section>

        <aside className="checkout-card checkout-summary">
          <h2>Rincian Pembayaran</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rp{formatRupiah(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Biaya layanan</span>
            <span>Rp{formatRupiah(serviceFee)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row discount-row">
              <span>Diskon promo</span>
              <span>-Rp{formatRupiah(discount)}</span>
            </div>

          <div className="summary-total">
            <span>Total pembayaran</span>
            <strong>Rp{formatRupiah(total)}</strong>
          </div>

          <button
            type="submit"
            className="button-primary"
            disabled={stok < 1}
          >
            Bayar Sekarang
          </button>

            <p className="checkout-note">
              Ini merupakan simulasi pembayaran untuk proyek ReBite.
            </p>
          </aside>
        </form>
      </main>
    )
  }

  export default CheckoutPage
