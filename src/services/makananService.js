
const API_URL = '/makanan.json';

export async function getDaftarMakanan() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Gagal mengambil daftar makanan.');
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Format data makanan tidak valid.');
  }

  return data;
}

export async function getMakananById(id) {
  const daftarMakanan = await getDaftarMakanan();

  return (
    daftarMakanan.find(
      (makanan) => String(makanan.id) === String(id)
    ) ?? null
  );
}
