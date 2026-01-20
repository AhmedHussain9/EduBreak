function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.style.display = 'none');

    document.getElementById(sectionId).style.display = 'block';

    // بدء عرض الأسئلة عند الدخول على القسم
    if (sectionId === "religion") { religionIndex = 0; religionScore = 0; showReligionQuestion(); }
    if (sectionId === "culture") { cultureIndex = 0; cultureScore = 0; showCultureQuestion(); }
    if (sectionId === "education") { educationIndex = 0; educationScore = 0; showEducationQuestion(); }
    if (sectionId === "fun") { funIndex = 0; funScore = 0; showFunQuestion(); }
    if (sectionId === "skills") { skillsIndex = 0; skillsScore = 0; showSkillsQuestion(); }
}

// ======= البيانات لكل قسم بالأسئلة الصعبة جدًا =======

// القسم الديني
const religionQuestions = [
    { question: "ما عدد أركان الإسلام؟", options: ["5", "6", "4"], correct: "5" },
    { question: "كم عدد سور القرآن الكريم؟", options: ["114", "113", "110"], correct: "114" },
    { question: "ما أول ما نزل من القرآن؟", options: ["العلق", "الفاتحة", "المائدة"], correct: "العلق" },
    { question: "في أي معركة استشهد حمزة بن عبد المطلب؟", options: ["أحد", "بدر", "الخندق"], correct: "أحد" },
    { question: "من هم أصحاب الكهف؟", options: ["أشخاص نائمون في كهف", "أنبياء", "صحابة"], correct: "أشخاص نائمون في كهف" }
];
let religionIndex = 0;
let religionScore = 0;

// القسم الثقافي
const cultureQuestions = [
    { question: "ما أطول نهر في العالم؟", options: ["النيل", "الأمازون", "الشانغ"], correct: "النيل" },
    { question: "أي دولة لديها أكبر عدد سكان في العالم؟", options: ["الصين", "الهند", "الولايات المتحدة"], correct: "الصين" },
    { question: "ما اسم العاصمة الثقافية للمملكة العربية السعودية؟", options: ["الرياض", "جدة", "الدمام"], correct: "جدة" },
    { question: "ما أقدم جامعة في العالم؟", options: ["القرويين", "الأزهر", "هارفارد"], correct: "القرويين" },
    { question: "أي من هذه الصحف هي الأقدم؟", options: ["نيويورك تايمز", "لوموند", "الأهرام"], correct: "الأهرام" }
];
let cultureIndex = 0;
let cultureScore = 0;

// القسم التعليمي
const educationQuestions = [
    { question: "إذا كان 7x - 5 = 23، فما قيمة x؟", options: ["4", "5", "6"], correct: "4" },
    { question: "حل المعادلة: 3(x + 4) = 21", options: ["3", "5", "7"], correct: "3" },
    { question: "ما الجذر التربيعي لـ 256؟", options: ["14", "16", "18"], correct: "16" },
    { question: "إذا كان طول ضلع مربع 12 سم، ما مساحته؟", options: ["144", "124", "142"], correct: "144" },
    { question: "حل 15 ÷ 0.5 = ؟", options: ["7.5", "30", "15"], correct: "30" }
];
let educationIndex = 0;
let educationScore = 0;

// القسم الترفيهي
const funQuestions = [
    { question: "أي هذه الحيوانات يستطيع الطيران؟", options: ["خفاش", "نمر", "تمساح"], correct: "خفاش" },
    { question: "أي من الكلمات التالية هي جمع صحيح لكلمة 'كتاب'؟", options: ["كتبان", "كتب", "كتبي"], correct: "كتب" },
    { question: "أين يقع البحر الأحمر؟", options: ["السعودية", "اليابان", "الأرجنتين"], correct: "السعودية" },
    { question: "كم عدد الحروف في الأبجدية العربية؟", options: ["28", "29", "30"], correct: "28" },
    { question: "أي من هذه العناصر يعتبر غازًا في الظروف العادية؟", options: ["النيتروجين", "الحديد", "النحاس"], correct: "النيتروجين" }
];
let funIndex = 0;
let funScore = 0;

