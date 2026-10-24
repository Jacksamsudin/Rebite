import defaultAvatar from '../assets/default-avatar.png'
import './ProfilePage.css'
import { useState } from 'react'

function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)

    const [profile, setProfile] = useState({
        name: 'Dadang Kornelo',
        email: 'dangkon@opsec.com',
        phone: '08236767676'
    })

    const [formData, setFormData] = useState(profile)
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
                        <h2>{profile.name}</h2>
                        <p>{profile.email}</p>
                        <p>{profile.phone}</p>
                    </div>
                </div>

                <button
                    type='button'
                    className='profile-edit-button'
                    onClick={() => setIsEditing(true)}
                >Edit Profil</button>
            </section>
            {isEditing && (
                <section className="profile-edit-form">
                    <h2>Edit Informasi Profil</h2>

                    <div className="profile-form-group">
                        <label htmlFor="profile-name">Nama Lengkap</label>
                        <input
                            id="profile-name"
                            type="text"
                            defaultValue={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label htmlFor="profile-email">Email</label>
                        <input
                            id="profile-email"
                            type="email"
                            defaultValue={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label htmlFor="profile-phone">Nomor Telepon</label>
                        <input
                            id="profile-phone"
                            type="tel"
                            defaultValue={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                        />
                    </div>

                    <div className="profile-form-actions">
                        <button
                            type="button"
                            onClick={() => {
                                setFormData(profile)
                                setIsEditing(false)
                            }}
                        >
                            Batal
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setProfile(formData)
                                setIsEditing(false)
                            }}
                        >
                            Simpan
                        </button>
                    </div>
                </section>
            )}
        </main>
    );
}

export default ProfilePage;