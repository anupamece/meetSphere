import React from 'react';
import HeroSection from '../components/home/HeroSection.jsx';
import FeaturesSection from '../components/home/FeaturesSection.jsx';
import HowItWorksSection from '../components/home/HowItWorksSection.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import SecuritySection from '../components/home/SecuritySection.jsx';
import Footer from '../components/common/Footer.jsx';

const HomePage = () => {
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

export default HomePage;
