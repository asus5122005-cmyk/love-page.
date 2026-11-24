/* ==========================================================
   ======  ده كل اللي محتاج تعدله — الكونفج الأول في الملف  ======
   ========================================================== */
const CONFIG = {

  /* 1) تاريخ يوم ما اتقابلتوا (28 فبراير 2025) */
  correctDate: { year: 2025, month: 2, day: 28 },

  /* تلميح التاريخ لو غلط مرتين (اختياري) */
  dateHint: "تلميح: آخر يوم في فبراير.. والجو كان جميل 😍",

  /* 2) أسئلة القفل بعد التاريخ (يوم الجمعة + معاد القطر) */
  gateQuestions: [
    {
      q: "اليوم كان إيه؟ 📅",
      options: ["السبت", "الجمعة", "الأحد", "الخميس"],
      answer: "الجمعة",
      fail: "أوه.. مش دي، جربي تاني ❤️",
      ok: "أيوه! يوم الجمعة 😍",
      hint: "تلميح: آخر يوم في الأسبوع قبل السبت 😌"
    },
    {
      q: "معاد القطر كان الساعة كام؟ 🚆",
      options: ["الساعة 10", "الساعة 12", "الساعة 4", "الساعة 9"],
      answer: "الساعة 12",
      fail: "لسه غلط.. فكّري في معاد القطر 😉",
      ok: "بالظبط! الساعة 12 🎉",
      hint: "تلميح: في نص اليوم بالظبط 😉"
    }
  ],

  /* نطاق السنوات في القائمة */
  yearRange: { from: 2018, to: 2026 },

  /* 3) كلام صفحة الترحيب بعد فتح القفل */
  kicker: "أخيرًا.. فتحتي القفل ❤️",
  title: "أهلاً يا سندريلا 🎀",
  subtitle: "يا أحلى صدفة في حياتي.. ربنا يخليكِ ليا ❤️",
  cta: "دوسي هنا عشان تقري الرسالة 💌",

  /* 4) السؤال اللي فوق الرسالة */
  loveQuestion: {
    q: "تفتكري إيه أكتر حاجة بحبها فيكي؟ 💭",
    options: ["جمالك وشك الحلو", "ضحكتك وروحك الطفولية", "عينيك المليانة نور", "عطفك وحنانك"],
    answer: "ضحكتك وروحك الطفولية",
    fail: [
      "أوه.. مش دي، جربي تاني 😌",
      "لسه غلط.. بس إنتي قريبة أوي 😅",
      "فكّري في اللي بيضحك قلبي كل يوم 😉"
    ],
    hint: "تلميح: ده اللي بيضحكني أول ما بشوفك 😊",
    ok: "أيوه بالظبط! وبحب كل حاجة فيكِ ❤️"
  },

  /* 5) الرسالة */
  message: [
    "سندريلا الحلوة.. أول حاجة عايز أقولها لكِ إن قلبي ده بتاعكِ أنتِ بس، وعمري ما هفكر أكون مع حد غيركِ.",
    "أوعدكِ إني أكون جنبكِ في كل وقت.. في الحلو والصعب، ومهما حصل في الدنيا عمرني ما هسيبكِ ولا هبعد عنكِ.",
    "أنتِ أمانة في رقبتي، وضحكتكِ أجمل حاجة بسمعها، وهفضل أحبكِ لحد آخر نفس فيّا.. وبعده كمان.",
    "ربنا يخليكِ ليا ويعمل فيّا الخير عشان أكمل معاكِ.. أنا بحبكِ أكتر مما الكلام يقدر يقول ❤️"
  ],

  /* توقيع آخر الرسالة */
  signName: "بحبكِ يا سندريلا.. لآخر نفس ❤️",

  /* 6) أسباب الحب (زوّدي أو نقصني براحتك) */
  reasons: [
    "لإنكِ سبب ابتسامتي كل يوم",
    "لإنكِ بتسمعيّي حتى وإنا بكرر",
    "لإن وجودكِ بيخلي الدنيا أهدى",
    "لإنكِ أجمل مفاجأة حصلتلي",
    "لإنكِ بتصدقيني حتى في صمتنا",
    "لإن روحكِ الطفولية أجمل حاجة فيكِ"
  ],

  footer: "صُنع بحب.. لكِ يا سندريلا ❤️",

  emojis: ["💖","🌹","✨","🥰","🌙","☀️","💫","🎀"]
};

