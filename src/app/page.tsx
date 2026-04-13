'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import WORDS from '@/data/words';

// ============================================================
// GAME DATA
// ============================================================

const QUESTIONS = [
  { id:'cat_animal', text:'¿Es un animal?', category:'category', icon:'🐾', property:'is_animal' },
  { id:'cat_food', text:'¿Es comida o bebida?', category:'category', icon:'🍽️', property:'is_food' },
  { id:'cat_object', text:'¿Es un objeto?', category:'category', icon:'📦', property:'is_object' },
  { id:'cat_body', text:'¿Es una parte del cuerpo?', category:'category', icon:'👤', property:'is_body_part' },
  { id:'cat_place', text:'¿Es un lugar?', category:'category', icon:'🏠', property:'is_place' },
  { id:'cat_emotion', text:'¿Es una emoción o sentimiento?', category:'category', icon:'🎭', property:'is_emotion' },
  { id:'cat_action', text:'¿Es una acción o verbo?', category:'category', icon:'⚡', property:'is_action' },
  { id:'cat_clothing', text:'¿Es ropa o accesorio?', category:'category', icon:'👔', property:'is_clothing' },
  { id:'cat_vehicle', text:'¿Es un vehículo?', category:'category', icon:'🚗', property:'is_vehicle' },
  { id:'cat_plant', text:'¿Es una planta?', category:'category', icon:'🌱', property:'is_plant' },
  { id:'cat_weather', text:'¿Es un fenómeno del clima?', category:'category', icon:'⛈️', property:'is_weather' },
  { id:'cat_profession', text:'¿Es una profesión u oficio?', category:'category', icon:'👷', property:'is_profession' },
  { id:'nat_natural', text:'¿Existe en la naturaleza?', category:'nature', icon:'🌿', property:'is_natural' },
  { id:'nat_alive', text:'¿Está vivo?', category:'nature', icon:'💓', property:'is_alive' },
  { id:'nat_manmade', text:'¿Fue creado por humanos?', category:'nature', icon:'🏭', property:'is_man_made' },
  { id:'phy_tangible', text:'¿Se puede tocar?', category:'physical', icon:'🤚', property:'is_tangible' },
  { id:'phy_heavy', text:'¿Es pesado?', category:'physical', icon:'🏋️', property:'is_heavy' },
  { id:'phy_soft', text:'¿Es suave o flexible?', category:'physical', icon:'🧸', property:'is_soft' },
  { id:'phy_round', text:'¿Es redondo?', category:'physical', icon:'🔵', property:'is_round' },
  { id:'phy_shiny', text:'¿Brilla o refleja luz?', category:'physical', icon:'✨', property:'is_shiny' },
  { id:'phy_colorful', text:'¿Es colorido?', category:'physical', icon:'🎨', property:'is_colorful' },
  { id:'phy_cold', text:'¿Es frío al tacto?', category:'physical', icon:'❄️', property:'is_cold' },
  { id:'phy_parts', text:'¿Tiene varias partes?', category:'physical', icon:'🧩', property:'has_parts' },
  { id:'loc_indoors', text:'¿Se encuentra comúnmente dentro de una casa?', category:'location', icon:'🏠', property:'is_found_indoors' },
  { id:'loc_outdoors', text:'¿Se encuentra al aire libre?', category:'location', icon:'🌳', property:'is_found_outdoors' },
  { id:'loc_water', text:'¿Se encuentra en el agua?', category:'location', icon:'🌊', property:'is_found_in_water' },
  { id:'loc_sky', text:'¿Se encuentra en el cielo o en lo alto?', category:'location', icon:'☁️', property:'is_found_in_sky' },
  { id:'use_daily', text:'¿Lo usas a diario?', category:'use', icon:'🔄', property:'is_used_daily' },
  { id:'use_buy', text:'¿Se puede comprar en una tienda?', category:'use', icon:'🛒', property:'can_be_bought' },
  { id:'use_edible', text:'¿Se puede comer o beber?', category:'use', icon:'😋', property:'is_edible' },
  { id:'use_dangerous', text:'¿Es peligroso?', category:'use', icon:'⚠️', property:'is_dangerous' },
  { id:'use_sound', text:'¿Hace sonido?', category:'use', icon:'🔊', property:'makes_sound' },
  { id:'use_wear', text:'¿Se puede llevar puesto?', category:'use', icon:'👗', property:'can_be_worn' },
  { id:'size_big', text:'¿Es más grande que una persona?', category:'size', icon:'📏', property:'is_bigger_than_person' },
  { id:'size_hand', text:'¿Cabe en una mano?', category:'size', icon:'✋', property:'fits_in_hand' },
];

