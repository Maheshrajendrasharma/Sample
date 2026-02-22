import HomeServiceIcons from "../HomeServiceIcons";   // 3x3 grid
import MasonrySlider from "../MasonrySlider";         // sliding images
import Services from "../Services";

export default function Home() {
  return (
    <>
      {/* Top section */}
      <section className="w-full px-4 md:px-8 lg:px-12 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT - 3x3 Service Icons */}
          <div className="lg:w-1/2 w-full">
            <HomeServiceIcons />
          </div>

          {/* RIGHT - Masonry Slider */}
          <div className="lg:w-1/2 w-full">
            <MasonrySlider />
          </div>

        </div>
      </section>

      {/* Other sections */}
      <Services />
    </>
  );
}