// import AboutSection from "../components/AboutSection/AboutSection";
// import Footer from "../components/Footer/Footer";
// import FranchiseMap from "../components/FranchiseMap/FranchiseMap";
import AboutSection from "../../components/AboutSection/AboutSection";
import HeroSection from "../../components/HeroSection/HeroSection";
import MissionVision from "../../components/MissionVision/MissionVision";
import FranchiseMap from "../../components/FranchiseMap/FranchiseMap";
// import HeroSection from "../components/HeroSection/HeroSection";
// import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <HeroSection />
        {/* Rest of your components */}
        <div style={{ display: "flex" }}>
          <AboutSection />
        </div>
        <MissionVision />
        <FranchiseMap />
        {/* <FranchiseMap /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Home;
