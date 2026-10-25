import defaultAvatar from '../assets/default-avatar.png'
import '../styles/ProfilePage.css'
import Navbar from '../components/navbar';
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
        avatarAlt: 'Foto profil pengguna',
        accessibility: 'Aksesibilitas',
        textSize: 'Ukuran Teks',
        textSizeDescription: 'Sesuaikan ukuran teks agar lebih mudah dibaca.',
        normal: 'Normal',
        large: 'Besar',
        extraLarge: 'Ekstra Besar',
        profilePhoto: 'Foto Profil',
        imageHint: 'Format gambar, maksimal 2MB.',
        invalidImage: 'Pilih gambar yang valid.',
        imageTooLarge: 'Ukuran foto maksimal 2MB.',
        imageReadError: 'Gagal membaca gambar. Coba pilih gambar lain.',
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
        avatarAlt: 'User profile photo',
        accessibility: 'Accessibility',
        textSize: 'Text Size',
        textSizeDescription: 'Adjust the text size for easier reading.',
        normal: 'Normal',
        large: 'Large',
        extraLarge: 'Extra Large',
        profilePhoto: 'Profile Photo',
        imageHint: 'Image files only, maximum 2MB.',
        invalidImage: 'Please select a valid image.',
        imageTooLarge: 'Photo size must not exceed 2MB.',
        imageReadError: 'Failed to read image. Please try another image.'
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
    const [avatar, setAvatar] = useState(() => {
        return localStorage.getItem('rebite-avatar') || defaultAvatar
    })
    const [draftAvatar, setDraftAvatar] = useState(null)

    const [errors, setErrors] = useState({})
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('rebite-language') || 'id'
    })

    const [textSize, setTextSize] = useState(() => {
        return localStorage.getItem('rebite-text-size') || 'normal'
    })

    const t = translations[language]

    const handleAvatarChange = (event) => {
        const file = event.target.files[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            alert(t.invalidImage)
            event.target.value = ''
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            alert(t.imageTooLarge)
            event.target.value = ''
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setDraftAvatar(reader.result)
            } else {
                alert(t.imageReadError)
                event.target.value = ''
            }
        }

        reader.onerror = () => {
            alert(t.imageReadError)
            event.target.value = ''
        }

        reader.readAsDataURL(file)
    }



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
        <>
        <Navbar />
        <main className={`profile-page text-size-${textSize}`}>
            <h1>{t.title}</h1>
            <p>{t.description}</p>

            <section className='profile-card'>
                <div className='profile-info'>
                    <img
                        src={draftAvatar || avatar}
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
            <section className="profile-settings">
                <h2>{t.accessibility}</h2>

                <div className="profile-setting-item">
                    <div>
                        <h3>{t.textSize}</h3>
                        <p>{t.textSizeDescription}.</p>
                    </div>

                    <select
                        value={textSize}
                        onChange={(e) => {
                            const selectedSize = e.target.value
                            setTextSize(selectedSize)
                            localStorage.setItem('rebite-text-size', selectedSize)
                        }}
                        aria-label="Text Size"
                    >
                        <option value="normal">{t.normal}</option>
                        <option value="large">{t.large}</option>
                        <option value="extra-large">{t.extraLarge}</option>
                    </select>
                </div>
            </section>
            {isEditing && (
                <section className="profile-edit-form">
                    <h2>{t.editTitle}</h2>

                    <div className='profile-form-group'>
                        <label htmlFor="profile-avatar">{t.profilePhoto}</label>
                        <input
                            id="profile-avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                        <p className='profile-hint'>{t.imageHint}</p>
                    </div>
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
                                setDraftAvatar(null)
                                setErrors({})
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

                                    if (draftAvatar) {
                                        localStorage.setItem('rebite-avatar', draftAvatar)
                                        setAvatar(draftAvatar)
                                    }

                                    setDraftAvatar(null)
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
        </>
    );
}

export default ProfilePage;