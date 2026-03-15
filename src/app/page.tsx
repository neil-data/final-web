import HeroSection from '@/components/home/HeroSection';
import CommunityImpactSection from '@/components/home/CommunityImpactSection';
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection';
import LeaderboardPreviewSection from '@/components/home/LeaderboardPreviewSection';
import MediaPreviewSection from '@/components/home/MediaPreviewSection';
import TeamPreviewSection from '@/components/home/TeamPreviewSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CommunityImpactSection />
      <UpcomingEventsSection />
      <LeaderboardPreviewSection />
      <MediaPreviewSection />
      <TeamPreviewSection />
    </>
  );
}
