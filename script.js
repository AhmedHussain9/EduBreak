const quizzes = {
  religious: [
    { q: "كم عدد أركان الإسلام؟", o: ["4", "5", "6", "7"], a: 1 },
    { q: "ما أول سورة في القرآن؟", o: ["البقرة", "الفاتحة", "العلق", "الناس"], a: 1 },
    { q: "كم عدد الصلوات المفروضة؟", o: ["3", "4", "5", "6"], a: 2 },
    { q: "في أي شهر نصوم؟", o: ["رجب", "شعبان", "رمضان", "ذو الحجة"], a: 2 },
    { q: "ما قبلة المسلمين؟", o: ["المدينة", "الأقصى", "مكة", "الطائف"], a: 2 }
  ],
  culture: [
    { q: "مؤسس المملكة العربية السعودية؟", o: ["فيصل", "عبدالعزيز", "سعود", "خالد"], a: 1 },
    { q: "عاصمة السعودية؟", o: ["جدة", "الرياض", "مكة", "الدمام"], a: 1 },
    { q: "اليوم الوطني في شهر؟", o: ["أغسطس", "سبتمبر", "أكتوبر", "نوفمبر"], a: 1 },
    { q: "رؤية السعودية؟", o: ["2025", "2030", "2040", "2050"], a: 1 },
    { q: "لغة المملكة الرسمية؟", o: ["إنجليزية", "فرنسية", "عربية", "تركية"], a: 2 }
  ],
  education: [
    { q: "6 × 7 = ؟", o: ["36", "42", "48", "56"], a: 1 },
    { q: "9 + 8 = ؟", o: ["15", "16", "17", "18"], a: 2 },
    { q: "20 ÷ 4 = ؟", o: ["4", "5", "6", "7"], a: 1 },
    { q: "15 − 6 = ؟", o: ["7", "8", "9", "10"], a: 2 },
    { q: "8 × 5 = ؟", o: ["35", "40", "45", "50"], a: 1 }
  ],
  fun: [
    { q: "أسرع حيوان؟", o: ["أسد", "فهد", "حصان", "ذئب"], a: 1 },
    { q: "كم أرجل العنكبوت؟", o: ["6", "8", "10", "12"], a: 1 },
    { q: "أكبر كوكب؟", o: ["الأرض", "زحل", "المشتري", "المريخ"], a: 2 },
    { q: "لون السماء؟", o: ["أخضر", "أزرق", "أحمر", "أسود"], a: 1 },
    { q: "أصغر كوكب؟", o: ["الأرض", "عطارد", "المريخ", "زحل"], a: 1 }
  ],
  skills: [
    { q: "مهارة التواصل تعني؟", o: ["الاستماع", "الكسل", "التأخير", "التجاهل"], a: 0 },
    { q: "العمل الجماعي هو؟", o: ["تنافس", "تعاون", "فوضى", "كسل"], a: 1 },
    { q: "إدارة الوقت تعني؟", o: ["تنظيم", "تأجيل", "تجاهل", "نسيان"], a: 0 },
    { q: "حل المشكلات يحتاج؟", o: ["حفظ", "تفكير", "نسخ", "عشوائية"], a: 1 },
    { q: "الاستماع الجيد مهارة؟", o: ["رياضية", "اجتماعية", "رقمية", "يدوية"], a: 1 }
  ]
};

let quiz = [];
let i = 0;
let score = 0;
let timer;
let time = 15;

const home = document.getElementById("home");
const quizBox = document.getElementById("quiz");
const question = document.getElementById("question");
const options = document.getElementById("options");
const timeEl = document.getElementById("time");
const feedback = document.getElementById("feedback");
const resultPage = document.getElementById("resultPage");
const scoreText = document.getElementById("scoreText");
const progressBar = document.getElementById("progressBar");

function startQuiz(type) {
  quiz = quizzes[type];
  i = 0;
  score = 0;
  home.classList.add("hidden");
  quizBox.classList.remove("hidden");
  load();
}

function load() {
  clearInterval(timer);
  feedback.classList.add("hidden");
  options.innerHTML = "";

  const q = quiz[i];
  question.textContent = q.q;

  q.o.forEach((opt, idx) => {
    const b = document.createElement("button");
    b.textContent = opt;
    b.className = "option-btn";
    b.onclick = () => answer(idx);
    options.appendChild(b);
  });

  startTimer();
  progressBar.style.width = `${(i / quiz.length) * 100}%`;
}

function startTimer() {
  time = 15;
  timeEl.textContent = time;
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      wrong("⏰ انتهى الوقت");
    }
  }, 1000);
}

function answer(idx) {
  clearInterval(timer);
  idx === quiz[i].a ? correct() : wrong("❌ إجابة خاطئة");
}

function correct() {
  score++;
  document.getElementById("correctSound").play();
  feedback.innerHTML = "😀 أحسنت!";
  feedback.classList.remove("hidden");
  next();
}

function wrong(msg) {
  document.getElementById("wrongSound").play();
  feedback.innerHTML = msg + "<br>🙁 حاول مرة أخرى";
  feedback.classList.remove("hidden");
  next();
}

function next() {
  setTimeout(() => {
    i++;
    if (i < quiz.length) {
      load();
    } else {
      feedback.classList.add("hidden");
      setTimeout(showResult, 400);
    }
  }, 1500);
}

function showResult() {
  quizBox.classList.add("hidden");
  resultPage.classList.remove("hidden");
  document.getElementById("winSound").play();
  scoreText.textContent = `نتيجتك: ${score} / ${quiz.length}`;
}

function showTeacher() {
  home.classList.add("hidden");
  document.getElementById("teacher").classList.remove("hidden");
}

function suggest() {
  const t = document.getElementById("lessonTime").value;
  document.getElementById("result").textContent =
    t == 10 ? "نشاط ثقافي سريع" :
    t == 20 ? "مسابقة تعليمية" :
    "نشاط مهاري جماعي";
}
