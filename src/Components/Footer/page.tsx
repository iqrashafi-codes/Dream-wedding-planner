import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-950 pt-16 px-10 text-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto mb-10">
        <div className="flex flex-col gap-0">
          <span className="font-heading text-gold text-2xl font-bold">Dream Wedding</span>
          <p className="text-sm text-blue-100 leading-relaxed mt-1">
            Islamabad's premier wedding hall and planning service. Making your most special day truly unforgettable.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-white font-bold mb-1">Quick Links</span>
          {[['Home','/'],['Services & Packages','/services'],['Gallery','/gallery'],['Book Now','/contact'],['Dashboard','/dashboard']].map(([label, path]) => (
            <button key={path} onClick={() => navigate(path)}
              className="text-sm text-blue-100 hover:text-gold text-left bg-transparent border-none cursor-pointer w-fit">
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-white font-bold mb-1">Our Services</span>
          {['Grand Wedding Halls','Catering & Cuisine','Stage & Decoration','Photography','Event Planning'].map((s) => (
            <span key={s} className="text-sm text-blue-100">{s}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-white font-bold mb-1">Contact Us</span>
          <span className="text-sm text-blue-100 flex gap-2">📍 Hall No. 5, Blue Area, Islamabad</span>
          <span className="text-sm text-blue-100 flex gap-2">📞 +92 51 000 0000</span>
          <span className="text-sm text-blue-100 flex gap-2">✉️ info@dreamwedding.pk</span>
          <span className="text-sm text-blue-100 flex gap-2">🕐 Mon – Sun: 9:00 AM – 9:00 PM</span>
        </div>
      </div>
      <hr className="border-gray-800 max-w-6xl mx-auto" />
      <p className="bg-black text-center text-sm text-blue-100 py-4 px-10">
        © 2025 Dream Wedding Planner. All rights reserved.
      </p>
    </footer>
  );
}