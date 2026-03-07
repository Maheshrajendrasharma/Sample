import { BrowserRouter, Routes, Route} from "react-router-dom";
import ServiceDetails from "./components/ServiceDetails";
import Home from "./components/pages/Home";
import ServicesPage from "./components/pages/ServicesPage";
import Contact from "./components/pages/Contact";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import CategoryPage from "./components/pages/CategoryPage";
import Navbar from "./components/Navbar";
import FloatingActions from "./components/FloatingActions";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import Ticker from "./components/Ticker";
import VerifiedReview from "./components/VerifiedReview";
import DetailServicePage from "./components/pages/DetailServicePage";
import BecomePartner from "./components/pages/BecomePartner";

  


/* 🔹 Layout wrapper to control visibility */
function Layout() {
  

return (
  <>
  <Navbar />
  <Ticker />

  <main className="pt-24 md:pt-32">
    <Routes>
      <Route path="/category/:categorySlug" element={<CategoryPage />} />
      <Route path="/service/:categorySlug/:serviceSlug" element={<DetailServicePage/>} />
      <Route path="/services/:id" element={<ServiceDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reviews" element={<VerifiedReview />} />
      <Route path="/become-partner" element={<BecomePartner />} />
    </Routes>
  </main>

  <FloatingActions />
  <FloatingWhatsapp />
</>
);



}
function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;


