let current = 0;
let correctCount = 0;
let allCorrect = true;
let timeLeft = 15;
let timer;
let quizData = [];

const encouragements = ["أحسنت 👏","ممتاز 🌟","رائع 😀","استمر 💪"];

const quizzes = {
  religious: [
    {q:"ما السورة التي لا تبدأ بالبسملة؟", o:["التوبة","يس","الكهف"], a:0},
    {q:"كم عدد القراءات المتواترة؟", o:["7","10","5"], a:1},
    {q:"أطول آية في القرآن؟", o:["الدين","الكرسي","النور"], a:0},
    {q:"أول من جمع القرآن؟", o:["أبو بكر","عثمان","عمر"], a:0},
    {q:"عدد أسماء الله الحسنى؟", o:["99","100","88"], a:0}
  ]
};

function startQuiz(type){
  quizData = quizzes[type];
  current = 0;
  correctCount = 0;
  allCorrect = true;
  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("progressBar").style.width="0%";
  nextQuestion();
}

function nextQuestion(){
  if(current >= quizData.length){
    showResult();
    return;
  }

  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("time").innerText = timeLeft;

  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      allCorrect = false;
      showFeedback(false);
    }
  },1000);

  const q = quizData[current];
  document.getElementById("question").innerText = q.q;
  const options = document.getElementById("options");
  options.innerHTML = "";

  q.o.forEach((opt,i)=>{
    const btn = document.createElement("div");
    btn.className = "option";
    btn.innerText = opt;
    btn.onclick = ()=>checkAnswer(i === q.a);
    options.appendChild(btn);
  });
}

function checkAnswer(correct){
  clearInterval(timer);
  if(correct){
    correctCount++;
    document.getElementById("correctSound").play();
    showFeedback(true);
  } else {
    allCorrect = false;
    document.getElementById("wrongSound").play();
    showFeedback(false);
  }
}

function showFeedback(correct){
  const fb = document.getElementById("feedback");
  fb.className = correct ? "correct" : "wrong";
  fb.innerHTML = correct
    ? "😀 " + encouragements[Math.floor(Math.random()*encouragements.length)]
    : "🙁 حاول مرة أخرى";

  fb.classList.remove("hidden");

  setTimeout(()=>{
    fb.classList.add("hidden");
    current++;
    document.getElementById("progressBar").style.width =
      (current/quizData.length*100)+"%";
    nextQuestion();
  },1200);
}

function showResult(){
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("resultPage").classList.remove("hidden");
  document.getElementById("scoreText").innerText =
    `النتيجة: ${correctCount}/${quizData.length}`;

  if(allCorrect){
    document.getElementById("finalText").innerText = "🎉 فوز كامل!";
    document.getElementById("winSound").play();
    confetti({particleCount:200,spread:80,origin:{y:0.6}});
  } else {
    document.getElementById("finalText").innerText = "📘 حاول مرة أخرى";
  }
}

function showTeacher(){
  document.getElementById("home").classList.add("hidden");
  document.getElementById("teacher").classList.remove("hidden");
}

function suggest(){
  const t = document.getElementById("lessonTime").value;
  const r = document.getElementById("result");
  if(t==10) r.innerText="⚡ مسابقة سريعة";
  if(t==20) r.innerText="🎯 نشاط جماعي";
  if(t==30) r.innerText="🧩 نشاط مهاري + نقاش";
}
