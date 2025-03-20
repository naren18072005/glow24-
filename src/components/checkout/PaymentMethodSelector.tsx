
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CreditCard, QrCode, Wallet } from 'lucide-react';

interface PaymentMethodSelectorProps {
  paymentMethod: 'razorpay' | 'qr' | 'cod' | 'gpay';
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
        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5 border border-[#F2A83B]/30 bg-[#F2A83B]/5">
          <RadioGroupItem value="razorpay" id="razorpay" className="text-[#F2A83B]" />
          <div className="flex items-center">
            <CreditCard size={20} className="text-[#F2A83B] mr-2" />
            <div>
              <Label htmlFor="razorpay" className="text-white cursor-pointer">Secure Online Payment</Label>
              <p className="text-xs text-white/60 mt-1">Pay securely with Credit/Debit Card, UPI, or Wallet</p>
            </div>
          </div>
          <div className="ml-auto flex space-x-1">
            <img src="https://cdn.razorpay.com/static/assets/logo/cards/visa.svg" alt="Visa" className="h-6" />
            <img src="https://cdn.razorpay.com/static/assets/logo/cards/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="https://cdn.razorpay.com/static/assets/logo/cards/rupay.svg" alt="RuPay" className="h-6" />
          </div>
        </div>

        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5 border border-green-500/30 bg-green-500/5">
          <RadioGroupItem value="gpay" id="gpay" className="text-green-500" />
          <div className="flex items-center">
            <Wallet size={20} className="text-green-500 mr-2" />
            <div>
              <Label htmlFor="gpay" className="text-white cursor-pointer">Google Pay (GPay)</Label>
              <p className="text-xs text-white/60 mt-1">Pay directly with Google Pay</p>
            </div>
          </div>
          <div className="ml-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/1024px-Google_Pay_Logo_%282020%29.svg.png" alt="Google Pay" className="h-8" />
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