/* ==========================================================
   ============  كود التشغيل (مش محتاج تعدله)  ============
   ========================================================== */
const $ = (id) => document.getElementById(id);
const MONTHS = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let gateFails = 0;   // محاولات غلط في سؤال القفل الحالي
let loveFails = 0;   // محاولات غلط في سؤال الرسالة

/* ---------- تعبئة القوائم المنسدلة ---------- */
function buildSelects(){
  const daySel = $("day"), monthSel = $("month"), yearSel = $("year");

  daySel.appendChild(new Option("اليوم", ""));
  for (let d = 1; d <= 31; d++) daySel.appendChild(new Option(d, d));

  monthSel.appendChild(new Option("الشهر", ""));
  MONTHS.forEach((m, i) => monthSel.appendChild(new Option(m, i + 1)));

  yearSel.appendChild(new Option("السنة", ""));
  for (let y = CONFIG.yearRange.to; y >= CONFIG.yearRange.from; y--) yearSel.appendChild(new Option(y, y));
}

/* ---------- تعبئة محتوى الصفحة من الكونفج ---------- */
function fillContent(){
  $("kicker").textContent   = CONFIG.kicker;
  $("title").textContent    = CONFIG.title;
  $("subtitle").textContent = CONFIG.subtitle;
  $("cta").textContent      = CONFIG.cta;
  $("sign").textContent     = CONFIG.signName;
  $("footerText").textContent = CONFIG.footer;
  $("loveQ").textContent    = CONFIG.loveQuestion.q;

  const msg = $("message");
  CONFIG.message.forEach((text, i) => {
    const p = document.createElement("p");
    p.className = "line";
    p.style.setProperty("--i", i);
    p.textContent = text;
    msg.appendChild(p);
  });

  const grid = $("reasons");
  CONFIG.reasons.forEach((text, i) => {
    const card = document.createElement("div");
    card.className = "reason";

    const emoji = document.createElement("span");
    emoji.className = "reason__emoji";
    emoji.textContent = CONFIG.emojis[i % CONFIG.emojis.length];

    const p = document.createElement("p");
    p.className = "reason__text";
    p.textContent = text;

    card.appendChild(emoji);
    card.appendChild(p);
    grid.appendChild(card);
  });

  const now = new Date();
  $("today").textContent =
    "في يوم " + now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
}

/* ==========================================================
   =================  شاشة القفل والأسئلة  =================
   ========================================================== */
function shake(el){
  el.classList.remove("is-shake");
  void el.offsetWidth; // إعادة تشغيل الأنيميشن
  el.classList.add("is-shake");
}

/* ----- الخطوة 1: التاريخ ----- */
function tryDate(){
  const d = +$("day").value;
  const m = +$("month").value;
  const y = +$("year").value;
  const msg = $("gateMsg");

  if (!d || !m || !y){
    shake($("gateCard"));
    msg.textContent = "اختاري اليوم والشهر والسنة الأول 📅";
    return;
  }

  const ok = d === CONFIG.correctDate.day &&
             m === CONFIG.correctDate.month &&
             y === CONFIG.correctDate.year;

  if (ok){
    msg.textContent = "";
    $("gateHint").hidden = true;
    showGateQuestion(0);
  } else {
    gateFails++;
    shake($("gateCard"));
    msg.textContent = gateFails === 1 ? "مش ده التاريخ.. جربي تاني ❤️" :
                      gateFails === 2 ? "لسه غلط.. فكّري كويس 😌" :
                                        "قاوية! بس القلب لسه مستنيكِ 😅";
    if (gateFails === 2 && CONFIG.dateHint){
      const hint = $("gateHint");
      hint.textContent = CONFIG.dateHint;
      hint.hidden = false;
    }
  }
}

