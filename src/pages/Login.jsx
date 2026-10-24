
import './Login.css';

function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <h1 className="login-title">
          Selamat Datang di ReBite
        </h1>

        <p className="login-description">
          Masuk ke akun kamu untuk melanjutkan.
        </p>

        <form className="login-form">
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
