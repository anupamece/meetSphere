import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import ServicesSection from '../components/home/ServicesSection';
import SecuritySection from '../components/home/SecuritySection';
import Footer from '../components/home/Footer';

const homepage = () => {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark transition-colors duration-300">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Overview */}
      <FeaturesSection />

      {/* How it Works Step-by-Step */}
      <HowItWorksSection />

      {/* Services/Events Powered */}
      <ServicesSection />

      {/* Security & Secure Payments Detail */}
      <SecuritySection />

      {/* Footer at Bottom */}
      <Footer />

    </div>
  );
};

export default homepage;