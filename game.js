// game.js — lógica del juego WordLab
// Firebase compat ya cargado desde CDN en index.html
// WORDS, CATS, ALL_Q, Q_MAP vienen de data.js

// ════ Firebase ════
var FB_CONFIG = {
  apiKey:            "REEMPLAZA_TU_API_KEY",
  authDomain:        "digitcode-d991e.firebaseapp.com",
  databaseURL:       "https://digitcode-d991e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "digitcode-d991e",
  storageBucket:     "digitcode-d991e.appspot.com",
  messagingSenderId: "REEMPLAZA",
  appId:             "REEMPLAZA"
};

var db = null, fbOk = false;
try {
  if (FB_CONFIG.apiKey.includes("REEMPLAZA")) throw "no config";
  firebase.initializeApp(FB_CONFIG);
  db = firebase.database();
  fbOk = true;
} catch(e) { console.warn("Firebase no configurado — usando localStorage"); }

function dbGet(path) {
  if (fbOk) return db.ref(path).get().then(s => s.val());
  var r = localStorage.getItem("wl_" + path);
  return Promise.resolve(r ? JSON.parse(r) : null);
}
function dbPush(path, val) {
  if (fbOk) { var r = db.ref(path).push(); return r.set(val).then(() => r.key); }
  var e = JSON.parse(localStorage.getItem("wl_" + path) || "{}");
  var k = "k" + Date.now(); e[k] = val;
  localStorage.setItem("wl_" + path, JSON.stringify(e));
  return Promise.resolve(k);
}
function dbRemove(path) {
  if (fbOk) return db.ref(path).remove();
  localStorage.removeItem("wl_" + path);
  return Promise.resolve();
}

// ════ Estado ════
var cur = null, used = [], over = false;

// ════ Toast ════
function toast(msg, type) {
  type = type || "ok";
  var el = document.getElementById("toast");
  el.textContent = msg;
  el.className = "toast show " + type;
  setTimeout(function() { el.classList.remove("show"); }, 2600);
}

// ════ Navegación ════
function V(name) {
  document.querySelectorAll(".view").forEach(function(v) { v.classList.remove("active"); });
  document.querySelectorAll("nav button").forEach(function(b) { b.classList.remove("active"); });
  document.getElementById("view-" + name).classList.add("active");
  document.getElementById("nav-" + name).classList.add("active");
  if (name === "play")  buildPick();
  if (name === "stats") loadStats();
}
window.V = V;

// ════ SELECCIÓN ════
function buildPick() {
  var g = document.getElementById("pick-grid");
  var played = JSON.parse(localStorage.getItem("wl_played") || "[]");
  g.innerHTML = WORDS.map(function(w) {
    return '<div class="pick-card" onclick="startGame(\'' + w.id + '\')">' +
      (played.indexOf(w.id) > -1 ? '<div class="played-badge">✓ jugada</div>' : '') +
      '<div class="lang">' + w.lang + '</div>' +
      '<div class="wrd">' + maskWord(w.word) + '</div>' +
      '<div class="clue">' + w.clue + '</div>' +
      '</div>';
  }).join("") + '<button class="random-btn" onclick="startRandom()">🎲 Palabra aleatoria</button>';
}

function maskWord(w) {
  return w.split("").map(function(c, i) {
    return i === 0 ? c : (c === " " ? " " : "·");
  }).join("");
}

window.startRandom = function() {
  var w = WORDS[Math.floor(Math.random() * WORDS.length)];
  startGame(w.id);
};

// ════ JUEGO ════
window.startGame = function(id) {
  cur = null;
  for (var i = 0; i < WORDS.length; i++) { if (WORDS[i].id === id) { cur = WORDS[i]; break; } }
  if (!cur) return;
  used = []; over = false;

  document.getElementById("g-lang").textContent = cur.lang.toUpperCase();
  document.getElementById("g-word").textContent  = cur.word;
  document.getElementById("g-inp").value = "";

  buildDots(); updateCounter(); buildQuestions();

  document.getElementById("psel").style.display  = "none";
  document.getElementById("pgame").style.display = "block";
  document.getElementById("pres").style.display  = "none";
};

function buildDots() {
  document.getElementById("g-dots").innerHTML =
    Array.from({length: 20}, function(_, i) {
      return '<div class="dot" id="dot' + i + '"></div>';
    }).join("");
}

