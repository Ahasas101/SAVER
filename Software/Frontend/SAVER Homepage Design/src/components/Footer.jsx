import { Clock, MapPin } from 'lucide-react';
import mainlogo from "../images/logosaverfinal.png"; // Correct path for your structure

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-50 p-1 rounded-lg">
                        <img className="w-14" src={mainlogo} alt="" />
                    </div>
                    <span className="text-xl">SAVER</span>
                    </div>
                    <p className="text-gray-400">
                    Making roads safer through technology and transparency.
                    </p>
                </div>

                <div>
                    <h4 className="mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Check Challan</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Pay Online</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4">Support</h4>
                    <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>24/7 Support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>All India Coverage</span>
                    </li>
                    </ul>
                </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 SAVER - Smart Auto Vehicle Emergency Response. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}