import Navbar from "../../components/landing/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import TrustedCompanies from "../../components/landing/TrustedCompanies/TrustedCompanies";
import DashboardShowcase from "../../components/landing/DashboardShowcase/DashboardShowcase";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import Features from "../../components/landing/Features/Features";
import CTA from "../../components/landing/CTA/CTA";
import Footer from "../../components/landing/Footer/Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <DashboardShowcase />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}

export default Landing;