/* ----- الخطوة 2 و3: أسئلة القفل ----- */
function showGateQuestion(index){
  const q = CONFIG.gateQuestions[index];
  gateFails = 0;

  $("dateBlock").hidden = true;
  $("quizBlock").hidden = false;
  $("gateTitle").textContent = "قبل ما نفتح.. سؤالين بس 😌";
  $("gateText").textContent = "جاوبى صح عشان القلب يتفتح ❤️";
  $("quizQ").textContent = q.q;
  $("gateMsg").textContent = "";
  $("gateMsg").classList.remove("is-ok");
  $("gateHint").hidden = true;

  const box = $("quizOpts");
  box.innerHTML = "";
  q.options.forEach(opt => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = opt;
    b.addEventListener("click", () => answerGateQuestion(index, opt, b));
    box.appendChild(b);
  });
}

function answerGateQuestion(index, value, btn){
  const q = CONFIG.gateQuestions[index];
  const msg = $("gateMsg");

  if (value === q.answer){
    btn.classList.add("is-correct");
    msg.textContent = q.ok;
    msg.classList.add("is-ok");
    burst(window.innerWidth / 2, window.innerHeight / 2, 22);

    setTimeout(() => {
      if (index + 1 < CONFIG.gateQuestions.length){
        showGateQuestion(index + 1);
      } else {
        unlock(true);
      }
    }, 750);
  } else {
    gateFails++;
    btn.classList.add("is-wrong");
    setTimeout(() => btn.classList.remove("is-wrong"), 600);
    msg.classList.remove("is-ok");
    msg.textContent = q.fail;

    if (gateFails === 2 && q.hint){
      const hint = $("gateHint");
      hint.textContent = q.hint;
      hint.hidden = false;
    }
  }
}

/* ----- فتح القفل والانتقال للصفحة ----- */
function unlock(animate){
  try { sessionStorage.setItem("heartUnlocked", "1"); } catch(e){}

  const gate = $("gate");
  const page = $("page");

  const showPage = () => {
    page.hidden = false;
    page.classList.add("is-visible"); // مباشرة من غير rAF عشان المحتوى يظهر أكيد
    window.scrollTo(0, 0);
  };

  if (!animate){
    gate.hidden = true;
    showPage();
    return;
  }

  setTimeout(() => {
    $("flash").classList.add("is-on");
    burst(window.innerWidth / 2, window.innerHeight / 2, 70);
    gate.classList.add("is-gone");

    setTimeout(() => {
      gate.hidden = true;
      showPage();
    }, 620);
  }, 350);
}

/* ==========================================================
   ==============  سؤال فوق الرسالة + الرسالة  =============
   ========================================================== */
function setupLoveQuiz(){
  const q = CONFIG.loveQuestion;
  const box = $("loveOpts");
  box.innerHTML = "";
  q.options.forEach(opt => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = opt;
    b.addEventListener("click", () => answerLoveQuestion(opt, b));
    box.appendChild(b);
  });
}

function answerLoveQuestion(value, btn){
  const q = CONFIG.loveQuestion;
  const msg = $("loveMsg");

  if (value === q.answer){
    btn.classList.add("is-correct");
    msg.textContent = q.ok;
    msg.classList.add("is-ok");
    try { sessionStorage.setItem("loveQuizDone", "1"); } catch(e){}

    setTimeout(() => revealLetter(true), 700);
  } else {
    loveFails++;
    btn.classList.add("is-wrong");
    setTimeout(() => btn.classList.remove("is-wrong"), 600);
    msg.classList.remove("is-ok");
    msg.textContent = q.fail[Math.min(loveFails - 1, q.fail.length - 1)];

    if (loveFails === 2 && q.hint){
      const hint = document.createElement("p");
      hint.className = "quiz__hint";
      hint.textContent = q.hint;
      if (!document.querySelector(".quiz__hint")) msg.after(hint);
    }
  }
}

/* ----- إظهار الرسالة بعد الإجابة الصح ----- */
function revealLetter(celebrate){
  const card = $("letterCard");
  if (!card.hidden) return;

  card.hidden = false;
  card.classList.add("is-open");

  if (celebrate){
    burst(window.innerWidth / 2, window.innerHeight / 2, 60);
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
  }
}

