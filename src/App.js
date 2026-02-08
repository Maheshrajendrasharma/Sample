import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar";
import FloatingActions from "./components/FloatingActions";
import LeftBookingButton from "./components/LeftBookingButton";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import Ticker from "./components/Ticker";

/* 🔹 Layout wrapper to control visibility */
function Layout() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <>
      <Navbar />
      <Ticker />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* ✅ Book Now hidden ONLY on Contact page */}
      {!isContactPage && <LeftBookingButton />}

      <FloatingActions />
      <FloatingWhatsapp />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="Sample">
      <Layout />
    </BrowserRouter>
  );
}

export default App;


