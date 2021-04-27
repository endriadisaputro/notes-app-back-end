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



/**********************************************
Same-Origin Policy
***********************************************

Server dapat menampung sebuah website, aplikasi, gambar, video, dan masih banyak lagi. 
Ketika server menampung website, mungkin beberapa data gambar, video, stylesheet biasanya diambil dari 
alamat server lain atau origin yang berbeda. Contohnya stylesheet yang diambil dari Bootstrap CDN 
ataupun gambar yang diperoleh dari server Unsplash. Hal ini wajar dan biasa dilakukan.

Namun apakah Anda tahu bahwa tidak semua data bisa diambil dari origin yang berbeda? Contohnya data 
JSON yang didapatkan melalui teknik XMLHTTPRequest atau fetch. Jika website meminta sesuatu menggunakan 
teknik tersebut dari luar origin-nya, maka permintaan tersebut akan ditolak. Itu disebabkan oleh kebijakan 
same-origin. Kasus ini terjadi pada aplikasi client dan web server yang kita buat.

Origin terdiri dari tiga hal: protokol, host, dan port number. Origin dari aplikasi client kita adalah

http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000/
Di mana protokolnya adalah http://, host-nya adalah ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com, 
dan port-nya adalah :8000.

Selama aplikasi client mengakses data dari origin yang sama, hal itu dapat dilakukan. Namun bila ada 
salah satu saja yang berbeda contohnya port 8001, maka permintaan itu akan ditolak.

Dengan begitu jelas yah, apa penyebab gagalnya aplikasi client ketika melakukan permintaan ke web server 
yang kita buat. Sudah jelas keduanya memiliki origin yang berbeda. Origin web server kita saat ini 
adalah http://localhost:5000/

Lalu, apa solusi agar keduanya dapat berinteraksi? Tenang, untungnya ada mekanisme yang dapat membuat 
mereka saling berinteraksi. Mekanisme tersebut disebut Cross-origin resource sharing (CORS). 
Pertanyaannya, bagaimana cara menerapkannya?

Cukup mudah! Pada web server, kita hanya perlu memberikan nilai header ‘Access-Control-Allow-Origin’ dengan 
nilai origin luar yang akan mengkonsumsi datanya (aplikasi client).
*/

const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
 
response.header('Access-Control-Allow-Origin', 'http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000/');
 
return response;

//Atau Anda bisa menggunakan tanda * pada nilai origin untuk memperbolehkan data dikonsumsi oleh seluruh origin.

const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
 
response.header('Access-Control-Allow-Origin', '*');
 
return response;

/*
Cukup mudah kan?

Good news! Penerapannya akan jauh lebih mudah bila Anda menggunakan Hapi. Dengan Hapi, 
CORS dapat ditetapkan pada spesifik route dengan menambahkan properti options.cors di konfigurasi route. 
Contohnya seperti ini:
*/

{
  method: 'POST',
  path: '/notes',
  handler: addNoteHandler,
  options: {
    cors: {
      origin: ['*'],
    },
  },
},

/*
Bila ingin cakupannya lebih luas alias CORS diaktifkan di seluruh route yang ada di server, 
Anda bisa tetapkan CORS pada konfigurasi ketika hendak membuat server dengan menambahkan properti routes.cors. 
Contohnya seperti ini:
*/

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

//Sudah cukup jelas? Kalo begitu, ayo kita terapkan CORS pada web server kita.


/*
Menerapkan CORS pada Web Server
Di modul ini, kita akan terapkan CORS pada cakupan server agar tak perlu lagi repot-repot mendefinisikan 
CORS pada setiap route yang ada.

Silakan buka berkas server.js, lalu tambahkan CORS pada konfigurasi pembuatan server seperti yang sudah Anda 
pelajari.
*/

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

/*
Simpan perubahan berkas server.js, pastikan server masih berjalan, dan silakan coba masukan kembali 
catatan menggunakan aplikasi client. Percayalah, sekarang harusnya bisa berjalan dengan baik.

Jika setelah memasukan catatan Anda dikembalikan ke halaman utama tanpa peringatan apa pun, 
itu artinya Anda berhasil menambahkan catatan. Selamat yah!

Tapi sayang sekali, walaupun berhasil tersimpan, catatan tersebut masih belum dapat kita lihat. 
Agar catatan dapat kita lihat, ayo kita selesaikan kriteria kedua!
*/


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


