import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { getBadgeColor } from '@/lib/utils';
import { Star, Award, Calendar, Code2 } from 'lucide-react';

const student = {
  name: 'Vikram Tiwari',
  email: 'vikram@iar.ac.in',
  phone: '+91 98765 00001',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=VikramT',
  bio: 'Passionate about web development and open source. Aspiring Full Stack Developer.',
  github: 'github.com/vikram',
  linkedin: 'linkedin.com/in/vikram',
  points: 1750,
  rank: 17,
  eventsAttended: 5,
  contributions: 6,
  badge: 'rising-star' as const,
  joinedDate: '2024-08-15',
};

const achievements = [
  { icon: '🚀', title: 'First Launch', desc: 'Attended your first GDGOC event', color: 'text-g-blue', earnedAt: '2024-08-20' },
  { icon: '⭐', title: 'Rising Star', desc: 'Earned 1000+ community points', color: 'text-g-yellow', earnedAt: '2024-10-05' },
  { icon: '💻', title: 'Code Contributor', desc: 'Made first OSS contribution', color: 'text-g-green', earnedAt: '2024-11-12' },
  { icon: '🏆', title: 'Hackathon Finalist', desc: 'Reached top 10 at HackIAR', color: 'text-g-red', earnedAt: '2024-12-08' },
  { icon: '☁️', title: 'Cloud Scholar', desc: 'Completed Google Cloud Study Jam', color: 'text-g-blue', earnedAt: '2024-09-30' },
];

export default function StudentProfilePage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">My Profile</h1>
        <p className="text-white/40 text-sm font-mono mt-1">Manage your profile and view achievements</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard animate={false} className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-g-blue/30">
              <Image src={student.avatar} alt={student.name} fill className="object-cover" />
            </div>
            <div className="font-semibold text-white text-lg mb-0.5">{student.name}</div>
            <div className="text-white/35 text-xs font-mono mb-3">{student.email}</div>
            <Badge variant={getBadgeColor(student.badge)} className="mb-4 capitalize">
              {student.badge.replace('-', ' ')}
            </Badge>
            <div className="separator-line my-4" />
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
              <div>
                <div className="flex items-center justify-center gap-1 text-g-blue font-bold text-xl">
                  <Star size={14} />{student.points.toLocaleString()}
                </div>
                <div className="text-white/25 text-[10px] font-mono uppercase">Points</div>
              </div>
              <div>
                <div className="text-g-green font-bold text-xl">#{student.rank}</div>
                <div className="text-white/25 text-[10px] font-mono uppercase">Rank</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-white font-bold text-xl">
                  <Calendar size={14} />{student.eventsAttended}
                </div>
                <div className="text-white/25 text-[10px] font-mono uppercase">Events</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-white font-bold text-xl">
                  <Code2 size={14} />{student.contributions}
                </div>
                <div className="text-white/25 text-[10px] font-mono uppercase">Contributions</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Edit form + Achievements */}
        <div className="lg:col-span-3 space-y-6">
          <GlassCard animate={false}>
            <h2 className="section-number mb-5">Edit Profile</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Full Name</label>
                  <input defaultValue={student.name} className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Email</label>
                  <input defaultValue={student.email} className="form-input" type="email" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Bio</label>
                <textarea defaultValue={student.bio} className="form-input resize-none" rows={3} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">GitHub</label>
                  <input defaultValue={student.github} className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">LinkedIn</label>
                  <input defaultValue={student.linkedin} className="form-input" />
                </div>
              </div>
              <button type="submit" className="btn-skew bg-g-blue border border-g-blue text-white text-xs font-mono uppercase tracking-widest px-6 py-2.5 hover:bg-g-blue/80 transition-all">
                <span>Save Changes</span>
              </button>
            </form>
          </GlassCard>

          {/* Achievements */}
          <GlassCard animate={false}>
            <h2 className="section-number mb-5 flex items-center gap-2"><Award size={13} /> Achievements</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-2xl flex-shrink-0">{a.icon}</span>
                  <div>
                    <div className={`text-sm font-semibold ${a.color}`}>{a.title}</div>
                    <div className="text-white/35 text-xs leading-relaxed">{a.desc}</div>
                    <div className="text-white/20 text-[10px] font-mono mt-1">{a.earnedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