function updateCounter() {
  var n = used.length;
  var el = document.getElementById("g-count");
  el.textContent = n;
  el.className = "counter" + (n >= 18 ? " d" : n >= 14 ? " w" : "");
  for (var i = 0; i < 20; i++) {
    var d = document.getElementById("dot" + i);
    if (!d) continue;
    d.className = "dot" + (i < n - 1 ? " on" : i === n - 1 && n > 0 ? " last" : "");
  }
}

function buildQuestions() {
  document.getElementById("g-questions").innerHTML = CATS.map(function(cat) {
    return '<div class="cat-block">' +
      '<div class="cat-label">' + cat.name + '</div>' +
      cat.qs.map(function(q) {
        return '<div class="pq" id="pq' + q.id + '" onclick="useQ(' + q.id + ')">' +
          '<div class="qn">' + q.id + '</div>' +
          '<div class="qt">' + q.t + '</div>' +
          '<span class="arr">▶</span>' +
          '</div>';
      }).join("") +
      '</div>';
  }).join("");
}

window.useQ = function(qId) {
  if (over) return;
  for (var i = 0; i < used.length; i++) { if (used[i].qId === qId) return; }
  if (used.length >= 20) { toast("¡Límite de 20 preguntas!", "err"); return; }

  var raw   = cur.a[qId] || "X";
  var ans   = raw === "S" ? "SI"  : raw === "N" ? "NO" : raw === "D" ? "DEPENDE" : "NA";
  var label = raw === "S" ? "SÍ"  : raw === "N" ? "NO" : raw === "D" ? "DEPENDE" : "N/A";
  var order = used.length + 1;
  used.push({qId: qId, order: order, ans: ans, label: label});

  var el = document.getElementById("pq" + qId);
  if (el) {
    el.className = "pq used";
    el.onclick = null;
    var arr = el.querySelector(".arr");
    if (arr) arr.outerHTML = '<span class="ans ans-' + ans + '">' + label + '</span>';
    el.scrollIntoView({behavior: "smooth", block: "nearest"});
  }
  updateCounter();
};

// ════ ADIVINAR ════
window.doGuess = function() {
  var g = document.getElementById("g-inp").value.trim();
  if (!g) return;
  finishGame(checkGuess(g), g, false);
};

window.doReveal = function() {
  finishGame(false, "", true);
};

function norm(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/ +/g, " ").trim();
}

function checkGuess(g) {
  var gl = norm(g);
  var accept = cur.accept || [];
  for (var i = 0; i < accept.length; i++) {
    if (gl.indexOf(norm(accept[i])) > -1) return true;
  }
  return false;
}

function finishGame(ok, guess, revealed) {
  if (over) return;
  over = true;

  var session = {
    wordId: cur.id, word: cur.word, lang: cur.lang,
    questionsUsed: used.map(function(u) { return {qId: u.qId, order: u.order, ans: u.ans}; }),
    totalUsed: used.length,
    guessedCorrectly: ok,
    guess: guess, revealed: revealed,
    timestamp: Date.now()
  };

  dbPush("wordlab/sessions", session).catch(function(e) { console.warn(e); });

  var played = JSON.parse(localStorage.getItem("wl_played") || "[]");
  if (played.indexOf(cur.id) === -1) {
    played.push(cur.id);
    localStorage.setItem("wl_played", JSON.stringify(played));
  }

  showResult(ok, revealed);
}

function showResult(ok, revealed) {
  var banner = document.getElementById("res-banner");
  banner.className = "result-banner " + (revealed ? "rev" : ok ? "ok" : "ko");
  document.getElementById("res-label").textContent =
    revealed ? "Respuesta revelada" : ok ? "✓ ¡Correcto!" : "✗ No era eso";
  document.getElementById("res-meaning").textContent = cur.meaning;
  document.getElementById("res-hint").textContent    = cur.hint ? "💡 " + cur.hint : "";

  var ru = document.getElementById("res-used");
  if (used.length === 0) {
    ru.innerHTML = '<p style="color:var(--muted);font-size:12px;font-weight:600">No usaste ninguna pregunta.</p>';
  } else {
    ru.innerHTML = used.map(function(u, i) {
      return '<div style="display:flex;gap:8px;align-items:center;margin-bottom:5px">' +
        '<span style="color:var(--muted);font-size:10px;font-weight:700;min-width:18px">' + (i+1) + '.</span>' +
        '<span style="font-size:12px;flex:1;font-weight:600">' + Q_MAP[u.qId] + '</span>' +
        '<span class="ans ans-' + u.ans + '">' + u.label + '</span>' +
        '</div>';
    }).join("");
  }

  document.getElementById("pgame").style.display = "none";
  document.getElementById("pres").style.display  = "block";
}