/* ==========================================================
   ==================  عداد الأيام  ========================
   ========================================================== */
function tick(){
  const start = new Date(CONFIG.correctDate.year, CONFIG.correctDate.month - 1, CONFIG.correctDate.day, 0, 0, 0);
  const secs = Math.max(0, Math.floor((Date.now() - start.getTime()) / 1000));

  $("cDays").textContent  = Math.floor(secs / 86400);
  $("cHours").textContent = Math.floor(secs % 86400 / 3600);
  $("cMins").textContent  = Math.floor(secs % 3600 / 60);
  $("cSecs").textContent  = secs % 60;
}

/* ---------- ظهور الأقسام عند التمرير ---------- */
function setupReveal(){
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)){
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  items.forEach(el => io.observe(el));

  /* شبكة أمان: لو الـ IntersectionObserver ما اشتغلش (نافذة مصغّرة مثلاً)،
     نكشف أي قسم ظاهر في الشاشة يدوياً */
  const safety = setInterval(() => {
    let pending = 0;
    items.forEach(el => {
      if (el.classList.contains("is-visible")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0){
        el.classList.add("is-visible");
        io.unobserve(el);
      } else {
        pending++;
      }
    });
    if (pending === 0) clearInterval(safety);
  }, 700);
}

/* ==========================================================
   ==============  قلوب الخلفية والاحتفال  =================
   ========================================================== */
const canvas = $("bg");
const ctx = canvas.getContext("2d");
const COLORS = ["#ff4d8d","#ff8fab","#ffd166","#c77dff","#ff2d75","#ff5c8a"];
let W = 0, H = 0;
const ambient = [];
const particles = [];

