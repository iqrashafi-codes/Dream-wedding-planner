import { useState } from 'react';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '', guests: '', message: '' });
  const [alert, setAlert] = useState<{ msg: string; type: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventDate || !form.guests) {
      setAlert({ msg: 'Please fill in all required fields.', type: 'error' }); return;
    }
    setAlert({ msg: 'Booking request sent! We will contact you within 24 hours.', type: 'success' });
    setForm({ name: '', email: '', phone: '', eventDate: '', guests: '', message: '' });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-gray-900 py-10 px-5">
        <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-12 w-full max-w-md shadow-lg">
          <h2 className="font-heading text-3xl text-gold-dark text-center mb-2">Book Your Date</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">Fill out the form and we will get back to you within 24 hours</p>

          {alert && (
            <div className={`rounded-lg px-4 py-3 mb-5 text-sm ${alert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { id: 'name',      label: 'Full Name *',          type: 'text',   placeholder: 'Your full name'     },
              { id: 'email',     label: 'Email Address *',      type: 'email',  placeholder: 'your@email.com'     },
              { id: 'phone',     label: 'Phone Number',         type: 'tel',    placeholder: '+92 300 0000000'    },
              { id: 'eventDate', label: 'Event Date *',         type: 'date',   placeholder: ''                   },
              { id: 'guests',    label: 'Number of Guests *',   type: 'number', placeholder: 'e.g. 300'           },
              { id: 'message',   label: 'Special Requirements', type: 'text',   placeholder: 'Any special requests'},
            ].map((f) => (
              <div key={f.id} className="mb-5">
                <label htmlFor={f.id} className="block text-sm font-semibold text-gray-800 mb-1">{f.label}</label>
                <input type={f.type} id={f.id} placeholder={f.placeholder} value={(form as any)[f.id]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-100 dark:border-gray-600 rounded-lg text-sm bg-amber-50 dark:bg-gray-700 dark:text-white text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-yellow-200" />
              </div>
            ))}
            <button type="submit"
              className="w-full bg-gold text-black font-semibold py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all mt-2">
              Send Booking Request
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-500">
            Need help? Call us at <strong>+92 51 000 0000</strong>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}