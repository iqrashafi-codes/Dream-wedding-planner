import { useState } from 'react';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

type HallType = 'all' | 'indoor' | 'outdoor';

export default function Gallery() {
  const [filter, setFilter] = useState<HallType>('all');

  const items = [
    { src: '/images/image1.jpeg', alt: 'Royal Banquet Hall',      caption: 'Royal Banquet Hall',      type: 'outdoor' as const },
    { src: '/images/image2.jpg',  alt: 'Luxury Wedding Stage',    caption: 'Luxury Wedding Stage',    type: 'indoor'  as const },
    { src: '/images/image3.jpg',  alt: 'Classic Indoor Reception',caption: 'Classic Indoor Reception',type: 'indoor'  as const },
    { src: '/images/image4.jpeg', alt: 'Modern Outdoor Suite',    caption: 'Modern Outdoor Suite',    type: 'outdoor' as const },
    { src: '/images/image5.jpg',  alt: 'Rustic Barn Interior',    caption: 'Rustic Barn Interior',    type: 'indoor'  as const },
    { src: '/images/image6.jpg',  alt: 'Premium Event Decor',     caption: 'Premium Event Decor',     type: 'indoor'  as const },
  ];

  const visible = items.filter((i) => filter === 'all' || i.type === filter);

  return (
    <>
      <Navbar />

      <div className="page-header">
        <h1 className="page-title">Our Portfolio</h1>
        <p className="page-subtitle">Browse our stunning venues and setups</p>
      </div>

      <div className="filter-section">
        <p className="filter-label">Filter by Hall Type:</p>
        <div className="filter-options">
          {(['all', 'indoor', 'outdoor'] as HallType[]).map((val) => (
            <label className="filter-radio" key={val}>
              <input type="radio" name="hallType" value={val} checked={filter === val} onChange={() => setFilter(val)} />
              {val === 'all' ? 'All Venues' : val === 'indoor' ? 'Indoor Hall' : 'Outdoor Hall'}
            </label>
          ))}
        </div>
      </div>

      <div className="gallery-grid">
        {visible.map((item) => (
          <div className="gallery-card" key={item.alt}>
            <img src={item.src} alt={item.alt} className="gallery-img" />
            <p className="img-caption">{item.caption}</p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}