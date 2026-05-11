import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home      from './Pages/Home/page';
import Gallery   from './Pages/Gallery/page';
import Services  from './Pages/Services/page';
import Contact   from './Pages/Contact/page';
import Login     from './Pages/Login/page';
import Signup    from './Pages/Signup/page';
import Dashboard from './Pages/Dashboard/page';

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
      </Routes>
    </BrowserRouter>
  );
}