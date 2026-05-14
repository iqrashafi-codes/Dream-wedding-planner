import { useState } from 'react';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  since: string;
}

const defaultProfile: ProfileData = {
  name:     'Iqra Shafi',
  email:    'iqra@email.com',
  phone:    '+92 300 0000000',
  location: 'Islamabad, Pakistan',
  since:    'January 2025',
};

export default function Profile() {
  const [profile, setProfile]   = useState<ProfileData>(defaultProfile);
  const [editing, setEditing]   = useState(false);
  const [draft,   setDraft]     = useState<ProfileData>(defaultProfile);
  const [alert,   setAlert]     = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
    setAlert(null);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.email.trim()) {
      setAlert({ msg: 'Name and email are required.', type: 'error' });
      return;
    }
    setProfile({ ...draft });
    setEditing(false);
    setAlert({ msg: 'Profile updated successfully!', type: 'success' });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleCancel = () => {
    setEditing(false);
    setAlert(null);
  };

  const fields: { label: string; key: keyof ProfileData; type: string }[] = [
    { label: 'Full Name',    key: 'name',     type: 'text'  },
    { label: 'Email',        key: 'email',    type: 'email' },
    { label: 'Phone',        key: 'phone',    type: 'tel'   },
    { label: 'Location',     key: 'location', type: 'text'  },
    { label: 'Member Since', key: 'since',    type: 'text'  },
  ];

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-navy to-navy-dark dark:from-gray-900 dark:to-black py-12 px-10 text-center">
        <h1 className="font-heading text-4xl text-gold mb-2">My Profile</h1>
        <p className="text-gray-400 text-sm">Manage your account details</p>
      </div>

      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 py-16 px-5 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">

          {alert && (
            <div className={`rounded-lg px-4 py-3 mb-6 text-sm font-medium ${
              alert.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {alert.msg}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-10 shadow-lg">

            {/* Avatar */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center text-black font-bold text-4xl mx-auto mb-4 shadow-lg">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-amber-100 dark:bg-gray-700 text-gold-dark dark:text-gold text-xs font-semibold rounded-full">
                Member since {profile.since}
              </span>
            </div>

            {/* View Mode */}
            {!editing ? (
              <>
                <div className="grid grid-cols-1 gap-1 mb-6">
                  {fields.map((f) => (
                    <div
                      key={f.key}
                      className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700"
                    >
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">{f.label}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{profile[f.key]}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startEdit}
                  className="w-full bg-gold text-black font-semibold py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all"
                >
                  ✏️ Edit Profile
                </button>
              </>
            ) : (
              /* Edit Mode */
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={draft[f.key]}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 border border-amber-100 dark:border-gray-600 rounded-lg text-sm bg-amber-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gold focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900"
                    />
                  </div>
                ))}
                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gold text-black font-semibold py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
