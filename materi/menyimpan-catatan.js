/**********************************************
Menyimpan Catatan
***********************************************
Mari kita selesaikan kriteria satu per satu. Kriteria pertama adalah web server harus bisa menyimpan catatan 
yang ditambahkan dari aplikasi client. Untuk detailnya, tentu Anda sudah tahu kan?

Saat ini, aplikasi client belum bisa menambahkan catatan. Anda bisa coba sendiri melalui tombol “Add note” 
di pojok kiri bawah halaman. Ketika Anda hendak menambahkan catatan, browser akan menampilkan pesan seperti 
gambar di bawah ini.

20210308111703ce9eab461d834befc6dcff58383862f4.png

Tugas kita saat ini adalah membuat fungsi menyimpan catatan bisa berjalan dengan baik. Yuk langsung saja.

Dari kriteria yang sudah kita ketahui sebelumnya, agar web server dapat menyimpan catatan, 
ia perlu menyediakan route dengan path ‘/notes’ dan method ‘POST’. Karena itu, ayo kita langsung saja buat 
route-nya.

Silakan buka berkas routes.js dan tuliskan kode route pertama kita sesuai dengan ketentuan.
*/
routes.js
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: () => {},
  },
];
 
module.exports = routes;

/*
Untuk fungsi handler, kita akan membuatnya pada berkas yang terpisah. Untuk sekarang, isi dulu dengan nilai 
fungsi kosong seperti itu.

Jangan lupa untuk menuliskan module.exports = routes, agar routes dapat digunakan oleh berkas server.js nantinya.

Sebelum menuliskan fungsi handler, mari kita buat dulu array untuk menampung objek catatan pada berkas 
notes.js. Tulislah kode berikut:
*/

//notes.js
const notes = [];
 
module.exports = notes;

/*
Jangan lupa untuk ekspor juga nilainya.

Lanjut kita buat fungsi handler untuk route ini. Silakan buka berkas handler.js dan buat fungsi 
dengan nama “addNoteHandler”.
*/

const addNoteHandler = (request, h) => {
 
};

/*
Masih ingatkan bahwa fungsi handler pada Hapi memiliki dua parameters? Jadi, jangan lupa untuk menambahkan 
parameter tersebut setiap kali membuat fungsi handler.

Lalu untuk mengekspor fungsi handler ini, kita gunakan objek literals yah. Ini bertujuan untuk memudahkan 
ekspor lebih dari satu nilai pada satu berkas JavaScript.
*/
const addNoteHandler = (request, h) => {
 
};
 
module.exports = { addNoteHandler };

/*
Langkah selanjutnya, mari kita tuliskan logika untuk menyimpan catatan dari client ke dalam array notes.

Client mengirim data catatan (title, tags, dan body) yang akan disimpan dalam bentuk JSON melalui body request. 
Masih ingatkan cara mendapatkan body request di Hapi? Yap! Menggunakan properti request.payload. 
Yuk mari kita ambil datanya.
*/
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
};

//Selain itu, objek notes yang perlu kita simpan harus memiliki struktur seperti ini:

{
 id: string,
 title: string,
 createdAt: string,
 updatedAt: string,
 tags: array of string,
 body: string,
},

/*
Kita hanya mendapatkan nilai title, tags, dan body dari client, itu berarti sisanya kita perlu olah sendiri. 
Mari kita pikirkan dari properti id dulu.

Kriteria menyebutkan, properti id merupakan string dan harus unik, kita akan menggunakan bantuan library 
pihak ketiga untuk menghasilkan nilainya. nanoid merupakan salah satu library yang populer untuk menangani ini. 
Jadi, silakan pasang library tersebut dengan perintah.

npm install nanoid

Untuk menggunakannya cukup mudah, kita hanya perlu memanggil method nanoid() dan memberikan parameter number 
yang merupakan ukuran dari string-nya.
*/

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
 
  const id = nanoid(16);
};
Jangan lupa untuk import nanoid dari package-nya.

const { nanoid } = require('nanoid');
 
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
 
  const id = nanoid(16);
};

/*
Nice! Sekarang kita sudah memiliki nilai untuk properti id. 

Selanjutnya properti createdAt dan updatedAt. Karena kasus sekarang adalah menambahkan catatan baru, 
maka nilai kedua properti tersebut seharusnya sama. Jadi, kita bisa secara mudah memberikan 
nilai new Date().toISOString();.
*/
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
 
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
};

/*
Kita sudah memiliki properti dari objek catatan secara lengkap. Sekarang, saatnya kita masukan nilai-nilai 
tersebut ke dalam array notes menggunakan method push().
*/

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
 
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
 
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);
};

//Jangan lupa impor array notes pada berkas handler.js.

const { nanoid } = require('nanoid');
const notes = require('./notes');
 
const addNoteHandler = (request, h) => {
 const { title, tags, body } = request.payload;
 
 const id = nanoid(16);
 const createdAt = new Date().toISOString();
 const updatedAt = createdAt;
 
 const newNote = {
   title, tags, body, id, createdAt, updatedAt,
 };
 
 notes.push(newNote);
};

/*
Lalu, bagaimana menentukan apakah newNote sudah masuk ke dalam array notes? Mudah saja! Kita bisa 
memanfaatkan method filter() berdasarkan id catatan untuk mengetahuinya. Kurang lebih implementasinya 
seperti ini:
*/

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
 
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
 
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
 
  notes.push(newNote);
 
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
};

/*
Kemudian, kita gunakan isSuccess untuk menentukan respons yang diberikan server. Jika isSuccess bernilai true, 
maka beri respons berhasil. Jika false, maka beri respons gagal.
*/

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
 
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
 
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
 
  notes.push(newNote);
 
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
 
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

/*
Fungsi handler selesai! Huft, panjang juga yah untuk menyelesaikan kriteria pertama. Eits! Ini belum berakhir, 
perjalanan kita masih cukup jauh. Kita harus tetap semangat!

Selanjutnya, mari kita gunakan fungsi handler ini pada konfigurasi route-nya. Silakan buka routes.js, 
lalu ganti fungsi handler menjadi seperti ini:
*/

{
  method: 'POST',
  path: '/notes',
  handler: addNoteHandler,
},

//Jangan lupa import fungsi addNoteHandler-nya pada berkas routes.js.

const { addNoteHandler } = require('./handler');

/*
Setelah itu, mari gunakan route configuration pada server. Silakan buka berkas server.js, 
kemudian tambahkan kode yang diberi tanda tebal yah.
*/

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });
 
  server.route(routes);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();

/*
Terakhir, simpan seluruh perubahan pada semua berkas JavaScript yang ada. Kemudian, coba kembali akses 
fitur tambah catatan pada aplikasi client. Apakah sekarang sudah berfungsi?

20210308112614acf3e8869fdffae945ab152df092dbe1.png

Wah! Ternyata masih saja eror. Jika dilihat dari pesan erornya, kita perlu melihat console browser. 
Buka console browser dengan menekan CTRL + SHIFT + I dan Anda akan melihat pesan eror di sana.

2021030811264333bcc2a5742a50a9a8d58d65b9baaaab.png

Oh ternyata permintaan client gagal dilakukan karena dihalangi oleh same-origin policy. 
Apa itu? Bagaimana cara menanganinya? Hmm, sabar yah! Kita hentikan sejenak praktik ini dan mari bahas 
same-origin policy terlebih dahulu. 
*/

