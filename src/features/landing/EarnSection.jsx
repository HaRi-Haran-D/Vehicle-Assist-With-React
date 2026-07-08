import { ArrowRight } from 'lucide-react';

export function EarnSection() {
  return (
    <section id="earn" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brandBlue rounded-[2rem] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
          
          {/* Abstract background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute w-96 h-96 bg-brandYellow rounded-full blur-[100px] -top-20 -left-20"></div>
            <div className="absolute w-96 h-96 bg-white rounded-full blur-[100px] -bottom-40 -right-20"></div>
          </div>

          <div className="md:w-1/2 relative z-10 text-white mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
              Earn with
            </h2>
            <div className="mb-8 border-b-4 border-brandYellow inline-block pb-2">
              <h2 className="text-5xl md:text-6xl font-display font-extrabold text-brandYellow">VehicleRepair</h2>
            </div>
            
            <p className="text-lg md:text-xl text-white/90 font-medium mb-10 max-w-md leading-relaxed">
              Become a Captain today. Ride when you want, work how you want, and earn on your own terms with zero compromises.
            </p>
            
            <button className="bg-brandYellow text-brandDark px-8 py-4 rounded-full font-bold text-lg hover:bg-brandYellowHover transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(249,201,34,0.4)]">
              Start Earning
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
          
          <div className="md:w-1/2 relative z-10 flex justify-center mt-8 md:mt-0">
             <div className="w-full max-w-md aspect-square bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center relative p-8 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-brandYellow/20 to-transparent rounded-full animate-spin-slow"></div>
                <img 
                  src="/assets/bike_taxi_1783519431068.png" 
                  alt="Earn with us Captain" 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -scale-x-100"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
