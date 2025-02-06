import Hero from "./landing/hero";
import Features from "./landing/features";
import Testimonials from "./landing/testimonials";

function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
}

export default Home;
