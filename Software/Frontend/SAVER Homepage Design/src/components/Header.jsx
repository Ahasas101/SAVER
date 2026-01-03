import { Link } from 'react-router-dom';
import mainlogo from "../images/logosaverfinal.png"; 

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b-2 border-blue-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            {/* Image Constraint Wrapper */}
            <div className="flex-shrink-0"> 
              <img 
                className="h-10 w-auto object-contain" /* Fixed height to 40px (h-10), width auto */
                src={mainlogo} 
                alt="SAVER Logo" 
              />
            </div>
            
            {/* Text Section */}
            <div className="flex flex-col justify-center">
              <h1 className="font-semibold text-blue-600 text-xl leading-none tracking-wide">
                SAVER
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">
                Smart Automated Vehicle Overspeed Regulator
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </nav>

        </div>
      </div>
    </header>
  );
}