import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: '🏛️', title: 'Grand Halls',     text: 'Capacity for 50 to 1000 guests with multiple hall styles.' },
    { icon: '🍽️', title: 'Fine Catering',   text: 'Curated menus from experienced chefs.' },
    { icon: '💐',  title: 'Full Decoration', text: 'In-house decoration team for your theme.' },
    { icon: '📸', title: 'Photography',      text: 'Professional photographers for every moment.' },
  ];

  const previewItems = [
    { src: '/images/image1.jpeg', label: 'Royal Banquet Hall' },
    { src: '/images/image2.jpg',  label: 'Luxury Wedding Stage' },
    { src: '/images/image3.jpg',  label: 'Classic Indoor Reception' },
    { src: '/images/image4.jpeg', label: 'Modern Suite' },
    { src: '/images/image5.jpg',  label: 'Rustic Barn' },
    { src: '/images/image6.jpg',  label: 'Premium Decor' },
  ];

  return (
    <>
      <Navbar />

      {/* HERO */}
        <header className="bg-black dark:bg-gray-950 text-white py-24 px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-widest mb-4 font-semibold">
            Islamabad's Premier Wedding Venue
          </p>
          <h1 className="font-heading text-5xl leading-tight mb-5 text-white">
            Your Perfect Day,<br />Beautifully Planned
          </h1>
          <p className="text-gray-300 text-lg mb-9 max-w-xl mx-auto">
            From elegant halls to world-class catering, we handle every detail so you can enjoy every moment.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate('/contact')}
              className="bg-gold text-black font-semibold px-8 py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all">
              Book Your Date
            </button>
            <button onClick={() => navigate('/gallery')}
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all">
              View Gallery
            </button>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 py-16 bg-white dark:bg-gray-900">
        {features.map((f) => (
          <div key={f.title} className="bg-amber-50 dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-heading text-gold-dark text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{f.text}</p>
          </div>
        ))}
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-16 px-10 bg-amber-50 dark:bg-gray-800">
        <h2 className="font-heading text-3xl text-gray-900 dark:text-white text-center mb-2">A Glimpse of Our Venue</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 italic mb-10">Elegance in every corner</p>
        <div className="grid grid-cols-3 gap-5 max-w-5xl mx-auto mb-9">
          {previewItems.map((item) => (
            <div key={item.label} className="relative overflow-hidden rounded-xl bg-gray-800 group">
              <img src={item.src} alt={item.label} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-semibold">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={() => navigate('/gallery')}
            className="bg-gold text-black font-semibold px-8 py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all">
            View Full Gallery
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-gold to-gold-dark py-20 px-10 text-center">
        <h2 className="font-heading text-3xl text-gray-900 mb-3">Ready to Plan Your Dream Wedding?</h2>
        <p className="text-gray-800 text-lg mb-7">Contact us today and let our expert team make your special day unforgettable.</p>
        <button onClick={() => navigate('/contact')}
          className="bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-700 transition-all">
          Book a Consultation
        </button>
      </section>

      <Footer />
    </>
  );
}