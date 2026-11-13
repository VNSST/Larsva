// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// Runs the Kill Chess API handlers (lib/killchess/api) at /games/killchess/api/<name>.
import forgot from '@/lib/killchess/api/forgot.js';
import leaderboard from '@/lib/killchess/api/leaderboard.js';
import level from '@/lib/killchess/api/level.js';
import login from '@/lib/killchess/api/login.js';
import logout from '@/lib/killchess/api/logout.js';
import online from '@/lib/killchess/api/online.js';
import register from '@/lib/killchess/api/register.js';
import reset from '@/lib/killchess/api/reset.js';
import result from '@/lib/killchess/api/result.js';
import stats from '@/lib/killchess/api/stats.js';

type Req = { method: string; url: string; headers: Record<string, string>; query: Record<string, string>; body: unknown; kcBase: string };
type Res = {
  setHeader(name: string, value: string | number): Res;
  status(code: number): Res;
  json(data: unknown): Res;
  end(body?: string): Res;
};
type Handler = (req: Req, res: Res) => unknown;

const HANDLERS: Record<string, Handler> = {
  forgot: forgot as unknown as Handler,
  leaderboard: leaderboard as unknown as Handler,
  level: level as unknown as Handler,
  login: login as unknown as Handler,
  logout: logout as unknown as Handler,
  online: online as unknown as Handler,
  register: register as unknown as Handler,
  reset: reset as unknown as Handler,
  result: result as unknown as Handler,
  stats: stats as unknown as Handler,
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function run(request: Request, ctx: { params: Promise<{ name: string }> }): Promise<Response> {
  const { name } = await ctx.params;
  const handler = Object.hasOwn(HANDLERS, name) ? HANDLERS[name] : null;
  if (!handler) return Response.json({ error: 'Not found' }, { status: 404 });

  const url = new URL(request.url);
  const text = request.method === 'POST' ? await request.text() : '';
  let body: unknown = text || undefined;
  try { if (text) body = JSON.parse(text); } catch { /* the handler rejects bad bodies */ }
  const req: Req = {
    method: request.method, url: url.pathname + url.search, body, kcBase: '/games/killchess',
    headers: Object.fromEntries(request.headers), query: Object.fromEntries(url.searchParams)
  };

  return new Promise<Response>(resolve => {
    let code = 200;
    const headers = new Headers();
    const send = (payload: string | null) => resolve(new Response(code === 204 ? null : payload, { status: code, headers }));
    const res: Res = {
      setHeader(k, v) { headers.set(k, String(v)); return res; },
      status(c) { code = c; return res; },
      json(data) { headers.set('Content-Type', 'application/json; charset=utf-8'); send(JSON.stringify(data)); return res; },
      end(b) { send(b ?? null); return res; }
    };
    Promise.resolve(handler(req, res)).catch(e => {
      console.error(e);
      code = 500; res.json({ error: 'Server error' });
    });
  });
}

export { run as GET, run as POST, run as OPTIONS };
