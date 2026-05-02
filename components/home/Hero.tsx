'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 };

    interface Shape {
      x: number; y: number; size: number;
      type: string; speedX: number; speedY: number;
      rotation: number; rotationSpeed: number; color: string;
    }

    let shapes: Shape[] = [];

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function createShapes() {
      if (!canvas) return;
      shapes = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 25000), 30);
      const types = ['circle', 'square', 'triangle', 'ring'];

      for (let i = 0; i < count; i++) {
        shapes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 40 + 15,
          type: types[Math.floor(Math.random() * types.length)],
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          color: Math.random() > 0.5
            ? `rgba(124, 58, 237, ${Math.random() * 0.12 + 0.04})`
            : `rgba(56, 189, 248, ${Math.random() * 0.1 + 0.03})`,
        });
      }
    }

    function drawShape(shape: Shape) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 1.5;
      const s = shape.size;

      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(-s / 2, -s / 2, s, s);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -s / 2);
          ctx.lineTo(s / 2, s / 2);
          ctx.lineTo(-s / 2, s / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'ring':
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
      }
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      shapes.forEach((shape) => {
        const dx = mouse.x - shape.x;
        const dy = mouse.y - shape.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          shape.x -= dx * 0.01;
          shape.y -= dy * 0.01;
        }
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;
        if (shape.x < -50) shape.x = w + 50;
        if (shape.x > w + 50) shape.x = -50;
        if (shape.y < -50) shape.y = h + 50;
        if (shape.y > h + 50) shape.y = -50;
        drawShape(shape);
      });

      animationId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouse = { x: -1000, y: -1000 }; };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    resize();
    createShapes();
    animate();

    const handleResize = () => { resize(); createShapes(); };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden px-8 pt-[120px] pb-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-[800px] text-center flex flex-col items-center">
        {/* Badge */}
        <div className="animate-fade-in-down inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/8 border border-purple-500/12 font-display font-medium text-sm text-[var(--color-accent-purple)] mb-7">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-purple)] animate-pulse-dot" />
          Think It. Ship It. Done.
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 font-display font-bold text-[clamp(2.8rem,6vw,5rem)] leading-[1.08] tracking-tighter mb-5">
          Turn Ideas Into<br />
          Reality in Just<br />
          <span className="gradient-text">2 Weeks.</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up delay-200 font-display font-semibold text-xl text-[var(--color-accent-purple)] tracking-[2px] uppercase mb-4">
          No Fluff. Just Fast Shipping.
        </p>

        {/* Description */}
        <p className="animate-fade-in-up delay-300 text-lg text-[var(--color-text-secondary)] max-w-[560px] leading-relaxed mb-9">
          We build MVPs, websites, and mobile apps at lightning speed —
          so you can launch before the competition even starts.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 items-center justify-center mb-14 w-full sm:w-auto">
          <Link href="/contact" className="btn-primary w-full sm:w-auto justify-center">
            Let&apos;s Build Something Epic
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/process" className="btn-secondary w-full sm:w-auto justify-center">
            See How It Works
          </Link>
        </div>

        {/* Stats */}
        <Stats />
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          el.querySelectorAll('[data-target]').forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            const duration = 1500;
            const start = performance.now();

            function step(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(eased * target).toString();
              if (progress < 1) requestAnimationFrame(step);
              else counter.textContent = target.toString();
            }
            requestAnimationFrame(step);
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-center gap-8 sm:gap-8">
      <div className="text-center">
        <span className="font-display font-bold text-3xl" data-target="50">0</span>
        <span className="font-display font-bold text-3xl text-[var(--color-accent-purple)]">+</span>
        <span className="block text-xs text-[var(--color-text-muted)] mt-0.5 font-medium">Projects Shipped</span>
      </div>
      <div className="w-px h-10 bg-purple-200/20 hidden sm:block" />
      <div className="w-10 h-px bg-purple-200/20 sm:hidden" />
      <div className="text-center">
        <span className="font-display font-bold text-3xl" data-target="14">0</span>
        <span className="font-display font-bold text-3xl text-[var(--color-accent-purple)]"> Days</span>
        <span className="block text-xs text-[var(--color-text-muted)] mt-0.5 font-medium">Avg. Delivery</span>
      </div>
      <div className="w-px h-10 bg-purple-200/20 hidden sm:block" />
      <div className="w-10 h-px bg-purple-200/20 sm:hidden" />
      <div className="text-center">
        <span className="font-display font-bold text-3xl" data-target="100">0</span>
        <span className="font-display font-bold text-3xl text-[var(--color-accent-purple)]">%</span>
        <span className="block text-xs text-[var(--color-text-muted)] mt-0.5 font-medium">Client Satisfaction</span>
      </div>
    </div>
  );
}
