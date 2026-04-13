import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDocs, getDoc, serverTimestamp } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionId, isAI, text, date } = body;
    if (!questionId) {
      return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
    }
    const today = date || new Date().toISOString().split('T')[0];
    if (isAI && text) {
      const normalized = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      const ref = doc(db, 'stats', 'ai', 'questions', normalized);
      const snap = await getDoc(ref);
      const current = snap.exists() ? (snap.data().count as number) : 0;
      await setDoc(ref, { count: current + 1, updatedAt: serverTimestamp() });
    } else {
      const ref = doc(db, 'stats', 'bank', 'questions', questionId);
      const snap = await getDoc(ref);
      const current = snap.exists() ? (snap.data().count as number) : 0;
      await setDoc(ref, { count: current + 1, updatedAt: serverTimestamp() });
    }
    const dayRef = doc(db, 'stats', 'daily', 'days', today);
    const daySnap = await getDoc(dayRef);
    const dayCurrent = daySnap.exists() ? (daySnap.data().count as number) : 0;
    await setDoc(dayRef, { count: dayCurrent + 1, date: today });
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    if (msg.includes('FIREBASE') || msg.includes('quota') || msg.includes('environment')) {
      return NextResponse.json({ ok: true, fallback: true });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
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
      if (typeof data.count === 'number') aiStats[d.id] = data.count;
    });
    return NextResponse.json({ bankStats, aiStats });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    if (msg.includes('FIREBASE') || msg.includes('quota') || msg.includes('environment')) {
      return NextResponse.json({ bankStats: {}, aiStats: {}, fallback: true });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}