import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from the DetailsPage link
  const { amount, vehicleNumber } = location.state || { amount: 0, vehicleNumber: 'N/A' };
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    console.log("Processing payment...");
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000); // 2-second delay to simulate processing
  };
  
  if (paymentSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your payment of ₹{amount.toLocaleString()} for vehicle {vehicleNumber} has been processed.
        </p>
        <Button onClick={() => navigate(`/details/${vehicleNumber}`)}>
          Back to Vehicle Details
        </Button>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Secure Payment</CardTitle>
            <CardDescription>
              Complete your payment for vehicle number {vehicleNumber}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6">
              <p className="font-semibold">Total Amount to Pay</p>
              <p className="text-3xl font-bold">₹{amount.toLocaleString()}</p>
            </div>
            
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <div className="relative mt-1">
                  <Input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" required />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <Input type="text" id="expiryDate" placeholder="MM / YY" required />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                  <Input type="text" id="cvc" placeholder="123" required />
                </div>
              </div>

              <div>
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <Input type="text" id="cardHolder" placeholder="Rajesh Kumar" required />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                Pay ₹{amount.toLocaleString()}
              </Button>
            </form>
             <p className="text-xs text-center text-gray-500 mt-4">This is a simulated payment page. No real transaction will occur.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}