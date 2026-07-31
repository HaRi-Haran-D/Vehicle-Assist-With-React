import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleBookService = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-28 bg-brandYellow relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-10 transform -skew-x-12 translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-display font-extrabold text-brandDark leading-tight mb-6">
              Stuck on the Road? <br />
              <span className="text-white drop-shadow-md">We’ve Got You </span>Covered.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-brandDark/85 mb-8 font-medium max-w-lg leading-relaxed">
              Get expert mechanics at your doorstep or visit our trusted garages. Fast, reliable, and transparent vehicle servicing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBookService}
                className="bg-brandDark text-white hover:bg-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group cursor-pointer active:scale-95 border-2 border-brandDark"
              >
                <span>Book a Service</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="w-[120%] aspect-square bg-white/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            {/* Real world mechanic image */}
            <img
              src="/assets/repair_bike_car.png"
              alt="Mechanic repairing vehicle"
              className="w-full max-w-lg mx-auto h-[450px] object-cover rounded-3xl relative z-10 shadow-2xl hover:-translate-y-4 transition-transform duration-500 border-4 border-white/20"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
