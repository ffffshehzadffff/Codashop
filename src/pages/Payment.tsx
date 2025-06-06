import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, CheckCircle, ArrowLeft } from 'lucide-react';

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { package: selectedPackage, playerId, game } = location.state || {};

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'easypaisa',
      name: 'EasyPaisa',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Mobile wallet payment'
    },
    {
      id: 'jazzcash',
      name: 'JazzCash',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Mobile wallet payment'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Building className="w-6 h-6" />,
      description: 'Direct bank transfer'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setIsCompleted(true);
    
    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No payment information found</h2>
          <button
            onClick={() => navigate('/pubg-mobile')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go Back to PUBG Mobile
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-gray-800 rounded-lg p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">
            Your {selectedPackage.amount} UC has been added to your {game} account.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-400">Player ID:</div>
            <div className="text-white font-mono">{playerId}</div>
          </div>
          <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Purchase</h1>
            <p className="text-gray-400">Choose your preferred payment method</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                      selectedMethod === method.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`${selectedMethod === method.id ? 'text-purple-400' : 'text-gray-400'}`}>
                        {method.icon}
                      </div>
                      <span className="text-white font-medium">{method.name}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            {selectedMethod === 'card' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Card Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {(selectedMethod === 'easypaisa' || selectedMethod === 'jazzcash') && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Mobile Wallet Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="+92 300 1234567"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      MPIN
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your MPIN"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'bank' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Bank Transfer Details</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-white mb-2">Please transfer the amount to:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank:</span>
                      <span className="text-white">Allied Bank Limited</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account:</span>
                      <span className="text-white font-mono">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Title:</span>
                      <span className="text-white">Codashop Pakistan</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">UC</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{selectedPackage.amount} UC</h4>
                    <p className="text-gray-400 text-sm">{game}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Player ID:</span>
                    <span className="text-white font-mono">{playerId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Package:</span>
                    <span className="text-white">{selectedPackage.amount} UC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">${selectedPackage.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing Fee:</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total:</span>
                      <span className="text-xl font-bold text-white">${selectedPackage.price}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    isProcessing
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105'
                  }`}
                >
                  {isProcessing ? 'Processing Payment...' : `Pay $${selectedPackage.price}`}
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;