import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Destinations from "../components/Destinations";
import Packages from "../components/Packages";
import AboutSection from "../components/AboutSection";

function Home() {
    return (
        <>
            <Navbar />

            <Hero />

            <AboutSection />

            <Destinations />

            <Packages limit={4} />
        </>
    );
}

export default Home;