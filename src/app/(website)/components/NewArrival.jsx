'use client';
import { useState } from 'react';


const NewArrivals = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const featuredProduct = {
    id: 'featured',
    name: 'Premium Metalic Mix Wallpaper Collection',
    image: 'images/NewWallpaper1.png',
    hoverImage: 'images/NewWallpaper.png',
    description: 'Transform your space with nature-inspired designs',
    badge: 'Featured',
  };

  const gridProducts = [
    {
      id: 1,
      name: 'Luxury Printed Curtains',
      image: 'images/NewCurtain.jpg',
      hoverImage: 'images/NewCurtains1.webp',
      badge: 'New',
    },
    {
      id: 2,
      name: 'Royal Wooden Flooring',
      image: 'images/NewWooden2.webp',
      hoverImage: 'images/NewWooden.webp',
      badge: 'Popular',
    },
    {
      id: 3,
      name: 'Marble Effect Wallpaper',
      image: 'images/NewMarble.png',
      hoverImage: 'images/NewMarble2.webp',
      badge: 'Trending',
    },
    {
      id: 4,
      name: 'Artificial Paradise Plant',
      image: 'images/NewArtificial1.webp',
      hoverImage: 'images/NewArtificial.webp',
      badge: 'Limited',
    },
  ];

  return (
    <section className="bg-[#EBEBEB] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center bg-white px-6 py-2 rounded-full shadow-md border border-black mb-6">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              SAI Home Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">NEW ARRIVALS</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Product */}
          <article
            className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setHoveredProduct('featured')}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative overflow-hidden bg-stone-100 aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={hoveredProduct === 'featured' ? featuredProduct.hoverImage : featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold">
                {featuredProduct.badge}
              </span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">{featuredProduct.name}</h3>
              <p className="text-gray-600">{featuredProduct.description}</p>
            </div>
          </article>

          {/* Grid Products */}
          <section className="grid grid-cols-2 gap-4 h-full">
            {gridProducts.map(({ id, name, image, hoverImage, badge }) => (
              <article
                key={id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                onMouseEnter={() => setHoveredProduct(id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden bg-stone-100 aspect-square lg:aspect-[4/3] flex-1">
                  <img
                    src={hoveredProduct === id ? hoverImage : image}
                    alt={name}
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {badge}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#A53B61] text-sm mb-1 line-clamp-1">{name}</h4>
                </div>
              </article>
            ))}
          </section>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white px-8 py-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Need Design Consultation?</h3>
              <p className="text-slate-600 mb-4">
                Our interior experts are here to help you choose the perfect products
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="tel:+919264996345"
                  className="bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-all duration-200 shadow-md transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-phone" aria-hidden="true" />
                  Call Expert
                </a>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="bg-white text-black px-6 py-3 rounded-xl border font-semibold hover:bg-pink-600 hover:text-white hover:border-white transition-all duration-200 shadow-md transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fas fa-calendar" aria-hidden="true" />
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="design-consultation-title"
        >
          <DesignConsultationForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
