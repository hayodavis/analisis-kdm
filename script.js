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

  const form = document.getElementById("questionsForm");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const questionsPerPage = 5;
  let currentPage = 1;
  const answers = {};

  function showQuestions(page) {
    form.innerHTML = ""; // Clear the form before adding new questions
    const startIndex = (page - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageQuestions = questions.slice(startIndex, endIndex);

    pageQuestions.forEach((question, index) => {
      const questionIndex = startIndex + index + 1;
      const label = document.createElement("label");
      label.innerText = question;

      const select = document.createElement("select");
      select.name = `question${questionIndex}`;
      select.required = true;

      const placeholder = document.createElement("option");
      placeholder.value = ""; // Empty value for placeholder
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

      if (answers[`question${questionIndex}`]) {
        select.value = answers[`question${questionIndex}`];
      }

      select.addEventListener("change", function () {
        answers[`question${questionIndex}`] = select.value;
      });

      form.appendChild(label);
      form.appendChild(select);
    });
  }

  showQuestions(currentPage);

  prevPageBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showQuestions(currentPage);
    }
  });

  nextPageBtn.addEventListener("click", function () {
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showQuestions(currentPage);
    }
  });

  document.getElementById("submitBtn").addEventListener("click", function () {
    const formData = new FormData(form);
    let kasihSayang = 0;
    let kekuasaan = 0;
    let kebebasan = 0;
    let kesenangan = 0;
    let allAnswered = true;

    for (let i = 1; i <= questions.length; i++) {
      if (!answers[`question${i}`]) {
        allAnswered = false;
        break;
      }

      const value = parseInt(answers[`question${i}`], 10);
      if (i >= 1 && i <= 10) {
        kasihSayang += value;
      } else if (i >= 11 && i <= 20) {
        kekuasaan += value;
      } else if (i >= 21 && i <= 30) {
        kebebasan += value;
      } else if (i >= 31 && i <= 40) {
        kesenangan += value;
      }
    }

    const resultDiv = document.getElementById("result");

    if (allAnswered) {
      resultDiv.innerHTML = `
              <h2>Hasil Analisis</h2>
              <p>Kasih Sayang & Rasa Diterima: ${kasihSayang}</p>
              <p>Kekuasaan: ${kekuasaan}</p>
              <p>Kebebasan: ${kebebasan}</p>
              <p>Kesenangan: ${kesenangan}</p>
          `;
    } else {
      resultDiv.innerHTML = `<h2>Error</h2><p>Pastikan semua pertanyaan telah dijawab.</p>`;
    }
  });
});
