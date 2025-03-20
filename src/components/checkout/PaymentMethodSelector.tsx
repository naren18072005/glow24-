
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CreditCard, QrCode, Wallet } from 'lucide-react';

interface PaymentMethodSelectorProps {
  paymentMethod: 'razorpay' | 'qr' | 'cod';
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PaymentMethodSelector = ({ paymentMethod, handleInputChange }: PaymentMethodSelectorProps) => {
  // Custom handler for RadioGroup since it has a different event structure
  const handleRadioChange = (value: string) => {
    handleInputChange({
      target: {
        name: 'paymentMethod',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
      
      <RadioGroup value={paymentMethod} onValueChange={handleRadioChange} className="space-y-3">
        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5 border border-[#F2A83B]/20">
          <RadioGroupItem value="razorpay" id="razorpay" className="text-[#F2A83B]" />
          <div className="flex items-center">
            <CreditCard size={20} className="text-[#F2A83B] mr-2" />
            <div>
              <Label htmlFor="razorpay" className="text-white cursor-pointer">Pay Online (Credit/Debit Card, UPI, Wallets)</Label>
              <p className="text-xs text-white/60 mt-1">Secure payment via Razorpay</p>
            </div>
          </div>
          <div className="ml-auto flex space-x-1">
            <img src="https://cdn.razorpay.com/static/assets/logo/cards/visa.svg" alt="Visa" className="h-6" />
            <img src="https://cdn.razorpay.com/static/assets/logo/cards/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="https://cdn.razorpay.com/static/assets/logo/cards/rupay.svg" alt="RuPay" className="h-6" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
          <RadioGroupItem value="qr" id="qr" className="text-[#F2A83B]" />
          <div className="flex items-center">
            <QrCode size={20} className="text-[#F2A83B] mr-2" />
            <div>
              <Label htmlFor="qr" className="text-white cursor-pointer">Pay via QR Code (UPI/Google Pay/PhonePe)</Label>
              <p className="text-xs text-white/60 mt-1">Scan and pay with any UPI app</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
          <RadioGroupItem value="cod" id="cod" className="text-[#F2A83B]" />
          <div className="flex items-center">
            <ShieldCheck size={20} className="text-[#F2A83B] mr-2" />
            <div>
              <Label htmlFor="cod" className="text-white cursor-pointer">Cash on Delivery (COD)</Label>
              <p className="text-xs text-white/60 mt-1">Pay when you receive your order</p>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
