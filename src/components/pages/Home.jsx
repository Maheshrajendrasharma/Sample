import HomeServiceIcons from "../HomeServiceIcons";
import HomeSlider from "../HomeSlider";
import Services from "../Services";



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

    </>
  );
}
