document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "Saya senang berteman",
    "Mudah bagi saya berbicara dengan siapapun",
    "Saya suka mengobrol lewat telepon",
    "Saya suka bekerja dengan orang lain",
    "Saya menghabiskan banyak waktu dengan orang lain",
    "Saya ingin orang-orang menyukai saya",
    "Saya ingin membuat orang-orang bangga dengan saya",
    "Apa yang teman teman saya pikir tentang saya itu penting",
    "Saya lebih suka bekerja sama daripada bekerja sendiri",
    "Saya senang bertemu orang orang baru",
    "Saya tidak suka membuat kesalahan",
    "Saya suka melihat orang lain sebelum saya mencoba hal baru",
    "Saya tidak suka perubahan",
    "Saya ingin ruang kerja atau meja kerja saya rapi",
    "Saya ingin terlihat sangat baik dengan apa yang saya lakukan",
    "Penampilan saya sangat penting bagi saya",
    "Saya takut mencoba hal hal baru",
    "Saya suka menjadi benar",
    "Saya suka menyelenggarakan aktivitas",
    "Jika tidak suka sesuatu berjalan tidak sesuai keinginan saya",
    "Saya suka memiliki pilihan",
    "Saya adalah orang yang aktif",
    "Duduk di sekolah adalah hal yang sulit untuk saya",
    "Saya tidak suka membaca dalam jangka waktu lama",
    "Saya senang mencoba hal hal baru",
    "Saya akan bermain sendiri jika saya mau",
    "Apa yang saya pakai tidak berpengaruh bagi saya",
    "Saya tetap akan melakukan suatu hal walau teman teman saya tidak suka",
    "Saya tidak suka disuruh–suruh",
    "Kerapian tidak berpengaruh bagi saya",
    "Saya sering tertawa",
    "Saya memiliki koleksi",
    "Saya senang memberitahu lelucon",
    "Saya senang membuat orang lain tertawa",
    "Orang berpikir saya bodoh",
    "Saya suka bermain macam-macam permainan",
    "Menurut saya ada banyak hal yang lucu",
    "Menurut saya sekolah menyenangkan",
    "Saya suka bernyanyi/menari saat musik bermain",
    "Orang pikir saya lucu",
  ];

  const form = document.getElementById("needsForm");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const questionsPerPage = 5; // Ubah jumlah pertanyaan per halaman sesuai kebutuhan
  let currentPage = 1;

  // Fungsi untuk menampilkan pertanyaan pada halaman tertentu
  function showQuestions(page) {
    form.innerHTML = ""; // Bersihkan formulir sebelum menambahkan pertanyaan baru
    const startIndex = (page - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageQuestions = questions.slice(startIndex, endIndex);

    pageQuestions.forEach((question, index) => {
      const label = document.createElement("label");
      label.innerText = question;

      const select = document.createElement("select");
      select.name = `question${startIndex + index + 1}`;
      select.required = true;

      const placeholder = document.createElement("option");
      placeholder.value = ""; // Nilai placeholder kosong
      placeholder.innerText = "Pilih jawaban";
      placeholder.disabled = true;
      placeholder.selected = true;

      select.appendChild(placeholder);

      const options = [
        { text: "Tidak Benar", value: 1 },
        { text: "Kadang-kadang", value: 3 },
        { text: "Sangat Benar", value: 5 },
      ];

      options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.innerText = option.text;
        select.appendChild(opt);
      });

      form.appendChild(label);
      form.appendChild(select);
    });
  }

  // Tampilkan pertanyaan untuk halaman pertama saat memuat
  showQuestions(currentPage);

  // Fungsi untuk menavigasi ke halaman sebelumnya
  prevPageBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showQuestions(currentPage);
    }
  });

  // Fungsi untuk menavigasi ke halaman berikutnya
  nextPageBtn.addEventListener("click", function () {
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showQuestions(currentPage);
    }
  });

  // Fungsi untuk menghitung skor dan menampilkan hasil analisis
  document.getElementById("submitBtn").addEventListener("click", function () {
    const formData = new FormData(form);
    const scores = {
      kasihSayang: 0,
      kekuasaan: 0,
      kebebasan: 0,
      kesenangan: 0,
    };
    let allAnswered = true;

    for (let [key, value] of formData.entries()) {
      if (value === "") {
        // Jika placeholder terpilih, anggap belum diisi
        allAnswered = false;
        break;
      }

      // Perhitungan skor berdasarkan kelompok pertanyaan
      const questionNumber = parseInt(key.replace("question", ""), 10);
      if (questionNumber >= 1 && questionNumber <= 10) {
        scores.kasihSayang += parseInt(value, 10);
      } else if (questionNumber >= 11 && questionNumber <= 20) {
        scores.kekuasaan += parseInt(value, 10);
      } else if (questionNumber >= 21 && questionNumber <= 30) {
        scores.kebebasan += parseInt(value, 10);
      } else if (questionNumber >= 31 && questionNumber <= 40) {
        scores.kesenangan += parseInt(value, 10);
      }
    }

    const resultDiv = document.getElementById("result");

    // Menampilkan hasil analisis berdasarkan kelompok pertanyaan
    if (allAnswered) {
      resultDiv.innerHTML = `
            <h2>Hasil Analisis</h2>
            <p>Kasih Sayang & Rasa Diterima: ${scores.kasihSayang}</p>
            <p>Kekuasaan: ${scores.kekuasaan}</p>
            <p>Kebebasan: ${scores.kebebasan}</p>
            <p>Kesenangan: ${scores.kesenangan}</p>
          `;
    } else {
      resultDiv.innerHTML = `<h2>Error</h2><p>Pastikan semua pertanyaan telah dijawab.</p>`;
    }
  });
});
