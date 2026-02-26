import CategorySlider from "./CategorySlider";
import { useState } from "react";

export default function MasonrySlider() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="grid grid-cols-2 gap-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <CategorySlider category="beauty" title="Beauty" paused={isPaused} />
      <CategorySlider category="massage" title="Massage" paused={isPaused} />
      <CategorySlider category="kitchen" title="Kitchen Services" paused={isPaused} />
      <CategorySlider category="household-repair" title="Household Repair" paused={isPaused} />
    </div>
  );
}