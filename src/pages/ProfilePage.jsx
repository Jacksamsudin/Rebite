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
    const [errors, setErrors] = useState({})
    function validateForm() {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Nama lengkap wajib diisi.'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi.'
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = 'Format email tidak valid'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Nomor telepon wajib diisi.'
        } else if (!/^\d+$/.test(formData.phone.trim())) {
            newErrors.phone = 'Nomor telepon hanya boleh berisi angka.'
        }
        setErrors(newErrors)

        return Object.keys(newErrors).length === 0

    }
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
                    onClick={() => {
                        setFormData(profile)
                        setErrors({})
                        setIsEditing(true)
                    }}
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
                        {errors.name && (
                            <p className='profile-error'>{errors.name}</p>
                        )}
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
                        {errors.email && (
                            <p className='profile-error'>{errors.email}</p>
                        )}
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
                        {errors.phone && (
                            <p className='profile-error'>{errors.phone}</p>
                        )}

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
                                if (validateForm()) {
                                    setProfile({
                                        name: formData.name.trim(),
                                        email: formData.email.trim(),
                                        phone: formData.phone.trim(),
                                    })
                                    setIsEditing(false)
                                }
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