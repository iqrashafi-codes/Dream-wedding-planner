import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Services() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-br from-navy to-navy-dark dark:from-gray-900 dark:to-black py-12 px-10 text-center">
        <h1 className="font-heading text-4xl text-gold mb-2">Our Packages</h1>
        <p className="text-gray-400 text-sm">Choose the plan that suits your celebration</p>
      </div>

      <div className="bg-white dark:bg-gray-900 py-16 px-10">
        <h2 className="font-heading text-3xl text-gray-900 dark:text-white text-center mb-2">Wedding Packages</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 italic mb-10">All packages include hall booking, staff, and basic decor</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-3xl mx-auto">

          <div className="bg-amber-50 dark:bg-gray-800 border-2 border-amber-100 dark:border-gray-700 rounded-xl p-10 text-center hover:shadow-xl hover:-translate-y-1 hover:border-gold transition-all">
            <h3 className="font-heading text-2xl text-gray-400 mb-2">Silver Package</h3>
            <p className="text-3xl font-bold mb-5 dark:text-white">140,700 PKR</p>
            <ul className="list-none mb-7 text-left">
              {['Hall capacity: up to 200 guests','Basic floral decoration','Standard catering menu','4-hour booking slot','Parking included'].map((f) => (
                <li key={f} className="py-2 border-b border-amber-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">{f}</li>
              ))}
            </ul>
            <button onClick={() => navigate('/contact')}
              className="bg-gold text-black font-semibold px-8 py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all">
              Book Silver
            </button>
          </div>

          <div className="bg-amber-50 dark:bg-gray-800 border-2 border-amber-100 dark:border-gray-700 rounded-xl p-10 text-center hover:shadow-xl hover:-translate-y-1 hover:border-gold transition-all">
            <h3 className="font-heading text-2xl text-gold-dark mb-2">Gold Package</h3>
            <p className="text-3xl font-bold mb-5 dark:text-white">281,400 PKR</p>
            <ul className="list-none mb-7 text-left">
              {['Hall capacity: up to 500 guests','Premium floral decoration','Full catering menu with dessert','8-hour booking slot','Photography included'].map((f) => (
                <li key={f} className="py-2 border-b border-amber-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">{f}</li>
              ))}
            </ul>
            <button onClick={() => navigate('/contact')}
              className="bg-gold text-black font-semibold px-8 py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all">
              Book Gold
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}