function resize(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function rand(a, b){ return a + Math.random() * (b - a); }
function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

function makeAmbient(fromBottom){
  return {
    x: rand(0, W),
    y: fromBottom ? H + rand(20, 160) : rand(-50, H),
    size: rand(6, 17),
    speed: rand(0.25, 0.85),
    sway: rand(0.4, 1.3),
    phase: rand(0, Math.PI * 2),
    rot: rand(-0.35, 0.35),
    color: pick(COLORS),
    alpha: rand(0.2, 0.65)
  };
}

function initAmbient(){
  const count = REDUCED ? 10 : Math.min(42, Math.max(16, Math.round(W / 40)));
  ambient.length = 0;
  for (let i = 0; i < count; i++) ambient.push(makeAmbient(false));
}

/* رسم قلب واحد */
function drawHeart(x, y, s, rot, color, alpha){
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(s, s);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-0.5, -0.5, -1, 0.1, 0, 0.8);
  ctx.bezierCurveTo(1, 0.1, 0.5, -0.5, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/* انفجار قلوب عند الفتح أو عند الضغط */
function burst(x, y, count){
  const n = REDUCED ? Math.min(15, count) : count;
  for (let i = 0; i < n; i++){
    const angle = rand(0, Math.PI * 2);
    const power = rand(2.5, 11);
    particles.push({
      x, y,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power - 2,
      size: rand(6, 15),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.12, 0.12),
      color: pick(COLORS),
      life: 1,
      decay: rand(0.008, 0.017)
    });
  }
}

function loop(){
  ctx.clearRect(0, 0, W, H);

  // القلوب المتصاعدة
  for (const h of ambient){
    h.y -= h.speed;
    h.phase += 0.012;
    h.x += Math.sin(h.phase) * h.sway;
    if (h.y < -60) Object.assign(h, makeAmbient(true));
    drawHeart(h.x, h.y, h.size, h.rot + Math.sin(h.phase) * 0.2, h.color, h.alpha);
  }

  // قلوب الانفجار
  for (let i = particles.length - 1; i >= 0; i--){
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.13;      // جاذبية
    p.vx *= 0.985;     // مقاومة الهواء
    p.vy *= 0.985;
    p.rot += p.vr;
    p.life -= p.decay;
    if (p.life <= 0){ particles.splice(i, 1); continue; }
    drawHeart(p.x, p.y, p.size, p.rot, p.color, Math.max(0, p.life));
  }

  requestAnimationFrame(loop);
}

/* قلوب صغيرة بتتبع المؤشر */
let lastTrail = 0;
function trailAt(x, y, now){
  if (REDUCED || now - lastTrail < 130) return;
  lastTrail = now;
  const el = document.createElement("span");
  el.className = "trail";
  el.textContent = pick(["❤️","💖","💕"]);
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.setProperty("--dx", rand(-28, 28) + "px");
  el.style.setProperty("--rot", rand(-40, 40) + "deg");
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

/* ==========================================================
   ==================  التشغيل  ============================
   ========================================================== */
buildSelects();
fillContent();
setupLoveQuiz();
setupReveal();
tick();
setInterval(tick, 1000);

$("unlockBtn").addEventListener("click", tryDate);
document.querySelectorAll(".gate__date select").forEach(sel => {
  sel.addEventListener("change", () => { $("gateMsg").textContent = ""; });
  sel.addEventListener("keydown", (e) => { if (e.key === "Enter") tryDate(); });
});

// قلوب عند الضغط في أي مكان بعد الفتح
document.addEventListener("pointerdown", (e) => {
  if (!$("page").hidden) burst(e.clientX, e.clientY, 6);
});
document.addEventListener("pointermove", (e) => {
  if (!$("page").hidden) trailAt(e.clientX, e.clientY, performance.now());
});

// خلفية القلوب
window.addEventListener("resize", () => { resize(); initAmbient(); });
resize();
initAmbient();
requestAnimationFrame(loop);

/* فتح تلقائي: لو اللينك فيه skip (للمعاينة) أو لو الصفحة اتفتحت قبل كده
   أو لو سؤال الرسالة كان اتجاب عنه قبل كده */
const params = new URLSearchParams(location.search);
let unlockedBefore = false, quizDoneBefore = false;
try {
  unlockedBefore = sessionStorage.getItem("heartUnlocked") === "1";
  quizDoneBefore  = sessionStorage.getItem("loveQuizDone") === "1";
} catch(e){}

if (params.has("skip") || unlockedBefore) unlock(false);
if (params.has("skip") || quizDoneBefore) revealLetter(false);

/* ==========================================================
   ===================  الموسيقى  ==========================
   ملاحظة: كروم بيقفل التشغيل التلقائي للصوت من غير تفاعل
   المستخدم، عشان كده بنحاول نشغلها عند الفتح، ولو اتحظر
   هتشتغل تلقائي أول ما المستخدم يلمس الصفحة (أي ضغطة).
   ========================================================== */
(function setupMusic(){
  const audio = $("bgMusic");
  const btn   = $("musicBtn");
  if (!audio || !btn) return;

  let userWanted = true;   // عايز الموسيقى شغالة؟
  let started    = false;  // اتشغلت فعلاً؟

  const setUI = () => {
    btn.classList.toggle("is-playing", started && !audio.paused);
    btn.setAttribute("aria-pressed", String(started && !audio.paused));
  };

  const tryPlay = () => {
    if (!userWanted) return;
    const p = audio.play();
    if (p && typeof p.then === "function"){
      p.then(() => { started = true; setUI(); })
       .catch(() => { setUI(); }); // لسه محظور — هنستنى أول تفاعل
    }
  };

  /* أول تفاعل من المستخدم يشيل قفل كروم على الصوت */
  const kick = () => {
    tryPlay();
    if (started) {
      document.removeEventListener("pointerdown", kick);
      document.removeEventListener("keydown", kick);
    }
  };
  document.addEventListener("pointerdown", kick);
  document.addEventListener("keydown", kick);

  /* زر التشغيل/الإيقاف */
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused){
      userWanted = true;
      tryPlay();
    } else {
      userWanted = false;
      audio.pause();
      setUI();
    }
  });

  audio.addEventListener("play",  setUI);
  audio.addEventListener("pause", setUI);

  /* ابدأ محاولة التشغيل أول ما الصفحة تفتح */
  tryPlay();
})();
