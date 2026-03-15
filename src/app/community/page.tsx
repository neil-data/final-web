import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Code2, Users, BookOpen, GitBranch, Star, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community — GDGOC IAR',
  description: 'Open source projects, study groups, and community initiatives at GDGOC IAR.',
};

const projects = [
  { title: 'GDGOC IAR Website', desc: 'The official community platform built with Next.js and TypeScript.', tags: ['Next.js', 'TypeScript', 'TailwindCSS'], stars: 24, contributors: 8, status: 'active', github: '#' },
  { title: 'Campus Navigation App', desc: 'Flutter app for IAR campus navigation with indoor maps.', tags: ['Flutter', 'Firebase', 'Maps API'], stars: 18, contributors: 5, status: 'active', github: '#' },
  { title: 'PlantAI — Disease Detector', desc: 'ML model to detect plant diseases from leaf images using TensorFlow.', tags: ['TensorFlow', 'Python', 'FastAPI'], stars: 31, contributors: 4, status: 'completed', github: '#' },
  { title: 'StudySphere', desc: 'Collaborative study platform with real-time notes and video rooms.', tags: ['React', 'WebRTC', 'Node.js'], stars: 12, contributors: 3, status: 'looking-for-contributors', github: '#' },
  { title: 'Attendance Tracker', desc: 'Smart attendance system using face recognition for IAR campus.', tags: ['OpenCV', 'Python', 'Flask'], stars: 9, contributors: 2, status: 'active', github: '#' },
  { title: 'GDG Event Bot', desc: 'Discord bot for event announcements and community management.', tags: ['Python', 'Discord.py', 'Cloud'], stars: 7, contributors: 2, status: 'active', github: '#' },
];

const studyGroups = [
  { name: 'Cloud & DevOps SIG', topic: 'Google Cloud, Kubernetes, CI/CD', members: 28, schedule: 'Every Saturday 4PM', lead: 'Kavya Reddy' },
  { name: 'Android Dev Circle', topic: 'Kotlin, Jetpack Compose, Firebase', members: 22, schedule: 'Every Sunday 6PM', lead: 'Yash Kumar' },
  { name: 'ML Study Jam', topic: 'TensorFlow, PyTorch, Vertex AI', members: 35, schedule: 'Every Friday 5PM', lead: 'Pooja Nair' },
  { name: 'Web Dev Workshop', topic: 'React, Next.js, TypeScript', members: 40, schedule: 'Alternating Thursdays 7PM', lead: 'Aditya Singh' },
  { name: 'Open Source Guild', topic: 'Git workflows, OSS contribution', members: 18, schedule: 'Every Wednesday 6PM', lead: 'Nikhil Joshi' },
];

const statusColors: Record<string, string> = {
  'active': 'text-g-green border-g-green/30 bg-g-green/10',
  'completed': 'text-white/40 border-white/10 bg-white/5',
  'looking-for-contributors': 'text-g-yellow border-g-yellow/30 bg-g-yellow/10',
};

export default function CommunityPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="bg-number">COMM</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="section-number mb-4">01 — Open Community</div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight leading-none mb-4">
            Build Together, <span className="google-gradient-text">Grow Together</span>
          </h1>
          <p className="text-white/45 text-lg max-w-xl">
            Join projects, study groups, and collaborative initiatives that define GDGOC IAR&apos;s developer culture.
          </p>
        </div>
      </section>

      {/* Open Source Projects */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle number="02" eyebrow="Open Source" title="Community " highlight="Projects" description="Code built by the community, for the community. Contribute, fork, and learn." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <GlassCard key={p.title} delay={i * 0.08} className="flex flex-col" glowColor="blue">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-g-blue/10 border border-g-blue/20 flex items-center justify-center">
                    <Code2 size={18} className="text-g-blue" />
                  </div>
                  <span className={`badge border text-[10px] ${statusColors[p.status]}`}>
                    {p.status.replace(/-/g, ' ')}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{p.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono bg-white/5 border border-white/8 text-white/50 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-white/35">
                    <span className="flex items-center gap-1"><Star size={11} className="text-g-yellow" />{p.stars}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{p.contributors}</span>
                  </div>
                  <a href={p.github} className="flex items-center gap-1 text-g-blue hover:text-white transition-colors">
                    <GitBranch size={11} /> GitHub <ExternalLink size={9} />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Study Groups */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle number="03" eyebrow="Learning Together" title="Study " highlight="Groups" description="Peer-led interest groups meeting regularly to learn and build skills together." />
          <div className="space-y-3">
            {studyGroups.map((g, i) => (
              <GlassCard key={g.name} delay={i * 0.08} className="flex flex-col sm:flex-row sm:items-center gap-4" glowColor="green">
                <div className="w-10 h-10 rounded-lg bg-g-green/10 border border-g-green/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-g-green" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm mb-0.5">{g.name}</div>
                  <div className="text-white/40 text-xs">{g.topic}</div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-white/35">
                  <span className="flex items-center gap-1"><Users size={10} />{g.members} members</span>
                  <span>{g.schedule}</span>
                  <span className="text-g-green/70">Led by {g.lead}</span>
                </div>
                <button className="btn-skew bg-transparent border border-white/10 text-white/60 text-[10px] font-mono uppercase tracking-widest px-4 py-2 hover:border-g-green/40 hover:text-g-green transition-all whitespace-nowrap flex-shrink-0">
                  <span>Join Group</span>
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
