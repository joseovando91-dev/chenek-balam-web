import Navbar from '@/components/sections/navbar';
import HeroSection from '@/components/sections/hero';
import CountersSection from '@/components/sections/counters';
import ProblemSection from '@/components/sections/problem';
import SolutionSection from '@/components/sections/solution';
import Design3DSection from '@/components/sections/design-3d';
import EngineeringSection from '@/components/sections/engineering';
import ConstructionSection from '@/components/sections/construction';
import CompetitionSection from '@/components/sections/competition';
import SpecsSection from '@/components/sections/specs';
import ModelsSection from '@/components/sections/models';
import TimelineSection from '@/components/sections/timeline';
import PressSection from '@/components/sections/press';
import MissionSection from '@/components/sections/mission';
import TeamSection from '@/components/sections/team';
import GallerySection from '@/components/sections/gallery';
import SimulatorSection from '@/components/sections/simulator';
import ComparisonSection from '@/components/sections/comparison';
import LegalSection from '@/components/sections/legal';
import ContactSection from '@/components/sections/contact';
import FooterSection from '@/components/sections/footer';
import AppDownloadModal from '@/components/app-download-modal';
import WhatsAppButton from '@/components/whatsapp-button';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <CountersSection />
      <ProblemSection />
      <SolutionSection />
      <Design3DSection />
      <EngineeringSection />
      <ConstructionSection />
      <SpecsSection />
      <ModelsSection />
      <ComparisonSection />
      <TimelineSection />
      <CompetitionSection />
      <PressSection />
      <MissionSection />
      <LegalSection />
      <TeamSection />
      <GallerySection />
      <SimulatorSection />
      <ContactSection />
      <FooterSection />
      <AppDownloadModal />
      <WhatsAppButton />
    </main>
  );
}
