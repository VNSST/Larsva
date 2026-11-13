// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// Loads the rules engine straight from index.html, so the server and the game always use identical rules.
const fs = require('fs');
const path = require('path');

let E = null;
function engine() {
  if (E) return E;
  // index.html at the project root (Vercel), or the larsva.com copy under public/games/killchess.
  const file = [process.env.KC_ENGINE_HTML, 'index.html', 'public/games/killchess/index.html']
    .filter(Boolean).map(f => path.resolve(process.cwd(), f)).find(f => fs.existsSync(f));
  const html = fs.readFileSync(file, 'utf8');
  const script = html.split('<script>').slice(1).map(x => x.split('</script>')[0]).find(x => x.includes('const ENGINE'));
  const m = { exports: {} };
  new Function('module', 'document', script)(m, undefined);
  return (E = m.exports);
}

// Replays moves (UCI strings, e.g. ["e2e3", "b7b5", ...]) from the start.
// Returns { s, reps } (final position and repetition counts), or null if any move is illegal
// or is played after the game already ended.
function replay(moves) {
  if (!Array.isArray(moves) || moves.length > 1200) return null;
  const E = engine();
  let s = E.start();
  const reps = new Map([[E.key(s), 1]]);
  for (const u of moves) {
    if (typeof u !== 'string' || outcome(s, reps)) return null;
    const m = E.fromUci(s, u);
    if (!m) return null;
    s = E.make(s, m);
    const k = E.key(s);
    reps.set(k, (reps.get(k) || 0) + 1);
  }
  return { s, reps };
}

// How the position ends, with the same wording as the game: { winner: 'w'|'b'|null, reason } or null.
function outcome(s, reps) {
  const E = engine();
  const name = c => c === 'w' ? 'White' : 'Black';
  if (!E.legalMoves(s).length) {   // the side with no moves wins
    return { winner: s.turn, reason: E.count(s, s.turn) === 0 ? `${name(s.turn)} lost all their pieces` : `${name(s.turn)} has no legal moves` };
  }
  if (E.bishopsCantMeet(s)) return { winner: null, reason: 'Bishops on opposite colours can never capture each other' };
  if (s.half >= 100) return { winner: null, reason: '50 moves without a capture or pawn move' };
  if ((reps.get(E.key(s)) || 0) >= 3) return { winner: null, reason: 'Same position three times' };
  return null;
}

// For a finished game: { winner: 'w' | 'b' | null }. null if a move is illegal or the game isn't finished.
function judge(moves) {
  if (!Array.isArray(moves) || moves.length === 0) return null;
  const r = replay(moves);
  const o = r && outcome(r.s, r.reps);
  return o ? { winner: o.winner } : null;
}

module.exports = { judge, replay, outcome, engine };
