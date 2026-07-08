export function ServicesSection() {
  const services = [
    {
      title: 'Bike-Taxi',
      description: 'Beat traffic, ride quicker',
      image: '/assets/bike_taxi_1783519431068.png',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Auto',
      description: 'Everyday autos, made easy',
      image: '/assets/auto_rickshaw_1783519442146.png',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Cab',
      description: 'Comfort for every journey',
      image: '/assets/cab_car_1783519453146.png',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Parcel',
      description: 'Quick, secure & insured deliveries',
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
              <div className="w-28 h-28 sm:w-40 sm:h-40 relative flex-shrink-0 z-10">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
