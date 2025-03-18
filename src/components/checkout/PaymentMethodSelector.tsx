
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CreditCard, QrCode } from 'lucide-react';

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
        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
          <RadioGroupItem value="razorpay" id="razorpay" className="text-[#F2A83B]" />
          <CreditCard size={20} className="text-[#F2A83B] mr-2" />
          <Label htmlFor="razorpay" className="text-white cursor-pointer">Pay Online (Credit/Debit Card, UPI, Wallets)</Label>
        </div>
        
        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
          <RadioGroupItem value="qr" id="qr" className="text-[#F2A83B]" />
          <QrCode size={20} className="text-[#F2A83B] mr-2" />
          <Label htmlFor="qr" className="text-white cursor-pointer">Pay via QR Code (UPI/Google Pay/PhonePe)</Label>
        </div>
        
        <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
          <RadioGroupItem value="cod" id="cod" className="text-[#F2A83B]" />
          <ShieldCheck size={20} className="text-[#F2A83B] mr-2" />
          <Label htmlFor="cod" className="text-white cursor-pointer">Cash on Delivery (COD)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
