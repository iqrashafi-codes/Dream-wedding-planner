import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

interface TeamMember {
  name:  string;
  role:  string;
  emoji: string;
  desc:  string;
  exp:   string;
}

const team: TeamMember[] = [
  {
    name:  'Ahmed Ali',
    role:  'Event Director',
    emoji: '👨‍💼',
    desc:  '10+ years experience in luxury wedding planning across Pakistan.',
    exp:   '10+ Years',
  },
  {
    name:  'Sara Hassan',
    role:  'Decoration Head',
    emoji: '💐',
    desc:  'Creative designer specializing in floral arrangements and stage setup.',
    exp:   '7 Years',
  },
  {
    name:  'Bilal Mahmood',
    role:  'Catering Manager',
    emoji: '🍽️',
    desc:  'Expert chef with experience in traditional and contemporary cuisine.',
    exp:   '8 Years',
  },
  {
    name:  'Ayesha Tariq',
    role:  'Photography Lead',
    emoji: '📸',
    desc:  'Award-winning photographer capturing precious wedding moments.',
    exp:   '6 Years',
  },
  {
    name:  'Omar Sheikh',
    role:  'Venue Coordinator',
    emoji: '🏛️',
    desc:  'Ensures every detail of the hall setup meets client expectations.',
    exp:   '5 Years',
  },
  {
    name:  'Zara Malik',
    role:  'Client Relations',
    emoji: '🤝',
    desc:  'Dedicated to making every couple feel special from the first meeting.',
    exp:   '4 Years',
  },
];

export default function Team() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-navy to-navy-dark dark:from-gray-900 dark:to-black py-12 px-10 text-center">
        <h1 className="font-heading text-4xl text-gold mb-2">Our Team</h1>
        <p className="text-gray-400 text-sm">Meet the experts behind your perfect wedding</p>
      </div>

      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 py-16 px-5 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">

          {/* Intro */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-gray-900 dark:text-white mb-3">
              The People Who Make It Happen
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Our dedicated team of professionals brings years of experience and passion to every wedding,
              ensuring your special day is truly unforgettable.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-6 shadow text-center hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                {/* Emoji Avatar */}
                <div className="w-20 h-20 bg-amber-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 group-hover:bg-gold transition-colors duration-300">
                  {member.emoji}
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{member.name}</h3>
                <p className="text-gold text-sm font-semibold mb-1">{member.role}</p>
                <span className="inline-block px-3 py-0.5 bg-amber-100 dark:bg-gray-700 text-gold-dark dark:text-gold text-xs rounded-full mb-3">
                  {member.exp} Experience
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-gradient-to-br from-gold to-gold-dark rounded-xl p-10 text-center shadow-lg">
            <h3 className="font-heading text-2xl text-gray-900 mb-2">Want to Join Our Team?</h3>
            <p className="text-gray-800 text-sm mb-6">
              We are always looking for passionate professionals to join the Dream Wedding family.
            </p>
            <a
              href="mailto:info@dreamwedding.pk"
              className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Contact Us
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
