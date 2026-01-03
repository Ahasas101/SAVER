import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Car, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Make sure these component paths are correct for your project structure
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function HomePage() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (vehicleNumber.trim()) {
      navigate(`/details/${vehicleNumber.trim().toUpperCase()}`);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-orange-100 text-orange-700 mb-4">
                Automatic Challan System
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Check Your Vehicle{" "}
                <span className="text-blue-600">Challan Status</span>{" "}
                Instantly
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Enter your vehicle number to get complete details about traffic violations, 
                overspeeding incidents, and pending challans in real-time.
              </p>

              {/* Vehicle Input Section */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <label className="block text-gray-700 font-medium mb-3">
                  Enter Vehicle Number
                </label>
                <div className="flex space-x-3">
                  <Input 
                    type="text" 
                    placeholder="e.g. DL01AB1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="flex-1 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button 
                    onClick={handleSearch}
                    className="h-12 px-6 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  We support all Indian vehicle registration formats
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1595340298390-8113ab27284a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwcG9saWNlJTIwY2FyJTIwc3BlZWQlMjBjYW1lcmF8ZW58MXx8fHwxNzU3NTAyNzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Traffic monitoring system"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Get
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive vehicle information and challan details at your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">Vehicle Details</CardTitle>
                <CardDescription>
                  Complete registration information, owner details, and vehicle specifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardHeader>
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-900">Overspeeding Records</CardTitle>
                <CardDescription>
                  Detailed information about speed violations, locations, and timestamps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Challan Status</CardTitle>
                <CardDescription>
                  Current status of all traffic challans, pending amounts, and payment options
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2.5M+</div>
              <p className="text-gray-600">Vehicles Registered</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">1.8M+</div>
              <p className="text-gray-600">Challans Processed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">System Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How SAVER Works
            </h3>
            <p className="text-xl text-gray-600">
              Simple steps to access your vehicle information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Enter Vehicle Number</h4>
              <p className="text-gray-600">
                Input your vehicle registration number in the search field
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">System Processing</h4>
              <p className="text-gray-600">
                Our AI system searches through traffic databases instantly
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Get Results</h4>
              <p className="text-gray-600">
                View detailed vehicle information and challan history
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}