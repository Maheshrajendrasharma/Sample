function Ticker() {
  return (
    <div className="fixed top-16 md:top-20 left-0 w-full z-40 bg-black text-white py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex gap-10 px-4">
          <span>✨ Flat 20% OFF on Spa Services</span>
          <span>💆‍♀️ Salon at Home Available</span>
          <span>🌿 Premium Mehendi Services</span>
          <span>💇 Hair & Beauty Experts</span>
        </div>

        {/* Duplicate block for seamless scroll */}
        <div className="flex gap-10 px-4">
          <span>✨ Flat 20% OFF on Spa Services</span>
          <span>💆‍♀️ Salon at Home Available</span>
          <span>🌿 Premium Mehendi Services</span>
          <span>💇 Hair & Beauty Experts</span>
        </div>
      </div>
    </div>
  );
}

export default Ticker;