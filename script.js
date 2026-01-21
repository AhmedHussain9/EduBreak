const questions = {
  religious: [
    { q: "من هو أول خليفة في الإسلام؟", options: ["أبو بكر", "عمر", "عثمان", "علي"], answer: 0 },
    { q: "كم عدد ركعات صلاة الفجر؟", options: ["2", "3", "4", "1"], answer: 0 },
    { q: "ما هي أطول سورة في القرآن؟", options: ["البقرة", "النساء", "آل عمران", "التوبة"], answer: 0 },
    { q: "أين ولد النبي محمد ﷺ؟", options: ["المدينة", "مكة", "القدس", "بغداد"], answer: 1 },
    { q: "ما هي أول آية نزلت في القرآن؟", options: ["اقرأ", "الحمد لله", "يس", "التوحيد"], answer: 0 }
  ],
  culture: [
    { q: "ما عاصمة فرنسا؟", options: ["باريس", "لندن", "مدريد", "روما"], answer: 0 },
    { q: "ما أكبر محيط في العالم؟", options: ["الأطلسي", "الهندي", "الهادئ", "المتجمد الشمالي"], answer: 2 },
    { q: "كم عدد القارات؟", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "من كتب رواية 1984؟", options: ["جورج أورويل", "توماس هاردي", "ستيفن كينغ", "ليو تولستوي"], answer: 0 },
    { q: "ما هي لغة البرازيل الرسمية؟", options: ["الإسبانية", "البرتغالية", "الإنجليزية", "الفرنسية"], answer: 1 }
  ],
  education: [
    { q: "ما ناتج 7×8؟", options: ["54", "56", "64", "49"], answer: 1 },
    { q: "ما صيغة الماء الكيميائية؟", options: ["H2O", "CO2", "O2", "NaCl"], answer: 0 },
    { q: "كم عدد الحروف في الأبجدية العربية؟", options: ["28", "26", "30", "32"], answer: 0 },
    { q: "ما أسرع حيوان بري؟", options: ["الفهد", "الأسد", "الذئب", "الحصان"], answer: 0 },
    { q: "ما وحدة قياس شدة التيار الكهربائي؟", options: ["أوم", "أمبير", "فولت", "واط"], answer: 1 }
  ],
  fun: [
    { q: "ما لون السماء أثناء النهار؟", options: ["أزرق", "أخضر", "أحمر", "أصفر"], answer: 0 },
    { q: "ما الحيوان الذي يسمى ملك الغابة؟", options: ["الأسد", "النمر", "الفيل", "الذئب"], answer: 0 },
    { q: "كم عدد أيام الأسبوع؟", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "ما اللعبة التي تستخدم لوحة الشطرنج؟", options: ["الدومينو", "الشطرنج", "الكارام", "الورق"], answer: 1 },
    { q: "كم عدد الكواكب في النظام الشمسي؟", options: ["7", "8", "9", "10"], answer: 1 }
  ],
  skills: [
    { q: "ما مهارة إدارة الوقت؟", options: ["التأجيل", "التخطيط", "الكسل", "التسويف"], answer: 1 },
    { q: "ما أفضل طريقة لحل المشكلات؟", options: ["التجاهل", "التفكير المنطقي", "القلق", "العشوائية"], answer: 1 },
    { q: "ما مهارة التواصل الفعال؟", options: ["الإنصات الجيد", "الصمت الدائم", "المقاطعة", "الانتقاد"], answer: 0 },
    { q: "ما المهارة المتعلقة بالعمل الجماعي؟", options: ["التعاون", "العزلة", "السيطرة", "التشتت"], answer: 0 },
    { q: "ما مهارة الإبداع؟", options: ["التكرار", "النسخ", "التفكير الابتكاري", "التقليد"], answer: 2 }
  ]
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz(section){
  currentQuiz = questions[section];
  currentIndex = 0;
  score = 0;
  document.getElementById('home').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  loadQuestion();
}

function loadQuestion(){
  clearInterval(timer);
  document.getElementById('feedback').innerHTML = '';
  if(currentIndex >= currentQuiz.length){
    showResult();
    return;
  }
  const questionObj = currentQuiz[currentIndex];
  document.getElementById('question').innerText = questionObj.q;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  questionObj.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });

  // عداد الوقت
  timeLeft = 15;
  document.getElementById('time').innerText = timeLeft;
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      checkAnswer(-1);
    }
  },1000);

  // تحديث شريط التقدم
  const progressPercent = ((currentIndex)/currentQuiz.length)*100;
  document.getElementById('progressBar').style.width = progressPercent + '%';
}

function checkAnswer(choice){
  clearInterval(timer);
  const correct = currentQuiz[currentIndex].answer;
  const feedbackDiv = document.getElementById('feedback');

  if(choice === correct){
    score++;
    feedbackDiv.innerHTML = '✅ أحسنت! 😀';
    document.getElementById('correctSound').play();
  } else {
    feedbackDiv.innerHTML = '❌ حاول مرة أخرى 🙁';
    document.getElementById('wrongSound').play();
  }

  currentIndex++;
  setTimeout(loadQuestion,1000);
}

function showResult(){
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('resultPage').classList.remove('hidden');
  document.getElementById('scoreText').innerText = `${score}/5`;
  if(score === 5){
    document.getElementById('winSound').play();
    confetti();
  }
}

function backHome(){
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('teacher').classList.add('hidden');
  document.getElementById('resultPage').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
}

function showTeacher(){
  document.getElementById('home').classList.add('hidden');
  document.getElementById('teacher').classList.remove('hidden');
}

function suggest(){
  const time = document.getElementById('lessonTime').value;
  document.getElementById('result').innerText = `⏱ نشاط مقترح لمدة ${time} دقيقة`;
}

// confetti عند الفوز
function confetti(){
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}
