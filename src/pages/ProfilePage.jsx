import defaultAvatar from '../assets/default-avatar.png'
import './ProfilePage.css'

function ProfilePage() {
    return (
        <main className="profile-page">
            <h1>Profil Saya</h1>
            <p>Kelola informasi akun ReBite kamu.</p>

            <section className='profile-card'>
                <div className='profile-info'>
                    <img
                        src={defaultAvatar}
                        alt="Foto profil Pengguna"
                        className="profile-avatar"
                    />
                    
                    <div className='profile-details'>
                        <h2>John Doe</h2>
                        <p>john@opsec.com</p>
                        <p>08236767676</p>
                    </div>
                </div>

                <button type='button' className='profile-edit-button'>Edit Profil</button>
            </section>
        </main>
    );
}

export default ProfilePage;