import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Users, Target, Lightbulb, Globe, BookOpen, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — GDGOC IAR',
  description: 'Learn about GDGOC at the Institute of Advanced Research — our mission, history, and values.',
};

const values = [
  { icon: <Target size={22} className="text-g-blue" />, title: 'Mission', description: 'Empower students with Google technologies and create a culture of continuous learning, collaboration, and innovation.' },
  { icon: <Lightbulb size={22} className="text-g-yellow" />, title: 'Vision', description: 'To build a thriving developer ecosystem at IAR where every student becomes a confident, job-ready technologist.' },
  { icon: <Globe size={22} className="text-g-green" />, title: 'Community', description: 'We are part of a global network of 700+ GDG chapters. Local impact, global presence.' },
];

const milestones = [
  { year: '2023', event: 'Chapter Founded', detail: 'GDGOC IAR officially established with 30 founding members.' },
  { year: 'Mar 2023', event: 'First Event', detail: 'Kickoff Meetup & Introduction to Google Cloud — 80+ attendees.' },
  { year: 'Sep 2023', event: 'First Hackathon', detail: 'HackIAR 2023 — 150 participants, 40 projects, 3 winners.' },
  { year: 'Jan 2024', event: 'DevFest IAR', detail: 'Full-day DevFest with 10 speakers and 300+ attendees.' },
  { year: 'Aug 2024', event: '500 Members', detail: 'Community crosses the 500-member milestone.' },
  { year: '2025', event: 'HackIAR 2025', detail: 'Flagship annual hackathon — ₹5 Lakh prizes, 300 participants.' },
];

const programs = [
  { icon: <Code size={20} />, name: 'Google Cloud Study Jams', color: 'text-g-blue', desc: 'Hands-on labs & Qwiklabs badges' },
  { icon: <BookOpen size={20} />, name: 'Android Study Jams', color: 'text-g-green', desc: 'Kotlin & Jetpack Compose bootcamps' },
  { icon: <Users size={20} />, name: 'Google Solution Challenge', color: 'text-g-red', desc: 'UN SDG-aligned project competition' },
  { icon: <Globe size={20} />, name: 'DevFest', color: 'text-g-yellow', desc: 'Annual global developer festival' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="bg-number">ABOUT</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="section-number mb-6">01 — Who We Are</div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
              Building <span className="google-gradient-text">Developers</span>,<br />
              Not Just Skills.
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              GDGOC IAR (Google Developer Groups On Campus at the Institute of Advanced Research) is a student-led developer community recognized by Google. We organize workshops, hackathons, study jams, and tech talks to help students master modern technologies and build real-world products.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
            <div className="flex flex-col items-center py-8"><AnimatedCounter value={500} suffix="+" label="Members" color="blue" /></div>
            <div className="flex flex-col items-center py-8"><AnimatedCounter value={40} suffix="+" label="Events" color="green" /></div>
            <div className="flex flex-col items-center py-8"><AnimatedCounter value={3} suffix="+" label="Years Active" color="yellow" /></div>
            <div className="flex flex-col items-center py-8"><AnimatedCounter value={8} suffix="+" label="Industry Partners" color="red" /></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle number="02" eyebrow="Our Foundation" title="What " highlight="Drives Us" description="Three pillars that define every initiative, event, and decision at GDGOC IAR." center />
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <GlassCard key={v.title} delay={i * 0.1} className="text-center">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mx-auto mb-4">{v.icon}</div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{v.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle number="03" eyebrow="Our Journey" title="Chapter " highlight="Timeline" description="From founding to flourishing — a brief history of GDGOC IAR." />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-g-blue/40 via-g-green/30 to-transparent hidden md:block" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <GlassCard key={m.year} delay={i * 0.1} className="md:ml-16 relative">
                  <div className="absolute -left-[52px] top-6 w-6 h-6 rounded-full border-2 border-g-blue bg-dark-bg hidden md:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-g-blue" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="font-mono text-g-blue text-xs tracking-widest whitespace-nowrap pt-0.5 min-w-[80px]">{m.year}</div>
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{m.event}</div>
                      <div className="text-white/40 text-xs leading-relaxed">{m.detail}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle number="04" eyebrow="Google Programs" title="Official " highlight="Google Programs" description="We run Google's flagship developer programs, customized for our campus community." center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programs.map((p, i) => (
              <GlassCard key={p.name} delay={i * 0.1} className="text-center">
                <div className={`${p.color} mb-3 flex justify-center`}>{p.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{p.name}</div>
                <div className="text-white/35 text-xs">{p.desc}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
