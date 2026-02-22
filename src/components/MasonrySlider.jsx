import CategorySlider from "./CategorySlider";

export default function MasonrySlider() {
  return (
    <div className="grid grid-cols-2 gap-6 h-[520px]">

      {/* Beauty */}
      <div className="h-full">
        <CategorySlider category="beauty" title="Beauty" />
      </div>

      {/* Massage */}
      <div className="h-full">
        <CategorySlider category="massage" title="Massage" />
      </div>

      {/* Kitchen */}
      <div className="h-full">
        <CategorySlider category="kitchen" title="Kitchen Services" />
      </div>

      {/* Household Repair */}
      <div className="h-full">
        <CategorySlider category="household-repair" title="Household Repair" />
      </div>

    </div>
  );
}