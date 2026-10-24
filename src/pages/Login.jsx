  import { useState } from 'react';
  import './Login.css';

  function Login() {

    const [pesanError, setPesanError] = useState('');
    const [pesanSukses, setPesanSukses] = useState('');

    function handleSubmit(event) {
      event.preventDefault();

      setPesanError('');
      setPesanSukses('');

      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');

      if (!email || !password) {
        setPesanError('Email dan password wajib diisi.');
        return;
      }

      setPesanSukses('Validasi berhasil. Login belum terhubung ke server');
    }
    return (
      <main className="login-page">
        <section className="login-card">
          <h1 className="login-title">
            Selamat Datang di ReBite
          </h1>

          <p className="login-description">
            Masuk ke akun kamu untuk melanjutkan.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            {pesanError && (
              <p className="login-error" role="alert">
                {pesanError}
              </p>
            )}

            {pesanSukses && (
              <p className="login-success" role="status">
                {pesanSukses}
              </p>
            )}
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukkan email kamu"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan password kamu"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Masuk
            </button>

            <p className="login-register">
              Belum punya akun? <a href="/register">Daftar di sini</a>
            </p>
          </form>
        </section>
      </main>
    );
  }

  export default Login;
