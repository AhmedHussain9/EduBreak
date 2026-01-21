let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const quizzes = {
    religious: [
        { q: "كم عدد أركان الإسلام؟", o: ["3", "4", "5", "6"], a: 2 },
        { q: "ما أول سورة في القرآن؟", o: ["البقرة", "الفاتحة", "الناس", "الإخلاص"], a: 1 },
        { q: "كم عدد الصلوات المفروضة؟", o: ["3", "4", "5", "6"], a: 2 },
        { q: "ما قبلة المسلمين؟", o: ["المدينة", "الأقصى", "مكة", "الطائف"], a: 2 },
        { q: "شهر الصيام هو؟", o: ["شعبان", "رمضان", "ذو الحجة", "محرم"], a: 1 }
    ],
    culture: [
        { q: "عاصمة السعودية؟", o: ["جدة", "الرياض", "مكة", "الدمام"], a: 1 },
        { q: "اللغة الرسمية؟", o: ["إنجليزية", "فرنسية", "عربية", "تركية"], a: 2 },
        { q: "اليوم الوطني؟", o: ["23 سبتمبر", "1 يناير", "5 مايو", "10 يونيو"], a: 0 },
        { q: "أكبر قارة؟", o: ["أفريقيا", "آسيا", "أوروبا", "أمريكا"], a: 1 },
        { q: "البحر الأحمر يقع؟", o: ["شرق", "غرب", "شمال", "جنوب"], a: 1 }
    ]
};

function startQuiz(type) {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    currentQuiz = quizzes[type];
    currentIndex = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("time").textContent = timeLeft;
    document.getElementById("feedback").textContent = "";

    const q = currentQuiz[currentIndex];
    document.getElementById("question").textContent = q.q;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.o.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i);
        optionsDiv.appendChild(btn);
    });

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer(i) {
    clearInterval(timer);
    const feedback = document.getElementById("feedback");

    if (i === currentQuiz[currentIndex].a) {
        score++;
        feedback.textContent = "😀 إجابة صحيحة! أحسنت";
        document.getElementById("correctSound").play();
    } else {
        feedback.textContent = "🙁 إجابة خاطئة، حاول مرة أخرى";
        document.getElementById("wrongSound").play();
    }

    setTimeout(nextQuestion, 1200);
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuiz.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");

    document.getElementById("finalText").textContent = "🎉 انتهى الاختبار";
    document.getElementById("scoreText").textContent = `${score}/5`;

    if (score === 5) {
        document.getElementById("winSound").play();
    }
}

function goHome() {
    location.reload();
}

function showTeacher() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("teacher").classList.remove("hidden");
}

function suggest() {
    const time = document.getElementById("lessonTime").value;
    const res = document.getElementById("teacherResult");

    if (time == 10) res.textContent = "💡 سؤال سريع + نقاش جماعي";
    if (time == 20) res.textContent = "🎯 مسابقة قصيرة عبر EduBreak";
    if (time == 30) res.textContent = "🚀 نشاط تعاوني + لعبة تعليمية";
}
