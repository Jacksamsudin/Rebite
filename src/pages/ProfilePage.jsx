import defaultAvatar from '../assets/default-avatar.png'
import './ProfilePage.css'
import { useState } from 'react'

const translations = {
    id: {
        title: 'Profil Saya',
        description: 'Kelola informasi akun ReBite kamu.',
        edit: 'Edit Profil',
        settings: 'Pengaturan',
        language: 'Bahasa',
        languageDescription: 'Pilih bahasa yang ingin kamu gunakan.',
        indonesian: 'Bahasa Indonesia',
        english: 'English',
        editTitle: 'Edit Informasi Profil',
        name: 'Nama Lengkap',
        email: 'Email',
        phone: 'Nomor Telepon',
        cancel: 'Batal',
        save: 'Simpan',
        nameRequired: 'Nama lengkap wajib diisi.',
        emailRequired: 'Email wajib diisi.',
        emailInvalid: 'Format email tidak valid.',
        phoneRequired: 'Nomor telepon wajib diisi.',
        phoneInvalid: 'Nomor telepon hanya boleh berisi angka.',
        avatarAlt: 'Foto profil pengguna'
    },
    en: {
        title: 'My Profile',
        description: 'Manage your ReBite account information.',
        edit: 'Edit Profile',
        settings: 'Settings',
        language: 'Language',
        languageDescription: 'Choose your preferred language.',
        indonesian: 'Indonesian',
        english: 'English',
        editTitle: 'Edit Profile Information',
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        cancel: 'Cancel',
        save: 'Save',
        nameRequired: 'Full name is required.',
        emailRequired: 'Email is required.',
        emailInvalid: 'Please enter a valid email address.',
        phoneRequired: 'Phone number is required.',
        phoneInvalid: 'Phone number must contain digits only.',
        avatarAlt: 'User profile photo'
    }
}
function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)

    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem('rebite-profile')

        if (savedProfile) {
            try {
                return JSON.parse(savedProfile)
            } catch {
                localStorage.removeItem('rebite-profile')
            }
        }

        return {
            name: 'Dadang Kornelo',
            email: 'dangkon@opsec.com',
            phone: '08236767676'
        }
    })

    const [formData, setFormData] = useState(profile)
    const [errors, setErrors] = useState({})
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('rebite-language') || 'id'
    })
    const t = translations[language]



    function validateForm() {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = t.nameRequired
        }

        if (!formData.email.trim()) {
            newErrors.email = t.emailRequired
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = t.emailInvalid
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t.phoneRequired
        } else if (!/^\d+$/.test(formData.phone.trim())) {
            newErrors.phone = t.phoneInvalid
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return (
        <main className="profile-page">
            <h1>{t.title}</h1>
            <p>{t.description}</p>

            <section className='profile-card'>
                <div className='profile-info'>
                    <img
                        src={defaultAvatar}
                        alt={t.avatarAlt}
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
                >{t.edit}</button>
            </section>

            <section className='profile-settings'>
                <h2>{t.settings}</h2>

                <div className='profile-setting-item'>
                    <div>
                        <h3>{t.language}</h3>
                        <p>{t.languageDescription}</p>
                    </div>

                    <select
                        value={language}
                        onChange={(e) => {
                            const selectedLanguage = e.target.value
                            setLanguage(selectedLanguage)
                            localStorage.setItem('rebite-language', selectedLanguage)
                        }}
                        aria-label={t.language}
                    >
                        <option value="id">{t.indonesian}</option>
                        <option value="en">{t.english}</option>
                    </select>

                </div>
            </section>
            {isEditing && (
                <section className="profile-edit-form">
                    <h2>{t.editTitle}</h2>

                    <div className="profile-form-group">
                        <label htmlFor="profile-name">{t.name}</label>
                        <input
                            id="profile-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                        {errors.name && (
                            <p className='profile-error'>{errors.name}</p>
                        )}
                    </div>

                    <div className="profile-form-group">
                        <label htmlFor="profile-email">{t.email}</label>
                        <input
                            id="profile-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        {errors.email && (
                            <p className='profile-error'>{errors.email}</p>
                        )}
                    </div>

                    <div className="profile-form-group">
                        <label htmlFor="profile-phone">{t.phone}</label>
                        <input
                            id="profile-phone"
                            type="tel"
                            value={formData.phone}
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
                            {t.cancel}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                if (validateForm()) {
                                    const updatedProfile = {
                                        name: formData.name.trim(),
                                        email: formData.email.trim(),
                                        phone: formData.phone.trim(),
                                    }
                                    setProfile(updatedProfile)
                                    localStorage.setItem(
                                        'rebite-profile',
                                        JSON.stringify(updatedProfile)
                                    )
                                    setIsEditing(false)
                                }
                            }}
                        >
                            {t.save}
                        </button>
                    </div>
                </section>
            )}
        </main>
    );
}

export default ProfilePage;