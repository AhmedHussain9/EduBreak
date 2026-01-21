const quizzes = {
  religious: [
    { q: "كم عدد أركان الإسلام؟", options: ["3", "4", "5", "6"], answer: 2 },
    { q: "ما أول سورة في القرآن؟", options: ["البقرة", "الفاتحة", "العلق", "الناس"], answer: 1 },
    { q: "كم عدد الصلوات المفروضة؟", options: ["3", "4", "5", "6"], answer: 2 },
    { q: "في أي شهر نصوم؟", options: ["شعبان", "رجب", "رمضان", "ذو الحجة"], answer: 2 },
    { q: "ما قبلة المسلمين؟", options: ["المدينة", "الأقصى", "مكة", "الطائف"], answer: 2 }
  ],

  culture: [
    { q: "من مؤسس المملكة العربية السعودية؟", options: ["الملك فيصل", "الملك عبدالعزيز", "الملك سعود", "الملك خالد"], answer: 1 },
    { q: "عاصمة السعودية؟", options: ["جدة", "مكة", "الرياض", "الدمام"], answer: 2 },
    { q: "لغة المملكة الرسمية؟", options: ["إنجليزية", "فرنسية", "عربية", "تركية"], answer: 2 },
    { q: "اليوم الوطني في شهر؟", options: ["أغسطس", "سبتمبر", "أكتوبر", "نوفمبر"], answer: 1 },
    { q: "رؤية السعودية؟", options: ["2030", "2025", "2040", "2050"], answer: 0 }
  ],

  education: [
    { q: "5 × 6 = ؟", options: ["11", "30", "35", "25"], answer: 1 },
    { q: "10 ÷ 2 = ؟", options: ["3", "4", "5", "6"], answer: 2 },
    { q: "7 + 8 = ؟", options: ["14", "15", "16", "17"], answer: 1 },
    { q: "9 − 4 = ؟", options: ["3", "4", "5", "6"], answer: 2 },
    { q: "2 × 8 = ؟", options: ["14", "15", "16", "18"], answer: 2 }
  ],

  fun: [
    { q: "أي حيوان ينام واقفًا؟", options: ["حصان", "قط", "أسد", "كلب"], answer: 0 },
    { q: "ما أسرع حيوان؟", options: ["فهد", "أسد", "حصان", "ذئب"], answer: 0 },
    { q: "كم أرجل العنكبوت؟", options: ["6", "8", "10", "12"], answer: 1 },
    { q: "أكبر كوكب؟", options: ["الأرض", "المريخ", "المشتري", "زحل"], answer: 2 },
    { q: "لون السماء؟", options: ["أخضر", "أحمر", "أزرق", "أصفر"], answer: 2 }
  ],

  skills: [
    { q: "أيها مهارة حياتية؟", options: ["التواصل", "النسخ", "الحفظ", "التلقين"], answer: 0 },
    { q: "العمل ضمن فريق يعني؟", options: ["التعاون", "التنافس", "الكسل", "العشوائية"], answer: 0 },
    { q: "حل المشكلات يحتاج؟", options: ["تفكير", "سرعة", "حفظ", "تلقين"], answer: 0 },
    { q: "احترام الوقت يعني؟", options: ["الالتزام", "التأخير", "النسيان", "التجاهل"], answer: 0 },
    { q: "الاستماع الجيد مهارة؟", options: ["اجتماعية", "رياضية", "لغوية", "رقمية"], answer: 0 }
  ]
};

let currentQuiz = [];
let index = 0;
let score = 0;
let timer;
let timeLeft = 15;

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const feedback = document.getElementById("feedback");
const resultPage = document.getElementById("resultPage");
const scoreText = document.getElementById("scoreText");
const finalText = document.getElementById("finalText");
const progressBar = document.getElementById("progressBar");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

function startQuiz(type) {
  currentQuiz = quizzes[type];
  index = 0;
  score = 0;
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  feedback.classList.add("hidden");
  optionsEl.innerHTML = "";

  const q = currentQuiz[index];
  questionEl.textContent = q.q;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });

  startTimer();
  updateProgress();
}

function startTimer() {
  timeLeft = 15;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      showWrong("⏰ انتهى الوقت");
    }
  }, 1000);
}

function checkAnswer(i) {
  clearInterval(timer);
  if (i === currentQuiz[index].answer) {
    score++;
    showCorrect();
  } else {
    showWrong("❌ إجابة خاطئة");
  }
}

function showCorrect() {
  correctSound.play();
  feedback.innerHTML = "😀 أحسنت! إجابة صحيحة";
  feedback.classList.remove("hidden");
  next();
}

function showWrong(text) {
  wrongSound.play();
  feedback.innerHTML = `${text}<br>🙁 حاول مرة أخرى`;
  feedback.classList.remove("hidden");
  next();
}

function next() {
  setTimeout(() => {
    index++;
    index < currentQuiz.length ? loadQuestion() : showResult();
  }, 1500);
}

function showResult() {
  quiz.classList.add("hidden");
  resultPage.classList.remove("hidden");
  winSound.play();
  finalText.textContent = "🎉 انتهى التحدي";
  scoreText.textContent = `نتيجتك: ${score} / ${currentQuiz.length}`;
}

function updateProgress() {
  progressBar.style.width = `${(index / currentQuiz.length) * 100}%`;
}
