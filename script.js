let current = 0;
let quizData = [];
let correctCount = 0;
let allCorrect = true;
let timeLeft = 15;
let timer;

const winSound = document.getElementById("winSound");

const quizzes = {
    religious: [
        { q: "ما السورة التي لا تبدأ بالبسملة؟", o: ["التوبة", "الكهف", "يس"], a: 0 },
        { q: "كم عدد القراءات المتواترة؟", o: ["7", "10", "14"], a: 1 },
        { q: "أطول آية في القرآن؟", o: ["آية الدين", "الكرسي", "النور"], a: 0 },
        { q: "أول من جمع القرآن؟", o: ["أبو بكر", "عمر", "عثمان"], a: 0 },
        { q: "عدد أسماء الله الحسنى؟", o: ["99", "100", "88"], a: 0 }
    ],
    culture: [
        { q: "متى توحيد المملكة؟", o: ["1932", "1927", "1940"], a: 0 },
        { q: "عاصمة كندا؟", o: ["تورنتو", "أوتاوا", "فانكوفر"], a: 1 },
        { q: "مؤسس علم الاجتماع؟", o: ["ابن خلدون", "أرسطو", "أفلاطون"], a: 0 },
        { q: "أكبر قارة؟", o: ["آسيا", "أفريقيا", "أوروبا"], a: 0 },
        { q: "أطول نهر؟", o: ["النيل", "الأمازون", "الدانوب"], a: 0 }
    ],
    education: [
        { q: "√144 = ؟", o: ["12", "14", "10"], a: 0 },
        { q: "π ≈ ؟", o: ["3.14", "2.17", "4.1"], a: 0 },
        { q: "عدد الكواكب؟", o: ["8", "9", "7"], a: 0 },
        { q: "عدد أولي؟", o: ["11", "21", "27"], a: 0 },
        { q: "سرعة الضوء؟", o: ["300 ألف كم/ث", "150 ألف", "1 مليون"], a: 0 }
    ],
    fun: [
        { q: "أسرع حيوان؟", o: ["الفهد", "الحصان", "الذئب"], a: 0 },
        { q: "كم ثانية في الساعة؟", o: ["3600", "600", "1000"], a: 0 },
        { q: "أكبر محيط؟", o: ["الهادئ", "الأطلسي", "الهندي"], a: 0 },
        { q: "كم يوم بالسنة؟", o: ["365", "360", "366"], a: 0 },
        { q: "أكثر لون انتشار؟", o: ["الأزرق", "الأحمر", "الأخضر"], a: 0 }
    ],
    skills: [
        { q: "حل المشكلات يبدأ بـ؟", o: ["الفهم", "الحل", "التنفيذ"], a: 0 },
        { q: "التواصل الفعال؟", o: ["الاستماع", "الحديث", "الصمت"], a: 0 },
        { q: "القيادة تعتمد على؟", o: ["التأثير", "الصوت", "الأوامر"], a: 0 },
        { q: "العمل الجماعي؟", o: ["تعاون", "فردية", "تنافس"], a: 0 },
        { q: "إدارة الوقت؟", o: ["تنظيم", "تأجيل", "إهمال"], a: 0 }
    ]
};

function startQuiz(type) {
    quizData = quizzes[type];
    current = 0;
    correctCount = 0;
    allCorrect = true;
    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    nextQuestion();
}

function nextQuestion() {
    if (current >= quizData.length) {
        showResult();
        return;
    }

    timeLeft = 15;
    document.getElementById("time").innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            allCorrect = false;
            current++;
            nextQuestion();
        }
    }, 1000);

    const q = quizData[current];
    document.getElementById("question").innerText = q.q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.o.forEach((opt, i) => {
        const btn = document.createElement("div");
        btn.className = "option";
        btn.innerText = opt;
        btn.onclick = () => {
            if (i === q.a) correctCount++;
            else allCorrect = false;
            current++;
            nextQuestion();
        };
        optionsDiv.appendChild(btn);
    });
}

function showResult() {
    clearInterval(timer);
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");
    const text = document.getElementById("finalText");
    const scoreText = document.getElementById("scoreText");

    scoreText.innerText = `✅ ${correctCount} من ${quizData.length}`;

    if (allCorrect) {
        text.innerText = "🎉 ممتاز! جميع الإجابات صحيحة";
        winSound.play();
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else {
        text.innerText = "📘 تم الحل، راجع الإجابات وجرّب مرة أخرى";
    }
}

function showTeacher() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("teacher").classList.remove("hidden");
}

function suggest() {
    const t = document.getElementById("lessonTime").value;
    const r = document.getElementById("result");
    if (t == 10) r.innerText = "⚡ اختبار سريع أو سؤال تفكير.";
    if (t == 20) r.innerText = "🎯 مسابقة تعليمية مع نقاش.";
    if (t == 30) r.innerText = "🧩 نشاط مهاري + تحليل.";
}
