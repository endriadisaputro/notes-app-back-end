/**********************************************
Menampilkan Catatan
***********************************************

Kita beranjak ke kriteria kedua, yakni menampilkan seluruh atau secara spesifik catatan yang disimpan pada server. 
Sepertinya kriteria ini akan lebih mudah dari kriteria sebelumnya. Kalau begitu kita langsung saja yah.

Pertama, kita buat konfigurasi route terlebih dahulu pada berkas routes.js. Tetapkan path dengan nilai ‘/notes’ 
dan method dengan nilai ‘GET’. Untuk handler, kita berikan dulu fungsi kosong.
*/
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: () => {},
  },
];

/*
Lanjut kita buat fungsi handler-nya pada berkas handler.js. Buat fungsi dengan nama getAllNotesHandler dan 
kembalikan data dengan nilai notes di dalamnya.
*/

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

/*
Yap! Semudah itu untuk handler mendapatkan seluruh catatan. Anda juga tidak perlu menuliskan parameter request 
dan h karena ia tidak digunakan.

Jangan lupa untuk ekspor nilai getAllNotesHandler agar dapat digunakan di routes.js
*/

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});
 
module.exports = { addNoteHandler, getAllNotesHandler };

//Kembali ke berkas routes.js. Gunakan fungsi handler tersebut pada konfigurasi route.

 {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
 },

//Jangan lupa untuk mengimpornya yah.

const { addNoteHandler, getAllNotesHandler } = require('./handler');

/*
Simpan seluruh perubahan yang ada, dan coba kembali buka aplikasi client.

2021030812044570a5d6970738e1048b22e1db9bef10ab.png

Wah ada pesan baru. “Please try to add some note(s)”. Sepertinya ini akan berhasil, 
silakan coba masukan note baru.

2021030812050794eee45f1301141c15505173411e7365.png

Voila! Akhirnya catatan yang kita masukan tampak yah. Coba masuk ke halaman detail dengan memilih catatan 
tersebut.

20210308120534bafec8722455cf56611d5875f207fd80.png

Yah, eror lagi. Tentu, karena kita belum membuat route untuk mendapatkan catatan secara spesifik. 
Ayo kita selesaikan juga.

Kembali ke berkas routes.js, kemudian tambahkan route dengan path ‘/notes/{id}’ dan method ‘GET’.
Untuk handler isi dengan fungsi kosong dulu.
*/
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: () => {},
  },
];

//Lanjut kita buat fungsi handler-nya. Buka berkas handler.js, lalu buat fungsi dengan nama getNoteByIdHandler.

const getNoteByIdHandler = (request, h) => {
 
};

/*
Di dalam fungsi ini kita harus mengembalikan objek catatan secara spesifik berdasarkan id yang digunakan oleh 
path parameter.

Pertama, kita dapatkan dulu nilai id dari request.params.
*/

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
};

/*
Setelah mendapatkan nilai id, dapatkan objek note dengan id tersebut dari objek array notes. 
Manfaatkan method array filter() untuk mendapatkan objeknya.
*/
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const note = notes.filter((n) => n.id === id)[0];
};

/*
Kita kembalikan fungsi handler dengan data beserta objek note di dalamnya. Namun sebelum itu, 
pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal.
*/
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const note = notes.filter((n) => n.id === id)[0];
 
 if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

//Fungsi handler selesai! Jangan lupa ekspor fungsinya.

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const note = notes.filter((n) => n.id === id)[0];
 
 if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};
 
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };

//Lanjut gunakan fungsi tersebut pada konfigurasi route di berkas routes.js.

{
  method: 'GET',
  path: '/notes/{id}',
  handler: getNoteByIdHandler,
},
\
//Jangan lupa untuk impor juga yah.

const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require('./handler');

/*
Simpan seluruh perubahan yang ada dan coba kembali aplikasi client-nya.

Dalam mencobanya, mungkin Anda perlu menambahkan kembali notes karena kita hanya menyimpannya di array. 
Di mana data tersebut akan hilang setiap kali server dijalankan ulang oleh nodemon.

20210308120925acf49ea62ea28231bf5d61243bc387ad.png

Well done! Sekarang aplikasi sudah bisa menampilkan detail catatan. Di mana di halaman ini ada 
tombol “Edit Note”. Bila menekan tombol tersebut, kita akan diarahkan ke halaman edit note. 
Tapi halaman tersebut masih belum berfungsi. Nah, pada materi selanjutnya kita akan buat halaman tersebut 
berfungsi yah.
*/