const CATEGORIES: Record<string, { label: string; icon: string; description: string }> = {
  category: { label:'Categoría', icon:'🏷️', description:'¿Qué tipo de cosa es?' },
  nature: { label:'Naturaleza', icon:'🌿', description:'¿Es natural o artificial?' },
  physical: { label:'Físico', icon:'🔬', description:'¿Cómo es físicamente?' },
  location: { label:'Ubicación', icon:'📍', description:'¿Dónde se encuentra?' },
  use: { label:'Uso', icon:'🔧', description:'¿Para qué sirve?' },
  size: { label:'Tamaño', icon:'📐', description:'¿Qué tamaño tiene?' },
};

type WordMeta = Record<string, boolean>;

interface WordObj {
  word: string;
  language: string;
  flag: string;
  meaning: string;
  meta: WordMeta;
}

// ============================================================
// CONSTANTS
// ============================================================

const MAX_QUESTIONS = 20;
const MAX_GUESSES = 5;
const GAME_START = new Date(2025, 0, 1);

// ============================================================
// TYPES
// ============================================================

interface AskedQuestion {
  questionId: string;
  answer: boolean;
  isAI?: boolean;
  aiText?: string;
  aiExplanation?: string;
}

interface GameState {
  questionsAsked: AskedQuestion[];
  guessAttempts: string[];
  completed: boolean;
  won: boolean;
  startTime: number;
  puzzleNumber: number;
  randomMode?: boolean;
}

// ============================================================
// HELPERS
// ============================================================

