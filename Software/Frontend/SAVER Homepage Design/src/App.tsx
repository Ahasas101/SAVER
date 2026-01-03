import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import PaymentPage from './pages/PaymentPage';

// REMOVED: mockVehicleData is no longer needed here because 
// DetailsPage fetches the data itself from the backend.

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* UPDATED ROUTE: 
              We removed "vehicleData={mockVehicleData}".
              The :vehicleNumber in the path is all DetailsPage needs 
              to fetch the correct data from your backend.
            */}
            <Route path="/details/:vehicleNumber" element={<DetailsPage />} />
            
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}