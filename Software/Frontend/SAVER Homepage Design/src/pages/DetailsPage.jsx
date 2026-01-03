import { useState, useEffect } from 'react'; // Import React hooks
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Info, AlertTriangle, Car, Calendar, MapPin, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { generateChallanPDF } from '../lib/pdfGenerator';

// We no longer pass in mockData as a prop
export default function DetailsPage() {
  const navigate = useNavigate();
  const { vehicleNumber } = useParams(); // Get vehicle number from URL
  
  // --- State for our data ---
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching ---
 // --- Data Fetching with Live Polling ---
  useEffect(() => {
    // This function runs when the component loads
    const fetchVehicleData = async () => {
      try {
        setLoading(true); // We can remove this if we don't want a "loading" flash every 5s
        setError(null);
        
        const response = await fetch(`http://localhost:8000/api/challans/${vehicleNumber}`);
        
        if (!response.ok) {
          throw new Error('Vehicle not found or server error');
        }
        
        const data = await response.json();
        setVehicleData(data); // Save the fetched data in our state
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    
    // 1. Fetch data immediately when the page loads
    fetchVehicleData();

    // 2. Then, set up an interval to re-fetch the data every 5 seconds
    const intervalId = setInterval(fetchVehicleData, 5000);

    // 3. This is a cleanup function. React runs this when the
    //    page is closed to prevent memory leaks.
    return () => clearInterval(intervalId);
    
  }, [vehicleNumber]); // Re-run this whole process if the vehicleNumber in the URL changes
  // --- Handler for Download Button ---
  const handleDownload = () => {
    if (vehicleData) {
      generateChallanPDF(vehicleData);
    }
  };
  
  // --- Loading State UI ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-700">Loading vehicle data...</p>
      </div>
    );
  }

  // --- Error State UI ---
  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">Failed to Load Data</h2>
        <p className="text-gray-600">{error}</p>
        <Button onClick={() => navigate('/')} className="mt-4">Back to Search</Button>
      </div>
    );
  }

  // --- Success State UI (Main Content) ---
  // We check for vehicleData before rendering
  if (!vehicleData) {
    return null; // or a "not found" component
  }

  const totalChallanAmount = vehicleData.challans.reduce((sum, challan) => sum + challan.amount, 0);
  
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>

        {/* Vehicle Summary Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2">{vehicleData.vehicleNumber}</h1>
              <p className="text-gray-600">{vehicleData.make} {vehicleData.model} • {vehicleData.year}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600 mb-1">₹{totalChallanAmount.toLocaleString()}</div>
              <p className="text-gray-600">Total Pending Amount</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side: Vehicle Details and Challans */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Vehicle Information */}
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Owner Name</p>
                    <p className="font-medium text-gray-900">{vehicleData.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Type</p>
                    <p className="font-medium text-gray-900">{vehicleData.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Registration Date</p>
                    <p className="font-medium text-gray-900">{vehicleData.registrationDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-medium text-gray-900">{vehicleData.fuelType}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Insurance Status</p>
                    <Badge className="bg-green-100 text-green-700 mt-1">
                      {vehicleData.insuranceStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Challan Details */}
            <Card className="border-2 border-orange-100">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Traffic Violations ({vehicleData.challans.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vehicleData.challans.length === 0 ? (
                  <p className="text-gray-600">No pending challans found.</p>
                ) : (
                  vehicleData.challans.map((challan) => (
                    <div key={challan._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{challan.violation}</h4>
                          <p className="text-sm text-gray-600">Challan ID: {challan._id}</p>
                        </div>
                        <Badge className="bg-red-100 text-red-700">
                          {challan.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{challan.date} at {challan.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{challan.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Speed: </span>
                          <span className="font-bold text-red-600">{challan.speed}</span>
                          <span className="text-gray-600"> (Limit: {challan.speedLimit})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-orange-600">₹{challan.amount.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-3" />
                      <p className="text-xs text-gray-500">Camera: {challan.camera}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="text-green-900">Payment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-green-900 mb-2 font-semibold">Total Amount Due</h4>
                    <p className="text-2xl font-bold text-green-600">₹{totalChallanAmount.toLocaleString()}</p>
                  </div>
                  <Link 
                    to="/payment" 
                    state={{ amount: totalChallanAmount, vehicleNumber: vehicleData.vehicleNumber }}
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={totalChallanAmount === 0}>
                      Pay All Challans Online
                    </Button>
                  </Link>
                  <Button onClick={handleDownload} variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700" disabled={totalChallanAmount === 0}>
                    Download Challan Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Vehicle Image */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-gray-100 sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Vehicle Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1565859937791-1f096cc065eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjYXIlMjBzZWRhbiUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTgyNjA1NzN8MA&ixlib.rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt={`${vehicleData.make} ${vehicleData.model}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-semibold text-gray-700">{vehicleData.make} {vehicleData.model}</p>
                  <p className="text-sm text-gray-500">{vehicleData.year} • {vehicleData.fuelType}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}