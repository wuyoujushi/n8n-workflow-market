import React, { useState } from 'react';
import { PaymentProvider, Workflow } from '../types';
import { X, Lock, CreditCard, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, workflow }) => {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>(PaymentProvider.STRIPE);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
        >
          {completed ? (
             <div className="p-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-500 mb-6">You have purchased <strong>{workflow.title}</strong>.</p>
                <div className="space-y-3 w-full">
                    <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                        Download Workflow
                    </button>
                    <button onClick={onClose} className="w-full text-gray-500 py-3 hover:text-gray-700 font-medium">
                        Close
                    </button>
                </div>
             </div>
          ) : (
          <>
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Checkout</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Order Summary */}
            <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                <img src={workflow.image} alt="" className="w-16 h-16 rounded object-cover mr-4" />
                <div>
                    <h4 className="font-semibold text-gray-900 line-clamp-1">{workflow.title}</h4>
                    <p className="text-primary-600 font-bold text-lg">${workflow.price.toFixed(2)}</p>
                </div>
            </div>

            {/* Payment Method Selection */}
            <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">Select Payment Method</h4>
            <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                    onClick={() => setSelectedProvider(PaymentProvider.STRIPE)}
                    className={clsx(
                        "flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all",
                        selectedProvider === PaymentProvider.STRIPE 
                            ? "border-primary-500 bg-primary-50 text-primary-700" 
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                    )}
                >
                    <CreditCard className="w-6 h-6 mb-2" />
                    <span className="text-xs font-bold">Stripe</span>
                </button>
                <button
                    onClick={() => setSelectedProvider(PaymentProvider.PAYPAL)}
                    className={clsx(
                        "flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all",
                        selectedProvider === PaymentProvider.PAYPAL 
                            ? "border-blue-500 bg-blue-50 text-blue-700" 
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                    )}
                >
                   {/* Simplified PayPal Icon */}
                   <svg className="w-6 h-6 mb-2 fill-current" viewBox="0 0 24 24">
                       <path d="M7.076 21.337l.832-5.279h2.955c4.766 0 7.425-2.316 7.425-6.848 0-2.861-1.39-4.881-3.921-5.918-1.58-.616-3.486-.807-5.594-.807h-5.26c-.736 0-1.373.535-1.487 1.258L.013 20.306c-.07.456.284.862.744.862h4.86c.712 0 1.33-.523 1.459-1.231z"/>
                   </svg>
                    <span className="text-xs font-bold">PayPal</span>
                </button>
                <button
                    onClick={() => setSelectedProvider(PaymentProvider.CREEM)}
                    className={clsx(
                        "flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all",
                        selectedProvider === PaymentProvider.CREEM 
                            ? "border-purple-500 bg-purple-50 text-purple-700" 
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                    )}
                >
                    <div className="w-6 h-6 mb-2 rounded-full border-2 border-current flex items-center justify-center font-serif font-bold text-xs">C</div>
                    <span className="text-xs font-bold">Creem</span>
                </button>
            </div>

            {/* Simulated Form Fields */}
            {selectedProvider === PaymentProvider.STRIPE && (
                <div className="space-y-4 animate-in fade-in duration-300">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                        <div className="relative">
                            <input type="text" className="block w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-primary-500 focus:border-primary-500" placeholder="0000 0000 0000 0000" />
                            <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Expiry</label>
                            <input type="text" className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary-500 focus:border-primary-500" placeholder="MM/YY" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">CVC</label>
                            <input type="text" className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary-500 focus:border-primary-500" placeholder="123" />
                        </div>
                    </div>
                </div>
            )}
             {selectedProvider === PaymentProvider.PAYPAL && (
                 <div className="py-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg animate-in fade-in duration-300">
                     You will be redirected to PayPal to complete your purchase securely.
                 </div>
             )}
             {selectedProvider === PaymentProvider.CREEM && (
                 <div className="py-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg animate-in fade-in duration-300">
                     Pay with Creem Wallet or linked accounts. Secure and fast.
                 </div>
             )}

            <button
                onClick={handlePayment}
                disabled={processing}
                className="mt-6 w-full flex items-center justify-center bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {processing ? (
                    <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                    </>
                ) : (
                    <>
                    <Lock className="w-4 h-4 mr-2" />
                    Pay ${workflow.price.toFixed(2)}
                    </>
                )}
            </button>
            <p className="mt-3 text-center text-xs text-gray-400">
                Powered by secure payment processing.
            </p>
          </div>
          </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentModal;
