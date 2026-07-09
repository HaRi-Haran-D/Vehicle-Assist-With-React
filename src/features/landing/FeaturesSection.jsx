import { Shield, Clock, MapPin, Wrench } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'Quick Service',
      description: 'Get your vehicle serviced in no time. Our experts are always ready.',
      icon: Clock,
    },
    {
      title: 'Expert Mechanics',
      description: 'Transparent pricing with no hidden charges. Affordable repairs every time.',
      icon: Wrench,
    },
    {
      title: 'Trusted Garages',
      description: 'Extensive network of verified mechanics ensuring you get support wherever you are.',
      icon: MapPin,
    },
    {
      title: 'Quality Guaranteed',
      description: 'Verified mechanics and genuine parts for your peace of mind.',
      icon: Shield,
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
            Experience the best in class features designed for your vehicle's health and safety.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-xl shadow-brandDark/5 border border-borderLight hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brandYellow/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brandYellow transition-colors duration-500">
                <feature.icon size={40} className="text-brandYellow group-hover:text-brandDark transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-brandDark mb-3 font-display">{feature.title}</h3>
              <p className="text-brandDark/70 mb-4 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
