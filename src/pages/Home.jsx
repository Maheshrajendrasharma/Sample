import HomeServiceIcons from "../components/HomeServiceIcons";
import HomeSlider from "../components/HomeSlider";
import Services from "../components/Services";
import BookingCTA from "../components/BookingCTA";

export default function Home() {
  return (
    <>
      {/* Top section */}
      <section className="home-layout">
        <div className="home-left">
          <HomeServiceIcons />
        </div>

        <div className="home-right">
          <HomeSlider />
        </div>
      </section>

      {/* Other sections */}
      <Services />
      <BookingCTA />
    </>
  );
}