function normalize(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function checkGuess(guess: string, meaning: string) {
  const g = normalize(guess);
  const m = normalize(meaning);
  if (g === m) return true;
  if (m.includes(g) && g.length >= 3) return true;
  if (g.includes(m) && m.length >= 3) return true;
  return false;
}

function getStars(won: boolean, count: number) {
  if (!won) return '💔';
  if (count <= 3) return '⭐⭐⭐';
  if (count <= 7) return '⭐⭐';
  return '⭐';
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function GiskaGame() {
  // Core state
  const [dailyWord, setDailyWord] = useState<WordObj | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState<AskedQuestion[]>([]);
  const [guessAttempts, setGuessAttempts] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [won, setWon] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // AI state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // UI state
  const [guessInput, setGuessInput] = useState('');
  const [guessState, setGuessState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHelp, setShowHelp] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [toast, setToast] = useState('');

  // God Mode state
  const [godMode, setGodMode] = useState(false);
  const [godTab, setGodTab] = useState<'banco' | 'ia' | 'aleatorio'>('banco');
  const [bankStats, setBankStats] = useState<Record<string, number>>({});
  const [aiStats, setAiStats] = useState<Record<string, number>>({});
  const [randomMode, setRandomMode] = useState(false);

  const historyRef = useRef<HTMLDivElement>(null);
  const guessInputRef = useRef<HTMLInputElement>(null);
  const logoTapCount = useRef(0);
  const logoTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- KONAMI CODE ----
  useEffect(() => {
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let index = 0;

    const onKey = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          setGodMode(prev => !prev);
          index = 0;
        }
      } else {
        index = key === konamiCode[0] ? 1 : 0;
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // ---- FETCH GOD MODE STATS ----
  useEffect(() => {
    if (!godMode) return;
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => {
        if (data.bankStats) setBankStats(data.bankStats);
        if (data.aiStats) setAiStats(data.aiStats);
      })
      .catch(() => {});
  }, [godMode]);

  // ---- INIT ----
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.floor((today.getTime() - GAME_START.getTime()) / (1000 * 60 * 60 * 24));
    const pNum = days + 1;
    const idx = ((days % WORDS.length) + WORDS.length) % WORDS.length;
    const word = WORDS[idx];

    setPuzzleNumber(pNum);
    setDailyWord(word);

    // Load saved state
    try {
      const saved = localStorage.getItem(`giska_${pNum}`);
      if (saved) {
        const s = JSON.parse(saved) as GameState;
        if (s.puzzleNumber === pNum) {
          setQuestionsAsked(s.questionsAsked || []);
          setGuessAttempts(s.guessAttempts || []);
          setCompleted(s.completed || false);
          setWon(s.won || false);
          setStartTime(s.startTime || Date.now());
          if (s.randomMode) setRandomMode(true);
          if (s.completed) {
            setTimeout(() => setShowResults(true), 300);
          }
        }
      }
    } catch {}
  }, []);

  // ---- TIMER ----
  useEffect(() => {
    const interval = setInterval(() => {
      if (completed) { clearInterval(interval); return; }
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [completed, startTime]);

  // ---- SCROLL HISTORY ----
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [questionsAsked]);

  // ---- SAVE ----
  const saveState = useCallback(() => {
    if (!dailyWord) return;
    const key = randomMode ? 'giska_random' : `giska_${puzzleNumber}`;
    try {
      localStorage.setItem(key, JSON.stringify({
        questionsAsked, guessAttempts, completed, won, startTime, puzzleNumber, randomMode
      } as GameState));
    } catch {}
  }, [questionsAsked, guessAttempts, completed, won, startTime, puzzleNumber, dailyWord, randomMode]);

  // ---- SAVE GOD STATS ----
  const saveGodStats = useCallback(async (type: 'bank' | 'ai', questionId: string, questionText: string) => {
    try {
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, questionId, questionText }),
      });
    } catch {}
  }, []);

  // ---- GAME LOGIC ----
  const askQuestion = useCallback((questionId: string) => {
    if (completed || questionsAsked.length >= MAX_QUESTIONS) return;
    if (questionsAsked.some(q => q.questionId === questionId)) return;
    if (!dailyWord) return;

    const q = QUESTIONS.find(x => x.id === questionId);
    if (!q) return;

    const answer = !!dailyWord.meta[q.property];
    const newAsked = [...questionsAsked, { questionId, answer }];
    setQuestionsAsked(newAsked);

    saveGodStats('bank', questionId, q.text);

    if (newAsked.length >= MAX_QUESTIONS) {
      setCompleted(true);
      setWon(false);
      setTimeout(() => setShowResults(true), 500);
    }
  }, [completed, questionsAsked, dailyWord, saveGodStats]);

  // After state updates, save
  useEffect(() => {
    if (dailyWord) saveState();
  }, [questionsAsked, guessAttempts, completed, won, dailyWord, saveState]);

  const handleGuess = useCallback(() => {
    const guess = guessInput.trim();
    if (!guess || completed || !dailyWord) return;
    if (guessAttempts.length >= MAX_GUESSES) return;

    if (checkGuess(guess, dailyWord.meaning)) {
      const newAttempts = [...guessAttempts, guess];
      setGuessAttempts(newAttempts);
      setGuessInput('');
      setGuessState('correct');
      setCompleted(true);
      setWon(true);
      launchConfetti();
      setTimeout(() => setShowResults(true), 800);
      setTimeout(() => setGuessState('idle'), 2000);
    } else {
      const newAttempts = [...guessAttempts, guess];
      setGuessAttempts(newAttempts);
      setGuessInput('');
      setGuessState('wrong');
      setTimeout(() => setGuessState('idle'), 600);
      if (newAttempts.length >= MAX_GUESSES) {
        setCompleted(true);
        setWon(false);
        setTimeout(() => setShowResults(true), 500);
      }
    }
  }, [guessInput, completed, dailyWord, guessAttempts]);

  // ---- AI QUESTION ----
  const handleAIQuestion = useCallback(async () => {
    const question = aiQuestion.trim();
    if (!question || aiLoading || completed || !dailyWord) return;
    if (questionsAsked.length >= MAX_QUESTIONS) return;

    setAiLoading(true);
    setAiError('');

    try {
      const prevQs = questionsAsked.map(q => ({
        q: (QUESTIONS.find(x => x.id === q.questionId)?.text || q.aiText || ''),
        a: q.answer
      }));

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          meaning: dailyWord.meaning,
          word: dailyWord.word,
          language: dailyWord.language,
          previousQuestions: prevQs,
        }),
      });

      const data = await res.json();

      if (data.noApiKey) {
        setAiError('⚠️ La IA no está configurada. Usa las preguntas predefinidas.');
        setAiLoading(false);
        return;
      }
      if (data.dailyLimitReached) {
        setAiError('🌙 Hoy se han agotado las preguntas a la IA. ¡Vuelve mañana!');
        setAiLoading(false);
        return;
      }
      if (data.answer === 'no_sense') {
        setAiError(data.explanation || 'No puedo responder a esa pregunta.');
        setAiLoading(false);
        return;
      }

      const newAsked = [...questionsAsked, {
        questionId: `ai_${Date.now()}`,
        answer: !!data.answer,
        isAI: true,
        aiText: question,
        aiExplanation: data.explanation,
      }];
      setQuestionsAsked(newAsked);
      setAiQuestion('');

      saveGodStats('ai', `ai_${Date.now()}`, question);

      if (newAsked.length >= MAX_QUESTIONS) {
        setCompleted(true);
        setWon(false);
        setTimeout(() => setShowResults(true), 500);
      }
    } catch {
      setAiError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setAiLoading(false);
    }
  }, [aiQuestion, aiLoading, completed, dailyWord, questionsAsked, saveGodStats]);

  // ---- RANDOM WORD ----
  const playRandomWord = useCallback(() => {
    const idx = Math.floor(Math.random() * WORDS.length);
    const word = WORDS[idx];
    setDailyWord(word);
    setQuestionsAsked([]);
    setGuessAttempts([]);
    setCompleted(false);
    setWon(false);
    setStartTime(Date.now());
    setElapsed(0);
    setExpandedCategory(null);
    setAiQuestion('');
    setAiError('');
    setGuessInput('');
    setRandomMode(true);
    setShowResults(false);
    setGodMode(false);
    // Clear random save
    localStorage.removeItem('giska_random');
    showToast('🎲 Palabra aleatoria cargada');
  }, []);

  // ---- LOGO TAP (mobile God Mode) ----
  const handleLogoTap = useCallback(() => {
    logoTapCount.current++;
    if (logoTapCount.current >= 7) {
      logoTapCount.current = 0;
      if (logoTapTimer.current) clearTimeout(logoTapTimer.current);
      setGodMode(prev => !prev);
    } else {
      if (logoTapTimer.current) clearTimeout(logoTapTimer.current);
      logoTapTimer.current = setTimeout(() => { logoTapCount.current = 0; }, 3000);
    }
  }, []);

  // ---- SHARE ----
  const handleShare = useCallback(() => {
    if (!dailyWord) return;
    const stars = getStars(won, questionsAsked.length);
    const status = won ? '🏆 ¡Adivinado!' : '❌ No adivinado';
    let text = `GISKA #${puzzleNumber} ${stars}\n`;
    text += `${status}\n`;
    text += `Preguntas: ${questionsAsked.length}/${MAX_QUESTIONS}`;
    if (!won) text += ` | Intentos: ${guessAttempts.length}/${MAX_GUESSES}`;
    text += '\n';
    const icons = questionsAsked.map(q => {
      const question = QUESTIONS.find(x => x.id === q.questionId);
      return `${question?.icon || '🤖'}${q.answer ? '✅' : '❌'}`;
    });
    for (let i = 0; i < icons.length; i += 5) {
      text += icons.slice(i, i + 5).join(' ') + '\n';
    }
    text += '\n¡Juega a GISKA!';

    navigator.clipboard.writeText(text).then(() => {
      showToast('¡Resultado copiado al portapapeles! 📋');
    }).catch(() => {
      showToast('¡Resultado copiado! 📋');
    });
  }, [dailyWord, won, questionsAsked, guessAttempts, puzzleNumber]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // ---- CONFETTI ----
  const launchConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:200;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#1B3A4B', '#4ECDC4', '#6B8F71', '#C45B3F', '#F0C987', '#7DD3FC', '#E6EDF3'];
    const pieces: { x: number; y: number; w: number; h: number; color: string; vx: number; vy: number; rotation: number; vr: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        w: 6 + Math.random() * 8,
        h: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.rotation += p.vr;
        if (frame > 40) p.opacity -= 0.015;
        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });
      frame++;
      if (alive) requestAnimationFrame(animate);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); document.body.removeChild(canvas); }
    }
    animate();
  };

  // ---- TIMER FORMAT ----
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // ---- RENDER ----
  if (!dailyWord) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin-loader w-8 h-8 border-3 border-[var(--ring)] border-t-transparent rounded-full" />
    </div>
  );

  const questionsLeft = MAX_QUESTIONS - questionsAsked.length;
  const guessesLeft = MAX_GUESSES - guessAttempts.length;
  const stars = getStars(won, questionsAsked.length);

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="glass-header sticky top-0 z-40 border-b border-[var(--border)]">
        <div className="max-w-[672px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              onClick={handleLogoTap}
              className="text-2xl font-black tracking-tight cursor-pointer select-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <span className="text-[var(--primary)]">GIS</span>
              <span className="text-[var(--ring)]">KA</span>
            </h1>
            <span className="text-[0.7rem] font-mono bg-[var(--muted)] text-[var(--foreground)] px-2 py-0.5 rounded-full border border-[var(--border)]">
              #{puzzleNumber}
            </span>
            {randomMode && (
              <span className="text-[0.6rem] font-semibold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                🎲 Aleatorio
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {godMode && (
              <span className="text-xs font-semibold bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/30">
                ⚡ Dios
              </span>
            )}
            <div className="flex items-center gap-1 text-[var(--muted-foreground)] font-mono text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>{formatTime(elapsed)}</span>
            </div>
            <button
              onClick={() => setShowHelp(true)}
              className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Cómo jugar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-[672px] mx-auto w-full px-4 py-6 flex flex-col gap-6">

        {/* WORD CARD */}
        <div className="word-card-aurora p-6 sm:p-8 text-center">
          <div className="text-3xl mb-1">{dailyWord.flag}</div>
          <span className="inline-block text-sm font-medium bg-[var(--muted)] text-[var(--foreground)] px-3 py-0.5 rounded-full mb-3">
            {dailyWord.language}
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tighter word-glow animate-pop-in mb-2"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary)' }}
          >
            {dailyWord.word}
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">¿Qué significa esta palabra en español?</p>

          {completed && (
            <div className="mt-4 animate-fade-in">
              <div className="h-px bg-[var(--border)] my-4" />
              <span className="text-xl">{won ? '🏆' : '❌'}</span>
              <div className="font-bold text-lg mt-1">{won ? '¡Correcto!' : 'La respuesta era:'}</div>
              <p className="text-2xl font-extrabold mt-1" style={{ color: 'var(--primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                {dailyWord.meaning}
              </p>
            </div>
          )}
        </div>

        {/* PROGRESS */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
            <span>Preguntas: <strong className="text-[var(--foreground)]">{questionsAsked.length}</strong>/{MAX_QUESTIONS}</span>
            <span>Intentos: <strong className="text-[var(--foreground)]">{guessAttempts.length}</strong>/{MAX_GUESSES}</span>
          </div>
          <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-400"
              style={{
                width: `${(questionsAsked.length / MAX_QUESTIONS) * 100}%`,
                background: 'linear-gradient(90deg, var(--primary), var(--ring))',
              }}
            />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: MAX_QUESTIONS }).map((_, i) => {
              const q = questionsAsked[i];
              const cls = q
                ? q.answer
                  ? 'bg-[var(--ring)]'
                  : 'bg-[var(--destructive)]'
                : 'bg-[var(--muted)]';
              return <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-300 ${cls}`} />;
            })}
          </div>
        </div>

        {/* QUESTIONS SECTION */}
        {!completed && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Haz preguntas para descubrir la palabra
            </h3>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {Object.entries(CATEGORIES).map(([cat, info]) => {
                const isActive = expandedCategory === cat;
                const catQs = QUESTIONS.filter(q => q.category === cat);
                const askedCount = catQs.filter(q => questionsAsked.some(qa => qa.questionId === q.id)).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setExpandedCategory(isActive ? null : cat)}
                    className={`cat-btn-glow flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all
                      ${isActive
                        ? 'border-[var(--primary)] bg-[var(--accent)] shadow-md'
                        : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40'
                      }`}
                  >
                    <span className="text-xl">{info.icon}</span>
                    <span className="text-xs font-semibold">{info.label}</span>
                    <span className="text-[0.625rem] text-[var(--muted-foreground)]">{askedCount}/{catQs.length}</span>
                  </button>
                );
              })}
            </div>

            {/* Expanded Questions Panel */}
            {expandedCategory && (
              <div className="animate-fade-in border border-[var(--primary)]/30 rounded-xl bg-[var(--card)] p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-3 text-sm">
                  <span className="text-lg">{CATEGORIES[expandedCategory].icon}</span>
                  <span className="font-semibold">{CATEGORIES[expandedCategory].label}</span>
                  <span className="text-[var(--muted-foreground)]">— {CATEGORIES[expandedCategory].description}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {QUESTIONS.filter(q => q.category === expandedCategory).map(q => {
                    const asked = questionsAsked.find(qa => qa.questionId === q.id);
                    const answer = asked?.answer;
                    const disabled = !!asked || questionsLeft <= 0;

                    return (
                      <button
                        key={q.id}
                        onClick={() => askQuestion(q.id)}
                        disabled={disabled}
                        className={`flex items-center gap-3 w-full p-3 rounded-lg border text-sm text-left transition-all
                          ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:border-[var(--primary)]/40 hover:bg-[var(--accent)]'}
                          ${asked
                            ? answer
                              ? 'border-[var(--ring)] bg-[var(--accent)]'
                              : 'border-[var(--destructive)]/30 bg-[var(--destructive)]/5'
                            : 'border-[var(--border)] bg-[var(--card)]'
                          }`}
                      >
                        <span className="text-lg">{q.icon}</span>
                        <span className={`flex-1 ${asked ? 'line-through opacity-60' : ''}`}>{q.text}</span>
                        {asked && (
                          <span className="text-lg font-bold animate-pop-in">
                            {answer ? '✅' : '❌'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Free Question Section */}
            <div className="mt-2 p-4 rounded-xl border-2 border-dashed border-[var(--ring)]/40 bg-[var(--accent)]/50">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">🤖</span>
                Pregunta lo que quieras
                <span className="text-xs font-normal text-[var(--muted-foreground)]">(sin límite)</span>
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] mb-3">
                Escribe cualquier pregunta de sí/no en español sobre la palabra secreta.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={e => setAiQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAIQuestion()}
                  placeholder="¿Es algo que usas en verano?"
                  disabled={aiLoading || completed || questionsLeft <= 0}
                  className="flex-1 text-sm px-3 py-2.5 rounded-lg border border-[var(--border)] bg-transparent text-[var(--foreground)] outline-none focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/15 transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleAIQuestion}
                  disabled={aiLoading || !aiQuestion.trim() || completed || questionsLeft <= 0}
                  className="px-4 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 whitespace-nowrap flex items-center gap-2"
                >
                  {aiLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin-loader" />
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      Preguntar
                    </>
                  )}
                </button>
              </div>
              {aiError && (
                <div className="mt-2 px-3 py-2 rounded-lg bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 animate-fade-in">
                  <p className="text-xs text-[var(--destructive)]">{aiError}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* QUESTION HISTORY */}
        {questionsAsked.length > 0 && (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Historial de preguntas
            </div>
            <div ref={historyRef} className="max-h-48 overflow-y-auto history-scroll flex flex-col gap-1.5">
              {questionsAsked.map((q, i) => {
                const question = QUESTIONS.find(x => x.id === q.questionId);
                const text = question?.text || q.aiText || '?';
                const icon = question?.icon || '🤖';

                return (
                  <div
                    key={q.questionId}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm animate-slide-in
                      ${q.answer
                        ? 'bg-[var(--accent)] text-[var(--ring)]'
                        : 'bg-[var(--destructive)]/5 text-[var(--destructive)]'
                      }`}
                  >
                    <span className="font-mono text-xs text-[var(--muted-foreground)] w-5">{i + 1}.</span>
                    <span>{icon}</span>
                    <span className="flex-1 truncate">
                      {q.isAI && <span className="mr-1">🤖</span>}
                      {text}
                    </span>
                    <span className="font-bold whitespace-nowrap">{q.answer ? 'Sí' : 'No'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GUESS SECTION */}
        {!completed && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              ¿Ya sabes la respuesta?
            </h3>
            <div className="flex gap-2">
              <input
                ref={guessInputRef}
                type="text"
                value={guessInput}
                onChange={e => setGuessInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGuess()}
                placeholder="Escribe tu respuesta en español..."
                autoComplete="off"
                className={`flex-1 text-base px-4 py-2.5 rounded-lg border outline-none transition-all
                  ${guessState === 'correct'
                    ? 'border-[var(--ring)] bg-[var(--accent)]'
                    : guessState === 'wrong'
                      ? 'border-[var(--destructive)] bg-[var(--destructive)]/5 animate-shake'
                      : 'border-[var(--border)] bg-transparent focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15'
                  }
                  text-[var(--foreground)]`}
              />
              <button
                onClick={handleGuess}
                disabled={completed || guessesLeft <= 0 || !guessInput.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 whitespace-nowrap"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                Adivinar
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--muted-foreground)]">
                {guessesLeft} intento{guessesLeft !== 1 ? 's' : ''} restante{guessesLeft !== 1 ? 's' : ''}
              </span>
              <div className="flex gap-1">
                {guessAttempts.map((g, i) => (
                  <span key={i} className="text-xs bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/20 px-2 py-0.5 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GAME OVER */}
        {completed && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity hover:opacity-90"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Compartir resultado
              </button>
              <button
                onClick={() => setShowResults(true)}
                className="px-5 py-3 rounded-lg border border-[var(--border)] bg-transparent text-[var(--foreground)] text-sm font-semibold transition-colors hover:bg-[var(--muted)]"
              >
                Ver resumen
              </button>
            </div>
            <p className="text-center text-xs text-[var(--muted-foreground)]">
              {!randomMode && 'Vuelve mañana para un nuevo puzzle 🌅'}
              {randomMode && (
                <button onClick={playRandomWord} className="underline hover:text-[var(--primary)] transition-colors">
                  🎲 Jugar otra palabra aleatoria
                </button>
              )}
            </p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] mt-auto" style={{ background: 'color-mix(in srgb, var(--card) 50%, transparent)' }}>
        <p className="max-w-[672px] mx-auto px-4 py-4 text-center text-xs text-[var(--muted-foreground)]">
          GISKA — Un juego diario de palabras en otros idiomas • <strong>35 preguntas • 90+ palabras • IA</strong>
        </p>
      </footer>

      {/* HELP MODAL */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setShowHelp(false); }}
        >
          <div className="bg-[var(--card)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-3 right-3 text-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] leading-none p-1"
            >
              ×
            </button>
            <h2 className="text-center text-xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              🌍 ¿Cómo jugar a GISKA?
            </h2>
            <p className="text-center text-sm text-[var(--muted-foreground)] mb-4">
              Adivina el significado de palabras en otros idiomas
            </p>
            <div className="flex flex-col gap-4">
              {[
                'Cada día aparece una palabra en otro idioma. Tu objetivo es adivinar su significado en español.',
                'Haz preguntas de Sí o No eligiendo de las categorías disponibles.',
                'Tienes un máximo de 20 preguntas y 5 intentos para adivinar.',
                '¡Nuevo! Escribe cualquier pregunta y una IA te responderá. ¡Sin límite!',
                'Puedes intentar adivinar en cualquier momento.',
                '¡Comparte tus resultados con tus amigos! 🎉 Cuantas menos preguntas, más estrellas.',
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="flex items-center justify-center w-8 h-8 min-w-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div className="h-px bg-[var(--border)] my-4" />
            <div className="text-center">
              <p className="text-xs text-[var(--muted-foreground)] mb-2">Puntuación por estrellas</p>
              <div className="flex justify-center gap-6 text-sm">
                <div><span className="font-bold">⭐⭐⭐</span><br /><small className="text-[var(--muted-foreground)]">1-3 preguntas</small></div>
                <div><span className="font-bold">⭐⭐</span><br /><small className="text-[var(--muted-foreground)]">4-7 preguntas</small></div>
                <div><span className="font-bold">⭐</span><br /><small className="text-[var(--muted-foreground)]">8+ preguntas</small></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS MODAL */}
      {showResults && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setShowResults(false); }}
        >
          <div className="bg-[var(--card)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setShowResults(false)}
              className="absolute top-3 right-3 text-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] leading-none p-1"
            >
              ×
            </button>
            <h2 className="text-center text-xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {won ? '🎉 ¡Enhorabuena!' : '😔 ¡Casi!'}
            </h2>
            <p className="text-center text-sm text-[var(--muted-foreground)] mb-4">GISKA #{puzzleNumber}{randomMode ? ' (Aleatorio)' : ''}</p>

            <div className="bg-[var(--muted)] border-2 border-[var(--primary)]/20 rounded-xl p-4 text-center mb-4">
              <p className="text-sm text-[var(--muted-foreground)]">La palabra era</p>
              <p className="text-2xl font-black mt-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{dailyWord.word}</p>
              <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--primary)' }}>{dailyWord.meaning}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{dailyWord.flag} {dailyWord.language}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-[var(--muted)] rounded-lg p-3 text-center">
                <span className="text-2xl font-extrabold block">{questionsAsked.length}</span>
                <span className="text-xs text-[var(--muted-foreground)]">Preguntas</span>
              </div>
              <div className="bg-[var(--muted)] rounded-lg p-3 text-center">
                <span className="text-2xl font-extrabold block">{guessAttempts.length}</span>
                <span className="text-xs text-[var(--muted-foreground)]">Intentos</span>
              </div>
              <div className="bg-[var(--muted)] rounded-lg p-3 text-center">
                <span className="text-2xl font-extrabold block">{stars}</span>
                <span className="text-xs text-[var(--muted-foreground)]">Puntuación</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
              {questionsAsked.map((q, i) => {
                const question = QUESTIONS.find(x => x.id === q.questionId);
                return (
                  <span
                    key={i}
                    title={question?.text || q.aiText || ''}
                    className={`text-xs px-2 py-0.5 rounded-full border
                      ${q.answer
                        ? 'border-[var(--ring)] text-[var(--ring)] bg-[var(--accent)]'
                        : 'border-[var(--destructive)] text-[var(--destructive)] bg-[var(--destructive)]/5'
                      }`}
                  >
                    {question?.icon || '🤖'} {q.answer ? '✅' : '❌'}
                  </span>
                );
              })}
            </div>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity hover:opacity-90 mb-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              Copiar resultado para compartir
            </button>

            <p className="text-center text-xs text-[var(--muted-foreground)]">
              {!randomMode && '¡Vuelve mañana para un nuevo puzzle! 🌅'}
              {randomMode && '🎲 Estás en modo aleatorio'}
            </p>
          </div>
        </div>
      )}

      {/* ============ GOD MODE PANEL ============ */}
      {godMode && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setGodMode(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[var(--card)] border-l border-[var(--border)] shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-gradient-to-r from-purple-900/20 to-transparent shrink-0">
              <h2 className="text-lg font-bold flex items-center gap-2">
                ⚡ Modo Dios
              </h2>
              <button
                onClick={() => setGodMode(false)}
                className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[var(--border)] shrink-0">
              {(['banco', 'ia', 'aleatorio'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setGodTab(tab)}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                    godTab === tab
                      ? 'border-b-2 border-[var(--primary)] text-[var(--primary)] bg-[var(--accent)]'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/50'
                  }`}
                >
                  {tab === 'banco' && '🏦 Banco'}
                  {tab === 'ia' && '🤖 IA'}
                  {tab === 'aleatorio' && '🎲 Aleatorio'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {godTab === 'banco' && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Preguntas del banco más usadas por todos los jugadores
                  </p>
                  {Object.entries(bankStats)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 20)
                    .map(([id, count], i) => {
                      const q = QUESTIONS.find(x => x.id === id);
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]/50 border border-[var(--border)]"
                        >
                          <span className="text-xs font-mono text-[var(--muted-foreground)] w-6 text-right">{i + 1}.</span>
                          <span className="text-lg">{q?.icon || '❓'}</span>
                          <span className="flex-1 text-sm">{q?.text || id}</span>
                          <span className="font-bold text-sm text-[var(--primary)] bg-[var(--accent)] px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  {Object.keys(bankStats).length === 0 && (
                    <div className="text-center py-8 text-[var(--muted-foreground)]">
                      <p className="text-3xl mb-2">📭</p>
                      <p className="text-sm">No hay datos todavía.</p>
                      <p className="text-xs mt-1">Los datos aparecerán cuando los jugadores hagan preguntas.</p>
                    </div>
                  )}
                </div>
              )}

              {godTab === 'ia' && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Preguntas más hechas a la IA por todos los jugadores
                  </p>
                  {Object.entries(aiStats)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 20)
                    .map(([text, count], i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]/50 border border-[var(--border)]"
                      >
                        <span className="text-xs font-mono text-[var(--muted-foreground)] w-6 text-right">{i + 1}.</span>
                        <span className="text-lg">🤖</span>
                        <span className="flex-1 text-sm">{text}</span>
                        <span className="font-bold text-sm text-[var(--primary)] bg-[var(--accent)] px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      </div>
                    ))}
                  {Object.keys(aiStats).length === 0 && (
                    <div className="text-center py-8 text-[var(--muted-foreground)]">
                      <p className="text-3xl mb-2">📭</p>
                      <p className="text-sm">No hay datos todavía.</p>
                      <p className="text-xs mt-1">Los datos aparecerán cuando los jugadores pregunten a la IA.</p>
                    </div>
                  )}
                </div>
              )}

              {godTab === 'aleatorio' && (
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <p className="text-3xl mb-3">🎲</p>
                    <p className="text-sm text-[var(--muted-foreground)] mb-1">
                      Juega con una palabra aleatoria
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {WORDS.length} palabras disponibles en la base de datos
                    </p>
                  </div>

                  <button
                    onClick={playRandomWord}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-base transition-opacity hover:opacity-90 shadow-lg"
                  >
                    🎲 Jugar palabra aleatoria
                  </button>

                  {randomMode && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                      <p className="text-sm font-semibold text-amber-400">
                        🎲 Estás en modo aleatorio
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">
                        La palabra actual no es la del día. Tu partida no se guardará como resultado oficial.
                      </p>
                    </div>
                  )}

                  <div className="mt-2 p-3 rounded-lg bg-[var(--muted)]/50 border border-[var(--border)]">
                    <p className="text-xs text-[var(--muted-foreground)] text-center">
                      💡 <strong>Consejo:</strong> Usa el modo aleatorio para probar el juego y ajustar las preguntas antes de que juegue el público.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-lg text-sm font-semibold shadow-lg animate-[toastIn_0.3s_ease]"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
