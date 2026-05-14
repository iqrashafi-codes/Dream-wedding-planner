import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home      from './Pages/Home/page';
import Gallery   from './Pages/Gallery/page';
import Services  from './Pages/Services/page';
import Contact   from './Pages/Contact/page';
import Login     from './Pages/Login/page';
import Signup    from './Pages/Signup/page';
import Dashboard from './Pages/Dashboard/page';
import Cart      from './Pages/Cart/page';
import Review    from './Pages/Review/page';
import Profile   from './Pages/Profile/page';
import Team      from './Pages/Team/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />}      />
        <Route path="/gallery"   element={<Gallery />}   />
        <Route path="/services"  element={<Services />}  />
        <Route path="/contact"   element={<Contact />}   />
        <Route path="/login"     element={<Login />}     />
        <Route path="/signup"    element={<Signup />}    />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart"      element={<Cart />}      />
        <Route path="/review"    element={<Review />}    />
        <Route path="/profile"   element={<Profile />}   />
        <Route path="/team"      element={<Team />}      />
      </Routes>
    </BrowserRouter>
  );
}
