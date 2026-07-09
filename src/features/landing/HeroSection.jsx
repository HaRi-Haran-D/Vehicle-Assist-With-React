import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pt-24 pb-15 md:pt-25 md:pb-28 bg-brandYellow relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-10 transform -skew-x-12 translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-brandDark leading-tight mb-6">
              India's Largest <br />
              <span className="text-white drop-shadow-md">Bike & Auto</span> App
            </h1>
            <p className="text-lg md:text-xl text-brandDark/80 mb-8 font-medium max-w-lg">
              Beat the traffic, ride quicker, and save more with every journey. Your daily commute made easy and affordable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white/30 backdrop-blur-sm text-brandDark border border-brandDark/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/50 transition-all flex items-center justify-center">
                Explore Services
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="w-[120%] aspect-square bg-white/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            {/* Real world mechanic image */}
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80"
              alt="Mechanic repairing vehicle"
              className="w-full max-w-lg mx-auto h-[450px] object-cover rounded-3xl relative z-10 shadow-2xl hover:-translate-y-4 transition-transform duration-500 border-4 border-white/20"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
