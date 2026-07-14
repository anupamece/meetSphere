import HeroSection from "../components/Dining/HeroSection";
import FooterSection from "../components/Dining/FooterSection";
import FeatureSection from "../components/Dining/FeatureSection";

const Dining = () => {
  return (
    <div className="bg-white">

      <HeroSection  />

      <FeatureSection
        image="https://socialoffline.in/cdn/uploads/Romantic-Restaurnts-in-Bengalore.webp"
        title="Discover"
        reverse={false}
      />

      <FeatureSection
        image="https://wp-otstatic.opentable.com/uploads/sites/468/2021/09/b2bblog_dinebookinginsights_square-1.webp"
        title="Book"
        reverse={true}
      />

      <FeatureSection
        image="https://www.shutterstock.com/image-photo/close-man-using-cell-phone-260nw-2621026591.jpg"
        title="Pay"
        reverse={false}
      />

      <FooterSection />

    </div>
  );
};
export default Dining