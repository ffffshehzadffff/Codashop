import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, Clock, CreditCard } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const PubgMobile: React.FC = () => {
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, addOrder } = useUser();
  const navigate = useNavigate();

  const ucPackages = [
    { id: 1, amount: 60, price: 0.99, popular: false },
    { id: 2, amount: 300, price: 4.99, popular: false },
    { id: 3, amount: 600, price: 9.99, popular: true },
    { id: 4, amount: 1500, price: 24.99, popular: false },
    { id: 5, amount: 1800, price: 29.99, popular: false },
    { id: 6, amount: 3000, price: 49.99, popular: false },
    { id: 7, amount: 6000, price: 99.99, popular: false },
    { id: 8, amount: 8100, price: 134.99, popular: false }
  ];

  const handlePurchase = async () => {
    if (!playerId || !selectedPackage) return;
    
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedPkg = ucPackages.find(pkg => pkg.id === selectedPackage);
    if (selectedPkg) {
      addOrder({
        game: 'PUBG Mobile',
        product: `${selectedPkg.amount} UC`,
        amount: selectedPkg.amount,
        price: selectedPkg.price,
        playerId
      });
      
      navigate('/payment', { 
        state: { 
          package: selectedPkg, 
          playerId,
          game: 'PUBG Mobile'
        } 
      });
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative mb-6">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop"
              alt="PUBG Mobile"
              className="w-24 h-24 rounded-xl mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">PUBG Mobile UC Top Up</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get your Unknown Cash instantly and dominate the battleground. Fast, secure, and reliable top-up service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Player ID Input */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Enter Player Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Player ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    placeholder="Enter your PUBG Mobile Player ID"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    You can find your Player ID in the game settings under "Basic Info"
                  </p>
                </div>
              </div>
            </div>

            {/* UC Packages */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Select UC Package</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ucPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{pkg.amount}</div>
                      <div className="text-sm text-gray-400 mb-2">UC</div>
                      <div className="text-lg font-semibold text-purple-400">${pkg.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Summary */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Purchase Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Game:</span>
                  <span className="text-white">PUBG Mobile</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Player ID:</span>
                  <span className="text-white">{playerId || 'Not entered'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Package:</span>
                  <span className="text-white">
                    {selectedPackage 
                      ? `${ucPackages.find(p => p.id === selectedPackage)?.amount} UC`
                      : 'Not selected'
                    }
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-xl font-bold text-white">
                      ${selectedPackage 
                        ? ucPackages.find(p => p.id === selectedPackage)?.price 
                        : '0.00'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={!playerId || !selectedPackage || isProcessing}
                className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-all ${
                  !playerId || !selectedPackage || isProcessing
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">Instant delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">100% secure payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">Trusted by millions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-300">Multiple payment options</span>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">"Super fast delivery! Got my UC in seconds."</p>
                  <p className="text-xs text-gray-500 mt-1">- Gaming Pro</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">"Best prices and reliable service!"</p>
                  <p className="text-xs text-gray-500 mt-1">- PUBG Master</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PubgMobile;