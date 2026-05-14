import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

const reviews = [
  { name: 'Ayesha Khan',    rating: 5, comment: 'Absolutely magical wedding experience! Every detail was perfect.', date: 'March 2025'    },
  { name: 'Bilal Ahmed',    rating: 5, comment: 'The hall decoration was stunning and the catering was excellent.',  date: 'February 2025' },
  { name: 'Sara Malik',     rating: 4, comment: 'Very professional team. Made our special day truly unforgettable.', date: 'January 2025'  },
  { name: 'Usman Tariq',    rating: 5, comment: 'Best wedding venue in Islamabad. Highly recommended!',              date: 'December 2024' },
  { name: 'Fatima Sheikh',  rating: 4, comment: 'Beautiful venue and great service. Staff was very cooperative.',    date: 'November 2024' },
  { name: 'Hassan Raza',    rating: 5, comment: 'Photography team was outstanding. Memories captured perfectly.',    date: 'October 2024'  },
];

export default function Review() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-navy to-navy-dark py-12 px-10 text-center">
        <h1 className="font-heading text-4xl text-gold mb-2">Customer Reviews</h1>
        <p className="text-gray-400 text-sm">What our happy couples say about us</p>
      </div>
      <div className="max-w-5xl mx-auto py-16 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {r.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{r.name}</h3>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
                {Array.from({ length: 5 - r.rating }).map((_, i) => (
                  <span key={i} className="text-gray-300 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">"{r.comment}"</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}