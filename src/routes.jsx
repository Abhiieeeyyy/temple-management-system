import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Donation from './pages/Donation'
import PoojaDetails from './pages/PoojaDetails'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import About from './pages/About'
import AdminPanel from './pages/AdminPanel'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import AvailableSoon from './components/AvailableSoon'

const AppRoutes = () => {
  console.log('AppRoutes rendering')

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* ========== POOJA BOOKING PAGE ========== */}
      {/* Uncomment line below to enable Pooja Booking, comment to show Available Soon */}
      {/*<Route path="/pooja-details" element={<PoojaDetails />} />*/}
      {<Route path="/pooja-details" element={<AvailableSoon pageName="Pooja Booking" />} /> }
      
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* ========== DONATION PAGE ========== */}
      {/* Uncomment line below to enable Donation, comment to show Available Soon */}
      {/*<Route path="/donation" element={<Donation />} />*/}
      {<Route path="/donation" element={<AvailableSoon pageName="Donation" />} /> }
      
      {/* Admin login route */}
      <Route path="/admin" element={<AdminLogin />} />
      
      {/* Protected admin panel route */}
      <Route 
        path="/admin-panel" 
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } 
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
