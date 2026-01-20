let currentQuiz = [];
let index = 0;

const quizzes = {
  religion: [
    {
      q: "ما السورة التي لا تبدأ بالبسملة؟",
      a: ["الأنفال", "التوبة", "النساء", "الفتح"],
      c: 1
    },
    {
      q: "كم عدد مصارف الزكاة؟",
      a: ["6", "7", "8", "9"],
      c: 2
    }
  ],
  culture: [
    {
      q: "من هو مؤسس علم الاجتماع؟",
      a: ["أفلاطون", "ابن خلدون", "أرسطو", "ديكارت"],
      c: 1
    },
    {
      q: "ما عاصمة كندا؟",
      a: ["تورنتو", "مونتريال", "أوتاوا", "فانكوفر"],
      c: 2
    }
  ],
  general: [
    {
      q: "ما العنصر الذي يرمز له O؟",
      a: ["ذهب", "أكسجين", "فضة", "هيدروجين"],
      c: 1
    }
  ]
};

function openQuiz(type) {
  currentQuiz = quizzes[type];
  index = 0;
  showSection("quiz");
  loadQuestion();
}

function loadQuestion() {
  const q = currentQuiz[index];
  document.getElementById("question").innerText = q.q;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => checkAnswer(i, btn);
    answers.appendChild(btn);
  });
}

function checkAnswer(i, btn) {
  const soundWin = document.getElementById("winSound");
  const soundLose = document.getElementById("loseSound");

  if (i === currentQuiz[index].c) {
    btn.classList.add("correct");
    soundWin.play();
  } else {
    btn.classList.add("wrong");
    soundLose.play();
  }
}

function nextQuestion() {
  index++;
  if (index < currentQuiz.length) {
    loadQuestion();
  } else {
    alert("🎉 انتهت الأسئلة!");
    goHome();
  }
}

function openSuggestions() {
  showSection("suggestions");
}

function submitSuggestion() {
  alert("✅ تم إرسال الاقتراح (محليًا)");
  document.getElementById("suggestText").value = "";
}

function goHome() {
  showSection("home");
}

function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
