import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import StackPanel from "./components/StackPanel";
import FeaturedWork from "./components/FeaturedWork";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Capabilities />
      <StackPanel />
      <FeaturedWork />
      <Footer />
    </>
  );
}
