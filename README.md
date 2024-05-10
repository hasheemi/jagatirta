# Jagatirta: Website Sistem Informasi Pemantauan Mata Air Indonesia

Jagatirta adalah sebuah website sistem informasi yang dirancang untuk membantu masyarakat dan pemerintah dalam memantau dan mengawasi pencemaran air di Indonesia. Website ini menyediakan berbagai fitur, termasuk:

- Peta interaktif: Menampilkan data lokasi sumber air di Indonesia, beserta tingkat pencemarannya. Fitur ini juga dapat kalian gunakan sebagai referensi tempat wisata.
- Berita dan artikel edukasi: Memberikan informasi tentang pemanfaatan dan perawatan sumber air yang berkelanjutan. Mengedukasi masyarakat terkait pentingnya menjaga sumber air dari pencemaran.
- Laporan pencemaran air: Masyarakat dapat melaporkan kejadian pencemaran air yang mereka temukan melalui website ini.

## Endpoint url

Website Jagatirta menyediakan beberapa endpoint API yang dapat digunakan untuk mengakses data dan informasi secara terprogram. Berikut adalah beberapa endpoint utama:

- `/` (Halaman Utama): Menampilkan informasi umum tentang Jagatirta, termasuk statistik pencemaran air dan berita terbaru.
- `/maps` (Peta): Menampilkan peta interaktif sumber air di Indonesia, dengan filter berdasarkan tingkat pencemaran, jenis sumber air, dan wilayah.
- `/blog` (Blog): Menampilkan daftar berita dan artikel edukasi terkait pemanfaatan dan perawatan sumber air.
- `/login`: Untuk masuk ke dashboard anda harus login terlebih dahulu melalui mekanisme google auth, data anda akan aman
- `/dashboard`: Disini anda dapat mulai menambahkan tempat sumber mata air dan mulai menulis artikel / berita edukasi

## Pembuatan

Website ini dibuat menggunakan `node.js` dengan framework `express.js` oleh tim `Astrea Grand` uuntuk mengikuti lomba `FindIT` yang diselenggarakan oleh Universitas Gadjah Mada
