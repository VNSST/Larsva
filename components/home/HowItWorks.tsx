import { steps } from '@/data/services';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section-dark" aria-labelledby="how-it-works-heading">
      <div className="container-site">
        <div className="max-w-[640px]">
          <p className="eyebrow">How it works</p>
          <h2 id="how-it-works-heading" className="h-section mt-3">Three steps from brief to launch</h2>
        </div>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)] font-display text-lg font-bold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
