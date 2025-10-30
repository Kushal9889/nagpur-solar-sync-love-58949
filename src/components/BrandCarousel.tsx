
import React from 'react';

const BrandCarousel: React.FC = () => {
  const brands = [
    { name: 'Waaree', logo: '/lovable-uploads/waaree-logo.png' },
    { name: 'Adani Solar', logo: '/lovable-uploads/adani-logo.png' },
    { name: 'Tata Solar', logo: '/lovable-uploads/tata-logo.png' },
    { name: 'Luminous', logo: '/lovable-uploads/luminous-logo.png' },
    { name: 'Vikram Solar', logo: '/lovable-uploads/vikram-logo.png' },
    { name: 'Panasonic', logo: '/lovable-uploads/panasonic-logo.png' },
    { name: 'LONGi', logo: '/lovable-uploads/longi-logo.png' },
    { name: 'JA Solar', logo: '/lovable-uploads/ja-solar-logo.png' }
  ];

  return (
    <section className="py-16 px-4 bg-white/10 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Premium Solar Brands We Offer</h2>
          <p className="text-xl text-gray-200">Trusted by 500+ satisfied customers across Nagpur</p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-brands">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 group cursor-pointer transform hover:scale-110 transition-all duration-300"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-[#FFC107]/50 transition-all duration-300 w-40 h-32 flex flex-col items-center justify-center">
                  <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden items-center justify-center text-gray-500 text-xs font-bold">
                      {brand.name}
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#1A3C34] text-center">{brand.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
