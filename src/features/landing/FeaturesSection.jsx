import { Shield, Clock, MapPin, Wallet } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'Quick Pickup',
      description: 'Get a ride in minutes. Our captains are always around the corner.',
      icon: Clock,
      image: '/assets/cab_car_1783519453146.png'
    },
    {
      title: 'Best Fares',
      description: 'Transparent pricing with no hidden charges. Affordable rides every time.',
      icon: Wallet,
      image: '/assets/auto_rickshaw_1783519442146.png'
    },
    {
      title: 'Never Too Far',
      description: 'Extensive network coverage ensuring you get a ride wherever you are.',
      icon: MapPin,
      image: '/assets/bike_taxi_1783519431068.png'
    },
    {
      title: 'Safe & Secure',
      description: 'Verified captains and real-time ride tracking for your peace of mind.',
      icon: Shield,
      image: '/assets/parcel_box_1783519465989.png'
    }
  ];

  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block border-b-4 border-brandYellow pb-2 mb-4">
             <h2 className="text-4xl md:text-5xl font-display font-bold text-brandDark">What We Offer</h2>
          </div>
          <p className="text-brandDark/70 text-lg max-w-2xl mx-auto font-medium">
            Experience the best in class features designed for your comfort and safety.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-xl shadow-brandDark/5 border border-borderLight hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-brandYellow/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandYellow transition-colors duration-500">
                <feature.icon size={32} className="text-brandYellow group-hover:text-brandDark transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-brandDark mb-3 font-display">{feature.title}</h3>
              <p className="text-brandDark/70 mb-8 text-sm leading-relaxed">{feature.description}</p>
              
              <div className="w-full aspect-video bg-gradient-to-br from-secondary to-primary rounded-2xl overflow-hidden relative flex items-center justify-center border border-borderLight group-hover:border-brandYellow/50 transition-colors duration-500">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-3/4 h-3/4 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
