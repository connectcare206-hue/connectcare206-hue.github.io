import React, { useEffect } from 'react';
import pages from '../seoPages.json';
import { PROCESS_STEPS } from '../constants';

export const SEO_PAGES = pages as any[];

export const SeoLinks: React.FC<{ go: (to: string) => void; current?: string }> = ({ go, current }) => (
  <nav aria-label="Staffing services" className="container mx-auto px-6 py-12">
    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-purple-400 mb-6">Remote staffing services</h2>
    <ul className="flex flex-wrap gap-x-8 gap-y-3">
      {SEO_PAGES.filter(p => p.slug !== current).map(p => (
        <li key={p.slug}>
          <a href={`/${p.slug}`} onClick={e => { e.preventDefault(); go(`/${p.slug}`); }} className="text-slate-400 hover:text-white underline-offset-4 hover:underline">{p.name}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export const LandingPage: React.FC<{ page: any; go: (to: string) => void; onContact: () => void }> = ({ page, go, onContact }) => {
  useEffect(() => {
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://connectcare.co.in/${page.slug}`);
  }, [page]);

  return (
    <article className="container mx-auto px-6 pt-36 pb-16 max-w-4xl">
      <p className="text-sm text-slate-500 mb-6"><a href="/" onClick={e => { e.preventDefault(); go('/'); }} className="hover:text-white">Home</a> / {page.name}</p>
      <h1 className="font-heading font-extrabold tracking-tighter leading-tight text-4xl md:text-6xl mb-8">{page.h1}</h1>
      <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12">{page.intro}</p>
      {page.sections.map((s: any) => (
        <section key={s.h} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{s.h}</h2>
          {s.p && <p className="text-slate-400 leading-relaxed">{s.p}</p>}
          {s.list && <ul className="list-disc pl-6 space-y-2 text-slate-400">{s.list.map((i: string) => <li key={i}>{i}</li>)}</ul>}
        </section>
      ))}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">How Hiring Works</h2>
        <ol className="space-y-3 text-slate-400">{PROCESS_STEPS.map(s => <li key={s.number}><strong className="text-white">{s.title}.</strong> {s.description}</li>)}</ol>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        {page.faqs.map((f: any) => (
          <div key={f.q} className="mb-5"><h3 className="font-semibold text-white">{f.q}</h3><p className="text-slate-400">{f.a}</p></div>
        ))}
      </section>
      <button onClick={onContact} className="btn-neon px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em]">Book a Consultation</button>
    </article>
  );
};
