import { useState } from 'react';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

type HallType = 'all' | 'indoor' | 'outdoor';

export default function Gallery() {
  const [filter, setFilter] = useState<HallType>('all');

  const items = [
    { src: '/images/image1.jpeg', alt: 'Royal Banquet Hall',       caption: 'Royal Banquet Hall',       type: 'outdoor' as const },
    { src: '/images/image2.jpg',  alt: 'Luxury Wedding Stage',     caption: 'Luxury Wedding Stage',     type: 'indoor'  as const },
    { src: '/images/image3.jpg',  alt: 'Classic Indoor Reception', caption: 'Classic Indoor Reception', type: 'indoor'  as const },
    { src: '/images/image4.jpeg', alt: 'Modern Outdoor Suite',     caption: 'Modern Outdoor Suite',     type: 'outdoor' as const },
    { src: '/images/image5.jpg',  alt: 'Rustic Barn Interior',     caption: 'Rustic Barn Interior',     type: 'indoor'  as const },
    { src: '/images/image6.jpg',  alt: 'Premium Event Decor',      caption: 'Premium Event Decor',      type: 'indoor'  as const },
  ];

  const visible = items.filter((i) => filter === 'all' || i.type === filter);

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-br from-navy to-navy-dark dark:from-gray-900 dark:to-black py-12 px-10 text-center mb-0">
        <h1 className="font-heading text-4xl text-gold mb-2">Our Portfolio</h1>
        <p className="text-gray-400 text-sm">Browse our stunning venues and setups</p>
      </div>

      <div className="bg-white dark:bg-gray-900 py-8 px-10 text-center border-b border-amber-100 dark:border-gray-700">
        <p className="text-gray-800 dark:text-gray-200 font-semibold mb-4">Filter by Hall Type:</p>
        <div className="flex justify-center gap-6 flex-wrap">
          {(['all', 'indoor', 'outdoor'] as HallType[]).map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
              <input type="radio" name="hallType" value={val} checked={filter === val}
                onChange={() => setFilter(val)} className="accent-gold w-4 h-4" />
              {val === 'all' ? 'All Venues' : val === 'indoor' ? 'Indoor Hall' : 'Outdoor Hall'}
            </label>
          ))}
        </div>
      </div>

      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 py-12 px-8">
        <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
          {visible.map((item) => (
            <div key={item.alt} className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition-all">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-64 object-cover block"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <p className="py-4 px-3 font-semibold text-center text-gray-900 dark:text-white border-t border-amber-100 dark:border-gray-700 text-sm">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}