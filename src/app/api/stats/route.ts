import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDocs, getDoc, serverTimestamp } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, questionId, questionText } = body;

    if (!type || !questionId) {
      return NextResponse.json({ error: 'type and questionId are required' }, { status: 400 });
    }

    if (type === 'ai') {
      // Guardar pregunta de IA usando el texto normalizado como ID
      const normalized = (questionText || questionId).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      const ref = doc(db, 'stats', 'ai', 'questions', normalized);
      const snap = await getDoc(ref);
      const current = snap.exists() ? (snap.data().count as number) : 0;
      await setDoc(ref, { count: current + 1, text: questionText || '', updatedAt: serverTimestamp() });
    } else {
      // Guardar pregunta del banco
      const ref = doc(db, 'stats', 'bank', 'questions', questionId);
      const snap = await getDoc(ref);
      const current = snap.exists() ? (snap.data().count as number) : 0;
      await setDoc(ref, { count: current + 1, updatedAt: serverTimestamp() });
    }

    // Registrar jugada del día
    const today = new Date().toISOString().split('T')[0];
    const dayRef = doc(db, 'stats', 'daily', 'days', today);
    const daySnap = await getDoc(dayRef);
    const dayCurrent = daySnap.exists() ? (daySnap.data().count as number) : 0;
    await setDoc(dayRef, { count: dayCurrent + 1, date: today });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    // Firebase no configurado = no crashear
    console.error('Stats error:', msg);
    return NextResponse.json({ ok: true, fallback: true });
  }
}

export async function GET() {
  try {
    const bankStats: Record<string, number> = {};
    const aiStats: Record<string, number> = {};

    const bankSnap = await getDocs(collection(db, 'stats', 'bank', 'questions'));
    bankSnap.forEach(d => {
      const data = d.data();
      if (typeof data.count === 'number') bankStats[d.id] = data.count;
    });

    const aiSnap = await getDocs(collection(db, 'stats', 'ai', 'questions'));
    aiSnap.forEach(d => {
      const data = d.data();
      const label = data.text || d.id;
      if (typeof data.count === 'number') aiStats[label] = data.count;
    });

    return NextResponse.json({ bankStats, aiStats });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stats GET error:', msg);
    return NextResponse.json({ bankStats: {}, aiStats: {}, fallback: true });
  }
}
