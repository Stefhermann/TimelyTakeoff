import NavBar from "@/components/navbar-section/navbar";
import Hero from "@/components/hero-section/hero";
import Feature from "@/components/feature-section/feature";
import HowTo from "@/components/how-section/howto";
import Footer from "@/components/footer-section/footer";

const LandingPage = () => {
  return (
    <main className="flex min-h-screen bg-white">
      <NavBar />
      <div>
        <Hero />
        <Feature />
        <HowTo />
        <Footer />
      </div>
    </main>
  );
};

export default LandingPage;
