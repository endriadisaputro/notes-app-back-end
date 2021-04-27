/**********************************************
Mengubah Catatan
***********************************************

Dua kriteria sudah terpenuhi, kini sebagian dari fitur aplikasi sudah dapat digunakan. Hanya tinggal sedikit 
lagi perjalanan kita untuk melengkapi fungsionalitasnya. Sudah siap menyelesaikan kriteria ketiga? Ayo kita mulai.

Kriteria ketiga adalah web server harus bisa mengubah catatan yang disimpan, baik perubahan pada title, tags, 
atau body. Ketika melakukan perubahan, client akan mengirimkan permintaan ke route ‘/notes/{id}’ dengan 
method ‘PUT’ dan membawa objek catatan terbaru pada body request. Yuk langsung saja kita eksekusi.

Seperti biasa, kita awali dengan membuat konfigurasi route-nya dulu. Silakan buka kembali berkas routes.js, 
lalu buat route dengan path ‘/notes/{id}’, method ‘PUT’,  dan handler dengan nilai fungsi kosong.
*/
{
  method: 'PUT',
  path: '/notes/{id}',
  handler: () => {},
},

/*
Yuk kita buat fungsi handler-nya pada berkas handler.js. Kita beri nama fungsi tersebut dengan 
editNoteByIdHandler ya.
*/
const editNoteByIdHandler = (request, h) => {
  
};

/*
Catatan yang diubah akan diterapkan sesuai dengan id yang digunakan pada route parameter. 
Jadi, kita perlu mendapatkan nilai id-nya terlebih dahulu.
*/

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
};

//Setelah itu, kita dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
};

/*
Selain itu, tentu kita perlu perbarui juga nilai dari properti updatedAt. Jadi, dapatkan nilai terbaru dengan 
menggunakan new Date().toISOString().
*/
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
};

/*
Great! Data terbaru sudah siap, saatnya mengubah catatan lama dengan data terbaru. Kita akan mengubahnya 
dengan memanfaatkan indexing array, silakan gunakan teknik lain bila menurut Anda lebih baik yah.

Pertama, dapatkan dulu index array pada objek catatan sesuai id yang ditentukan. Untuk melakukannya, 
gunakanlah method array findIndex().
*/
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = notes.findIndex((note) => note.id === id);
};

/*
Bila note dengan id yang dicari ditemukan, maka index akan bernilai array index dari objek catatan yang dicari. 
Namun bila tidak ditemukan, maka index bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan 
dari nilai index menggunakan if else.
*/

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

//Fungsi handler selesai! Jangan lupa export fungsinya.

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
 
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
 
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
};

//Sekarang kita gunakan fungsinya pada route yah.

{
  method: 'PUT',
  path: '/notes/{id}',
  handler: editNoteByIdHandler,
},
Jangan lupa impor fungsinya.

const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
} = require('./handler');

/*
Simpan seluruh perubahan, kemudian silakan coba kembali aplikasi catatannya. Seharusnya fungsi edit sudah bisa 
digunakan yah. 
*/
