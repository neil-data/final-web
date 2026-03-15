import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockEvents } from '@/data/events';
import { getCategoryColor, getStatusColor, formatDateShort } from '@/lib/utils';
import { Calendar, MapPin, Clock } from 'lucide-react';

const myEvents = mockEvents.slice(0, 3);
const upcomingEvents = mockEvents.filter(e => e.status !== 'completed').slice(0, 5);

export default function StudentMyEventsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">My Events</h1>
        <p className="text-white/40 text-sm font-mono mt-1">Events you&apos;ve registered for and upcoming opportunities</p>
      </div>

      <div className="space-y-8">
        {/* Registered events */}
        <div>
          <h2 className="section-number mb-4">Registered Events</h2>
          <div className="space-y-3">
            {myEvents.map((event, i) => (
              <GlassCard key={event.id} delay={i * 0.06} className="flex gap-4 py-4 px-5">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={event.banner} alt={event.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-1.5">
                    <Badge variant={getCategoryColor(event.category)}>{event.category}</Badge>
                    <Badge variant={getStatusColor(event.status)}>{event.status.replace('-', ' ')}</Badge>
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1 truncate">{event.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs font-mono text-white/35">
                    <span className="flex items-center gap-1"><Calendar size={10} />{formatDateShort(event.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} />{event.location}</span>
                  </div>
                </div>
                <Link href={`/events/${event.id}`} className="text-xs font-mono text-g-blue hover:text-white flex-shrink-0 self-center">Details →</Link>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* More upcoming */}
        <div>
          <h2 className="section-number mb-4">Upcoming Events (All)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {upcomingEvents.map((event, i) => (
              <GlassCard key={event.id} delay={i * 0.07} className="flex gap-3 py-3 px-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={event.banner} alt={event.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate mb-0.5">{event.title}</div>
                  <div className="text-xs text-white/35 font-mono">{formatDateShort(event.date)}</div>
                </div>
                <Link href={`/events/${event.id}`} className="text-xs font-mono text-g-blue flex-shrink-0 self-center text-[10px]">View →</Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
