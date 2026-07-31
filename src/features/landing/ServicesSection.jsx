import { Wrench, Settings, Search, PhoneCall } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      title: 'Bike-Taxi & Two-Wheeler',
      description: 'Quick roadside assistance & service for 2-wheelers',
      image: '/assets/bike_taxi_1783519431068.png',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Auto-Rickshaw Repair',
      description: 'Dedicated mechanic dispatch for three-wheelers',
      image: '/assets/auto_rickshaw_1783519442146.png',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Cab & Car Maintenance',
      description: 'Full inspection, engine diagnostics & oil change',
      image: '/assets/cab_car_1783519453146.png',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Express Parts & Towing',
      description: '24/7 emergency pickup, parts delivery & roadside support',
      image: '/assets/parcel_box_1783519465989.png',
      bgColor: 'bg-secondary'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 inline-block">
          <h2 className="text-4xl font-display font-bold text-brandDark border-b-4 border-brandYellow pb-2">Our Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className={`${service.bgColor} rounded-3xl p-6 sm:p-10 flex items-center justify-between group hover:shadow-2xl hover:shadow-brandDark/5 transition-all duration-300 border border-transparent hover:border-brandYellow/30 cursor-pointer overflow-hidden relative`}>
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-50 -mr-10 -mt-10 blur-2xl group-hover:bg-brandYellow/20 transition-colors duration-500"></div>
              
              <div className="max-w-[60%] relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-brandDark mb-2 font-display">{service.title}</h3>
                <p className="text-brandDark/70 font-medium text-sm sm:text-base">{service.description}</p>
              </div>
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0 z-10 flex items-center justify-center">
                <img src={service.image} alt={service.title} className="w-full h-full object-contain group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-md" />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
