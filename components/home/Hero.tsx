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

    interface Particle {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number;
    }

    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function createParticles() {
      if (!canvas) return;
      particles = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 15000), 60);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.05,
        });
      }
    }

    function animate() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 75, 244, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108, 75, 244, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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
    createParticles();
    animate();

    const handleResize = () => { resize(); createParticles(); };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center gradient-hero overflow-hidden px-6 md:px-10 pt-[120px] pb-24">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Ambient glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(108,75,244,0.12),transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(56,189,248,0.08),transparent_70%)] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[900px] text-center flex flex-col items-center">
        {/* Badge */}
        <div className="animate-fade-in-down inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 font-display font-medium text-sm text-white/70 mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-purple)] animate-pulse-dot" />
          Rapid-Delivery Tech Consulting
        </div>

        {/* Headline — Editorial serif for authority */}
        <h1 className="animate-fade-in-up delay-100 font-serif font-bold text-[clamp(2.8rem,6.5vw,5.2rem)] leading-[1.06] tracking-[-0.02em] text-white mb-6">
          Turn Ideas Into<br />
          Reality in Just{' '}
          <span className="gradient-text">14 Days.</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-white/50 max-w-[580px] leading-relaxed mb-10">
          We build MVPs, websites, and mobile apps at lightning speed — so you can launch before the competition even starts.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 items-center justify-center mb-16 w-full sm:w-auto">
          <Link href="/contact" className="btn-primary w-full sm:w-auto justify-center text-[1.05rem] py-[18px] px-10">
            Start Your Project
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/process" className="btn-outline-light w-full sm:w-auto justify-center py-[18px] px-10">
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
            const duration = 1800;
            const start = performance.now();

            function step(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
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
    <div ref={ref} className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-center gap-10 sm:gap-0">
      <div className="text-center px-8">
        <span className="font-serif font-bold text-4xl text-white" data-target="50">0</span>
        <span className="font-serif font-bold text-4xl gradient-text">+</span>
        <span className="block text-xs text-white/30 mt-1 font-medium tracking-wide uppercase">Projects Shipped</span>
      </div>
      <div className="w-px h-12 bg-white/8 hidden sm:block" />
      <div className="w-12 h-px bg-white/8 sm:hidden" />
      <div className="text-center px-8">
        <span className="font-serif font-bold text-4xl text-white" data-target="14">0</span>
        <span className="font-serif font-bold text-4xl gradient-text"> Days</span>
        <span className="block text-xs text-white/30 mt-1 font-medium tracking-wide uppercase">Avg. Delivery</span>
      </div>
      <div className="w-px h-12 bg-white/8 hidden sm:block" />
      <div className="w-12 h-px bg-white/8 sm:hidden" />
      <div className="text-center px-8">
        <span className="font-serif font-bold text-4xl text-white" data-target="100">0</span>
        <span className="font-serif font-bold text-4xl gradient-text">%</span>
        <span className="block text-xs text-white/30 mt-1 font-medium tracking-wide uppercase">Client Satisfaction</span>
      </div>
    </div>
  );
}
