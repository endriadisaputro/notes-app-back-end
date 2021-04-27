/**********************************************
Struktur Proyek
***********************************************

Sebelum praktik langsung, ada baiknya untuk menyusun struktur proyek terlebih dahulu agar pengembangan mudah 
dilakukan. 

Pada pengembangan web server kali ini, kita tidak ingin semua kode dituliskan dalam satu berkas saja sebab itu 
akan membuat kode menjadi semrawut, susah dibaca, apalagi dipelihara. Karena Anda sudah belajar teknik 
modularisasi pada Node.js, tentu tak ada masalah untuk memisahkan kode JavaScript menjadi beberapa berkas.

Kami memegang prinsip single responsibility approach. Artinya, kita gunakan satu berkas JavaScript untuk satu 
tujuan saja. Nah, di proyek kali ini, kita akan membuat setidaknya empat buah berkas JavaScript. 
Apa saja berkas dan kode yang dituliskan di dalamnya? Mari kita rincikan.

server.js : Memuat kode untuk membuat, mengonfigurasi, dan menjalankan server HTTP menggunakan Hapi.
routes.js : Memuat kode konfigurasi routing server seperti menentukan path, method, dan handler yang digunakan.
handler.js : Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.
notes.js : Memuat data notes yang disimpan dalam bentuk array objek.

Semua berkas JavaScript yang kita buat akan disimpan di dalam folder src. Hal ini bertujuan agar terpisah dari 
berkas konfigurasi proyek seperti .eslintrc.json, package.json, package-lock.json, dan node_modules.

Jadi secara keseluruhan struktur proyek akan tampak seperti ini:

notes-app-back-end
├── node_modules
├── src
│ ├── handler.js
│ ├── notes.js
│ ├── routes.js
│ └── server.js
├── .eslintrc.json
├── package-lock.json
└── package.json

Yuk, kita langsung buat saja folder src beserta berkas JavaScript yang dibutuhkan di dalamnya. 
Untuk berkas server.js, Anda tidak perlu membuat baru, cukup pindahkan berkas lama ke dalam folder src ya.

Setelah itu, struktur proyek kita sudah sesuai yah.

202103081041534ae30b8e967a14ec6299c36682dc0755.png

Karena berkas server.js sekarang berada di dalam folder src, jangan lupa ubah alamat berkas tersebut pada 
npm runner script di berkas package.json. Silakan buka berkas tersebut dan sesuaikan nilai di dalam scripts 
menjadi seperti ini:
*/

"scripts": {
  "start": "nodemon ./src/server.js",
  "lint": "eslint ./src"
}, 

/*
Membuat HTTP Server
Mari kita mulai dengan membuat HTTP server menggunakan Hapi framework.

Silakan pasang package @hapi/hapi dengan mengeksekusi perintah berikut pada Terminal proyek:

npm install @hapi/hapi

Lanjut, buka berkas server.js dan ganti kode yang ada dengan kode dalam membuat server menggunakan Hapi seperti 
pada latihan sebelumnya.
*/

//server.js
const Hapi = require('@hapi/hapi');
 
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });
 
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();

/*
Anda sudah familier dengan kodenya kan? Silakan simpan perubahan kode pada berkas server.js, lalu jalankan 
server dengan nodemon melalui perintah npm run start.


Biarkan nodemon tetap berjalan agar bila terjadi perubahan kode, kita tidak perlu menjalankan ulang server.

Silakan buka browser dan coba akses url http://localhost:5000. Jika pada browser tampak seperti ini:


Itu berarti server HTTP sudah terbuat dan berjalan.

Sampai di sini Anda sudah bisa menghubungkan alamat localhost:5000 (web server) dengan aplikasi client. 
Silakan pilih “Change URL”.


Lalu, isi dengan host beserta port dari web server yang Anda buat. Contohnya “localhost:5000”


Setelah Anda melihat URL dari web server, maka web server dan aplikasi client sudah terhubung.


Meskipun sudah terhubung, tapi halaman masih menampilkan “Error displaying notes! 
Make sure you have done with the back-end or correct url.” Hal itu wajar karena kita belum melakukan apa pun 
terhadap web server yang kita buat.

Jika Anda menggunakan ESLint, ada satu hal yang perlu diperhatikan. Bila ada warning atau error yang diberikan 
oleh ESLint namun hal itu tidak Anda setujui atau ingin Anda hiraukan, maka Anda bisa menonaktifkan warning 
atau eror tersebut.

Contohnya, bila Anda menggunakan code style AirBnB, maka penggunaan console akan dianggap warning.


Anda bisa menonaktifkan aturan no-console pada berkas .eslintrc.json dengan menambahkan properti no-console 
dengan nilai off pada rules.
*/

.eslintrc.json
{
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "no-console": "off"
    }
}

//Dengan begitu, warning dari ESLint akan hilang untuk penggunaan console.