window.backToSelect = function() {
  document.getElementById("pres").style.display = "none";
  document.getElementById("psel").style.display = "block";
  buildPick();
};

window.abandonGame = function() {
  document.getElementById("pgame").style.display = "none";
  document.getElementById("psel").style.display  = "block";
};

// ════ ESTADÍSTICAS ════
function loadStats() {
  dbGet("wordlab/sessions").then(function(data) {
    var sessions = data ? Object.values(data) : [];
    var total = sessions.length;
    var ok    = sessions.filter(function(s) { return s.guessedCorrectly; }).length;
    var avgQ  = total ? (sessions.reduce(function(a,b) { return a + (b.totalUsed||0); }, 0) / total).toFixed(1) : "—";
    var rev   = sessions.filter(function(s) { return s.revealed; }).length;

    document.getElementById("s-summary").innerHTML =
      '<div class="sb"><div class="big">' + total + '</div><div class="lbl">Partidas</div></div>' +
      '<div class="sb"><div class="big">' + ok    + '</div><div class="lbl">Adivinadas</div></div>' +
      '<div class="sb"><div class="big">' + avgQ  + '</div><div class="lbl">Preg. promedio</div></div>' +
      '<div class="sb"><div class="big">' + rev   + '</div><div class="lbl">Reveladas</div></div>';

    if (!total) {
      document.getElementById("s-table").innerHTML = '<div class="empty">Sin datos aún.</div>';
      document.getElementById("s-never").innerHTML = "";
      return;
    }

    var usage = {};
    sessions.forEach(function(s) {
      (s.questionsUsed || []).forEach(function(u) {
        if (!usage[u.qId]) usage[u.qId] = {count:0, posSum:0};
        usage[u.qId].count++;
        usage[u.qId].posSum += u.order;
      });
    });

    var counts = Object.values(usage).map(function(u) { return u.count; });
    var maxC = counts.length ? Math.max.apply(null, counts) : 1;

    var sorted = ALL_Q.map(function(q) {
      return {
        q: q,
        count:  usage[q.id] ? usage[q.id].count : 0,
        avgPos: usage[q.id] ? (usage[q.id].posSum / usage[q.id].count).toFixed(1) : "—",
        pct:    usage[q.id] ? Math.round(usage[q.id].count / total * 100) : 0
      };
    }).sort(function(a,b) { return b.count - a.count; });

    document.getElementById("s-table").innerHTML = sorted
      .filter(function(s) { return s.count > 0; })
      .map(function(s, i) {
        return '<div class="sr">' +
          '<span style="color:var(--muted);font-size:10px;font-weight:700">' + (i+1) + '</span>' +
          '<div><div style="font-size:12px;font-weight:600">' + s.q.t + '</div>' +
          '<div class="bar-w"><div class="bar-f" style="width:' + Math.round(s.count/maxC*100) + '%"></div></div></div>' +
          '<span class="sn">' + s.count + '</span>' +
          '<span class="sp">' + s.avgPos + '</span>' +
          '<span class="spct">' + s.pct + '%</span>' +
          '</div>';
      }).join("");

    var never = sorted.filter(function(s) { return s.count === 0; });
    document.getElementById("s-never").innerHTML = never.length === 0
      ? "<p style='color:var(--muted);font-size:12px;font-weight:600'>🎉 Todas usadas al menos una vez.</p>"
      : never.map(function(s) {
          return '<div style="padding:5px 8px;font-size:12px;font-weight:600;color:var(--muted);border-bottom:2px solid var(--border)">' +
            '<span style="color:var(--border);margin-right:6px">#' + s.q.id + '</span>' + s.q.t + '</div>';
        }).join("");
  });
}
window.loadStats = loadStats;

window.clearStats = function() {
  if (!confirm("¿Borrar todas las sesiones? Las palabras no se tocan.")) return;
  dbRemove("wordlab/sessions").then(function() {
    localStorage.removeItem("wl_played");
    toast("Stats borradas");
    loadStats();
  });
};

// ════ Init ════
V("play");
