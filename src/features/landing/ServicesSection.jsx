import { Wrench, Settings, Search, PhoneCall } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      title: 'General Service',
      description: 'Comprehensive checkup and oil change',
      icon: Settings,
      bgColor: 'bg-secondary'
    },
    {
      title: 'Engine Repair',
      description: 'Expert diagnostics and engine overhauls',
      icon: Wrench,
      bgColor: 'bg-secondary'
    },
    {
      title: 'Inspections',
      description: 'Pre-purchase and safety vehicle inspections',
      icon: Search,
      bgColor: 'bg-secondary'
    },
    {
      title: 'Roadside Assist',
      description: '24/7 emergency towing and support',
      icon: PhoneCall,
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
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0 z-10 flex items-center justify-center text-brandDark/80 group-hover:text-brandDark transition-colors">
                <service.icon size={80} strokeWidth={1.5} className="group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