// القسم المهاري
const skillsQuestions = [
    { question: "أي مهارة أساسية لحل المشكلات المعقدة؟", options: ["التفكير النقدي", "السرعة", "التأجيل"], correct: "التفكير النقدي" },
    { question: "أي مهارة تساعد على الابتكار؟", options: ["الإبداع", "التكرار", "المتابعة فقط"], correct: "الإبداع" },
    { question: "أهم مهارة للعمل الجماعي هي؟", options: ["التواصل الفعّال", "العمل الفردي", "الجلوس"], correct: "التواصل الفعّال" },
    { question: "ما المهارة الأساسية لإدارة الوقت بفعالية؟", options: ["تنظيم الأولويات", "التسرع", "التأجيل"], correct: "تنظيم الأولويات" },
    { question: "أي مهارة تساعدك على التعلم المستمر؟", options: ["الفضول", "الروتين", "الكسل"], correct: "الفضول" }
];
let skillsIndex = 0;
let skillsScore = 0;

// ======== دوال عرض الأسئلة ========

function displayQuestion(questions, index, qDivId, optionsDivId, feedbackId, incrementScore, showNextQuestion) {
    const q = questions[index];
    document.getElementById(qDivId).innerHTML = `<h3>${q.question}</h3>`;
    const optionsDiv = document.getElementById(optionsDivId);
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.className = "option-btn";
        btn.onclick = () => {
            const feedback = document.getElementById(feedbackId);
            if (option === q.correct) {
                feedback.innerText = "✅ إجابة صحيحة!";
                incrementScore();
                setTimeout(() => {
                    feedback.innerText = "";
                    showNextQuestion();
                }, 800);
            } else {
                feedback.innerText = "❌ حاولي مرة أخرى";
            }
        };
        optionsDiv.appendChild(btn);
    });
}

// ======== دوال لكل قسم مع احتساب النقاط ========

function showReligionQuestion() {
    if (religionIndex < religionQuestions.length) {
        displayQuestion(religionQuestions, religionIndex, "religion-question", "religion-options", "religion-feedback",
            () => { religionScore++; },
            () => { religionIndex++; showReligionQuestion(); });
    } else {
        document.getElementById("religion-question").innerHTML = `🎉 انتهى القسم الديني! مجموع نقاطك: ${religionScore}/${religionQuestions.length}`;
        document.getElementById("religion-options").innerHTML = "";
    }
}

function showCultureQuestion() {
    if (cultureIndex < cultureQuestions.length) {
        displayQuestion(cultureQuestions, cultureIndex, "culture-question", "culture-options", "culture-feedback",
            () => { cultureScore++; },
            () => { cultureIndex++; showCultureQuestion(); });
    } else {
        document.getElementById("culture-question").innerHTML = `🎉 انتهى القسم الثقافي! مجموع نقاطك: ${cultureScore}/${cultureQuestions.length}`;
        document.getElementById("culture-options").innerHTML = "";
    }
}

function showEducationQuestion() {
    if (educationIndex < educationQuestions.length) {
        displayQuestion(educationQuestions, educationIndex, "education-question", "education-options", "education-feedback",
            () => { educationScore++; },
            () => { educationIndex++; showEducationQuestion(); });
    } else {
        document.getElementById("education-question").innerHTML = `🎉 انتهى القسم التعليمي! مجموع نقاطك: ${educationScore}/${educationQuestions.length}`;
        document.getElementById("education-options").innerHTML = "";
    }
}

function showFunQuestion() {
    if (funIndex < funQuestions.length) {
        displayQuestion(funQuestions, funIndex, "fun-question", "fun-options", "fun-feedback",
            () => { funScore++; },
            () => { funIndex++; showFunQuestion(); });
    } else {
        document.getElementById("fun-question").innerHTML = `🎉 انتهى القسم الترفيهي! مجموع نقاطك: ${funScore}/${funQuestions.length}`;
        document.getElementById("fun-options").innerHTML = "";
    }
}

function showSkillsQuestion() {
    if (skillsIndex < skillsQuestions.length) {
        displayQuestion(skillsQuestions, skillsIndex, "skills-question", "skills-options", "skills-feedback",
            () => { skillsScore++; },
            () => { skillsIndex++; showSkillsQuestion(); });
    } else {
        document.getElementById("skills-question").innerHTML = `🎉 انتهى القسم المهاري! مجموع نقاطك: ${skillsScore}/${skillsQuestions.length}`;
        document.getElementById("skills-options").innerHTML = "";
    }
}

// ======== قسم المعلمة ========

function suggestActivity() {
    const duration = document.getElementById("lesson-duration").value;
    let activity = "";

    if (duration == "5") activity = "سؤال سريع أو لغز قصير.";
    else if (duration == "10") activity = "مسابقة قصيرة أو نشاط جماعي بسيط.";
    else if (duration == "15") activity = "نشاط تعليمي متكامل أو لعبة ذهنية جماعية.";

    document.getElementById("teacher-suggestion").innerText = "اقتراح النشاط: " + activity;
}
