import { ArrowRight, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EarnSection() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleStartEarning = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <section id="earn" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brandBlue rounded-[2rem] p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-2xl">

          {/* Abstract background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute w-96 h-96 bg-brandYellow rounded-full blur-[100px] -top-20 -left-20"></div>
            <div className="absolute w-96 h-96 bg-white rounded-full blur-[100px] -bottom-40 -right-20"></div>
          </div>

          <div className="w-full lg:w-1/2 relative z-10 text-white text-left flex flex-col items-start min-w-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-2 tracking-tight">
              Earn with
            </h2>
            <div className="mb-4 sm:mb-6 border-b-4 border-brandYellow inline-block pb-1 sm:pb-2">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold text-brandYellow tracking-tight break-words">
                VehicleRepair
              </h2>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium mb-6 lg:mb-8 max-w-md leading-relaxed">
              Join as a Mechanic today. Work when you want, repair on your own terms, and boost your earnings with zero compromises.
            </p>

            {/* Mobile/Tablet layout (< lg): Button on LEFT, Small Icon on RIGHT */}
            <div className="flex lg:hidden items-center justify-between w-full gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleStartEarning}
                className="bg-brandYellow text-brandDark px-5 sm:px-7 py-3.5 rounded-full font-bold text-sm sm:text-base hover:bg-brandYellowHover transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(165,207,131,0.4)] active:scale-95 cursor-pointer shrink-0"
              >
                <span>Start Earning</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>

              <div className="w-16 h-16 sm:w-20 sm:h-20 aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center relative p-1 shadow-xl shrink-0 overflow-hidden">
                <img src="/partner_mechanic.png" alt="Partner Mechanic" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            {/* Desktop Button (>= lg) */}
            <button
              onClick={handleStartEarning}
              className="hidden lg:flex bg-brandYellow text-brandDark px-8 py-4 rounded-full font-bold text-lg hover:bg-brandYellowHover transition-all items-center justify-center gap-2 group shadow-[0_0_20px_rgba(165,207,131,0.4)] active:scale-95 cursor-pointer"
            >
              <span>Start Earning</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>

          {/* Desktop Partner Mechanic Image Circle (>= lg) */}
          <div className="hidden lg:flex w-1/2 relative z-10 justify-center items-center">
            <div className="w-72 h-72 lg:w-80 lg:h-80 aspect-square bg-white/10 backdrop-blur-md border-4 border-white/20 rounded-full flex items-center justify-center relative p-2 shadow-2xl overflow-hidden group">
              <img src="/partner_mechanic.png" alt="Partner Mechanic" className="w-full h-full object-cover rounded-full relative z-10 transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
