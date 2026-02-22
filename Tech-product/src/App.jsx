import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PhoneShowcase from "./components/PhoneShowcase/PhoneShowcase";
import Colors from "./components/Colors/Colors";
import Pricing from "./components/Pricing/Pricing";
import OrderCTA from "./components/OrderCTA/OrderCTA";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <Navbar />
        <Hero />
        <PhoneShowcase />
        <Colors />
        <Pricing />
        <OrderCTA />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
