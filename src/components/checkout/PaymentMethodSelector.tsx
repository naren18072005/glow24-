
import React from 'react';

interface PaymentMethodSelectorProps {
  paymentMethod: 'qr' | 'cod';
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PaymentMethodSelector = ({ paymentMethod, handleInputChange }: PaymentMethodSelectorProps) => {
  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
      
      <div className="space-y-3">
        <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
          <input
            type="radio"
            name="paymentMethod"
            value="qr"
            checked={paymentMethod === 'qr'}
            onChange={handleInputChange}
            className="form-radio h-5 w-5 text-[#F2A83B]"
          />
          <span className="text-white">Pay via QR Code (UPI/Google Pay/PhonePe)</span>
        </label>
        
        <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={handleInputChange}
            className="form-radio h-5 w-5 text-[#F2A83B]"
          />
          <span className="text-white">Cash on Delivery (COD)</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
