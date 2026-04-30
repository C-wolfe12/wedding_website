import Navigation from '@/src/components/Navigation';
import Hero from '@/src/components/Hero';
import OurStory from '@/src/components/OurStory';
import EventDetails from '@/src/components/EventDetails';
import Directions from '@/src/components/Directions';
import RSVP from '@/src/components/RSVP';
import Registry from '@/src/components/Registry';
import Travel from '@/src/components/Travel';
import FAQ from '@/src/components/FAQ';
import Footer from '@/src/components/Footer';

/**
 * Home page component - renders the complete wedding website
 */
export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <OurStory />
      <EventDetails />
      <Directions />
      <RSVP />
      <Registry />
      <Travel />
      <FAQ />
      <Footer />
    </div>
  );
}
