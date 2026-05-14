import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
}

const sampleItems: CartItem[] = [
  { id: '1', name: 'Royal Floral Arch',     category: 'Decoration',  price: 85000,  qty: 1 },
  { id: '2', name: 'Premium Catering (50p)', category: 'Catering',    price: 250000, qty: 1 },
  { id: '3', name: 'Bridal Photography Pkg', category: 'Photography', price: 120000, qty: 1 },
];

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(sampleItems);
  const [alert, setAlert] = useState<string | null>(null);

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems(items.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    setAlert('Booking request sent! We will contact you within 24 hours.');
    setItems([]);
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-navy to-navy-dark dark:from-gray-900 dark:to-black py-12 px-10 text-center">
        <h1 className="font-heading text-4xl text-gold mb-2">Your Cart</h1>
        <p className="text-gray-400 text-sm">Review your selected packages</p>
      </div>

      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 py-16 px-5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">

          {alert && (
            <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-3 mb-6 text-sm font-medium">
              {alert}
            </div>
          )}

          {items.length === 0 && !alert ? (
            /* Empty State */
            <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-16 shadow text-center">
              <div className="text-7xl mb-5">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Your cart is empty</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Browse our services and add packages to your cart</p>
              <button
                onClick={() => navigate('/services')}
                className="bg-gold text-black font-semibold px-8 py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all"
              >
                Browse Services
              </button>
            </div>
          ) : items.length > 0 ? (
            <div className="flex flex-col gap-6">

              {/* Cart Items */}
              <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-amber-100 dark:border-gray-700">
                  <h2 className="font-heading text-xl text-gray-900 dark:text-white">
                    Cart Items <span className="text-gray-400 dark:text-gray-500 text-base font-normal">({items.length})</span>
                  </h2>
                </div>

                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-6 py-5 gap-4 ${
                      idx < items.length - 1 ? 'border-b border-amber-100 dark:border-gray-700' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.category}</p>
                    </div>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gold hover:text-black transition-all text-sm"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gold hover:text-black transition-all text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-28">
                      <p className="font-bold text-gold text-sm">{(item.price * item.qty).toLocaleString()} PKR</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.price.toLocaleString()} each</p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-600 dark:hover:text-red-400 transition-colors text-lg ml-2"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-6 shadow">
                <h2 className="font-heading text-xl text-gray-900 dark:text-white mb-4">Order Summary</h2>
                <div className="flex flex-col gap-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{item.name} × {item.qty}</span>
                      <span>{(item.price * item.qty).toLocaleString()} PKR</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-amber-100 dark:border-gray-700 pt-4 flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900 dark:text-white text-lg">Total</span>
                  <span className="font-bold text-gold text-xl">{total.toLocaleString()} PKR</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gold text-black font-semibold py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="w-full mt-3 bg-transparent border-2 border-gold text-gold font-semibold py-3 rounded-lg hover:bg-gold hover:text-black transition-all"
                >
                  Continue Browsing
                </button>
              </div>

            </div>
          ) : null}

        </div>
      </div>

      <Footer />
    </>
  );
}
