/**********************************************
Menghapus Catatan
***********************************************

Tinggal selangkah lagi untuk memenuhi seluruh kriteria yang ada. Saatnya kita menyelesaikan kriteria terakhir, 
yakni menghapus catatan. Yuk langsung saja. 

Buka kembali berkas routes.js. Tambahkan konfigurasi route dengan nilai path ‘/notes/{id}’, method ‘DELETE’, 
dan handler dengan fungsi kosong seperti ini:
*/
{
  method: 'DELETE',
  path: '/notes/{id}',
  handler: () => {},
},

//Selanjutnya, buat fungsi handler baru dengan nama deleteNoteByIdHandler pada handler.js. 

const deleteNoteByIdHandler = (request, h) => {
 
};

/*
Setelah itu, saatnya kita menuliskan logikanya. Sama seperti mengubah catatan. Kita akan memanfaatkan index 
untuk menghapus catatan.

Pertama, kita dapatkan dulu nilai id yang dikirim melalui path parameters.
*/

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
};

//Selanjutnya, dapatkan index dari objek catatan sesuai dengan id yang didapat.

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);
};

/*
Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak menghapus catatan. 
Nah, untuk menghapus data pada array berdasarkan index, gunakan method array splice().
*/
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
};

//Bila index bernilai -1, maka kembalikan handler dengan respons gagal.

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

//Jangan lupa untuk ekspor fungsi handler yah.

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
 
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};

/*
Saatnya kita gunakan fungsi handler pada konfigurasi route. Buka berkas routes.js, 
lalu tambahkan fungsi handler-nya.
*/
{
   method: 'DELETE',
   path: '/notes/{id}',
   handler: deleteNoteByIdHandler,
},

//Jangan lupa untuk mengimpor fungsinya.

const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

/*
Simpan seluruh perubahan. Setelah itu, silakan coba lagi aplikasi client-nya. Jika semua berhasil diterapkan, 
seharusnya fitur hapus catatan sudah berfungsi dengan baik yah!

Well done! Sebuah kemajuan yang luar biasa! Siap melangkah ke tantangan berikutnya? Yuk kita lanjutkan 
perjalanannya!
*/