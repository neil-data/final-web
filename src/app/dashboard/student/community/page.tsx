import { GlassCard } from '@/components/ui/GlassCard';
import { Code2, Users, BookOpen, GitBranch, Star, ExternalLink } from 'lucide-react';

const projects = [
  { title: 'GDGOC IAR Website', tags: ['Next.js', 'TypeScript'], stars: 24, contributors: 8, status: 'active' },
  { title: 'Campus Navigation App', tags: ['Flutter', 'Firebase'], stars: 18, contributors: 5, status: 'active' },
  { title: 'PlantAI — Disease Detector', tags: ['TensorFlow', 'Python'], stars: 31, contributors: 4, status: 'completed' },
  { title: 'StudySphere', tags: ['React', 'WebRTC'], stars: 12, contributors: 3, status: 'looking-for-contributors' },
];

const studyGroups = [
  { name: 'Cloud & DevOps SIG', members: 28, schedule: 'Every Saturday 4PM', lead: 'Kavya Reddy' },
  { name: 'Android Dev Circle', members: 22, schedule: 'Every Sunday 6PM', lead: 'Yash Kumar' },
  { name: 'ML Study Jam', members: 35, schedule: 'Every Friday 5PM', lead: 'Pooja Nair' },
];

const statusColors: Record<string, string> = {
  'active': 'text-g-green border-g-green/30 bg-g-green/10',
  'completed': 'text-white/40 border-white/10 bg-white/5',
  'looking-for-contributors': 'text-g-yellow border-g-yellow/30 bg-g-yellow/10',
};

export default function StudentCommunityPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Community</h1>
        <p className="text-white/40 text-sm font-mono mt-1">Open source projects and study groups</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="section-number mb-4">Open Source Projects</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <GlassCard key={p.title} delay={i * 0.08} glowColor="blue">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-g-blue/10 border border-g-blue/20 flex items-center justify-center">
                    <Code2 size={14} className="text-g-blue" />
                  </div>
                  <span className={`badge border text-[10px] ${statusColors[p.status]}`}>{p.status.replace(/-/g, ' ')}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{p.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map(t => <span key={t} className="text-[10px] font-mono bg-white/5 border border-white/8 text-white/50 px-2 py-0.5 rounded">{t}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-white/35">
                    <span className="flex items-center gap-1"><Star size={10} className="text-g-yellow" />{p.stars}</span>
                    <span className="flex items-center gap-1"><Users size={10} />{p.contributors}</span>
                  </div>
                  <a href="#" className="flex items-center gap-1 text-g-blue hover:text-white transition-colors">
                    <GitBranch size={10} /> GitHub <ExternalLink size={8} />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-number mb-4">Active Study Groups</h2>
          <div className="space-y-3">
            {studyGroups.map((g, i) => (
              <GlassCard key={g.name} delay={i * 0.08} className="flex flex-col sm:flex-row sm:items-center gap-4" glowColor="green">
                <div className="w-8 h-8 rounded-lg bg-g-green/10 border border-g-green/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={14} className="text-g-green" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm mb-0.5">{g.name}</div>
                  <div className="flex gap-3 text-xs font-mono text-white/35">
                    <span className="flex items-center gap-1"><Users size={9} />{g.members}</span>
                    <span>{g.schedule}</span>
                    <span className="text-g-green/60">Led by {g.lead}</span>
                  </div>
                </div>
                <button className="btn-skew bg-transparent border border-white/10 text-white/60 text-[10px] font-mono uppercase tracking-widest px-4 py-2 hover:border-g-green/40 hover:text-g-green transition-all whitespace-nowrap">
                  <span>Join</span>
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
