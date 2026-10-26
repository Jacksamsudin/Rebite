
import { useState } from 'react'
import '../styles/CheckoutPage.css'
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1)
  const [promoCode, setPromoCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('ewallet')
  const [message, setMessage] = useState('')

  const product = {
    name: 'Paket Roti Surplus',
    store: 'ReBite Bakery',
    price: 15000,
    originalPrice: 30000,
  }

  const serviceFee = 1000
  const subtotal = product.price * quantity
  const discount = promoCode.trim().toUpperCase() === 'HEMAT10'
    ? Math.round(subtotal * 0.1)
    : 0
  const total = subtotal + serviceFee - discount

  function handlePromo() {
    if (promoCode.trim().toUpperCase() === 'HEMAT10') {
      setMessage('Kode promo berhasil digunakan!')
    } else {
      setMessage('Kode promo tidak valid.')
    }
  }

    function handlePayment(event) {
      event.preventDefault()

      if (quantity < 1) {
        setMessage('Jumlah pesanan minimal 1.')
        return
      }

      navigate('/order-ticket')
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
              <div className="checkout-product-image" aria-hidden="true">
                🥐
              </div>

              <div className="checkout-product-info">
                <h3>{product.name}</h3>
                <p>{product.store}</p>
                <del>
                  Rp{product.originalPrice.toLocaleString('id-ID')}
                </del>
                <strong>
                  Rp{product.price.toLocaleString('id-ID')}
                </strong>
              </div>
            </article>

            <div className="checkout-quantity">
              <label htmlFor="quantity">Jumlah paket</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Kurangi jumlah"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
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

                <button type="button" className="button-secondary" onClick={handlePromo}>
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
              <span>Rp{subtotal.toLocaleString('id-ID')}</span>
            </div>

            <div className="summary-row">
              <span>Biaya layanan</span>
              <span>Rp{serviceFee.toLocaleString('id-ID')}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount-row">
                <span>Diskon promo</span>
                <span>-Rp{discount.toLocaleString('id-ID')}</span>
              </div>
            )}

            <div className="summary-total">
              <span>Total pembayaran</span>
              <strong>Rp{total.toLocaleString('id-ID')}</strong>
            </div>

            <button type="submit" className="button-primary">
              Bayar Sekarang
            </button>

            {message && (
              <p className="checkout-message" role="status">
                {message}
              </p>
            )}

            <p className="checkout-note">
              Ini merupakan simulasi pembayaran untuk proyek ReBite.
            </p>
          </aside>
        </form>
      </main>
    )
  }

  export default CheckoutPage
