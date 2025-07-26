
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Wallet, Truck } from 'lucide-react';

interface PaymentMethodSelectorProps {
  paymentMethod: 'gpay' | 'cod';
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
    <div className="glass-card-premium rounded-xl p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Payment Method</h2>
      
      <RadioGroup value={paymentMethod} onValueChange={handleRadioChange} className="space-y-4">
        <div className="flex items-center space-x-4 cursor-pointer p-4 rounded-xl glass-card-premium transition-all duration-300 hover:border-green-500/50 border-green-500/30 bg-green-500/5">
          <RadioGroupItem value="gpay" id="gpay" className="text-green-500 border-green-500" />
          <div className="flex items-center flex-1">
            <Wallet size={22} className="text-green-500 mr-3" />
            <div className="flex-1">
              <Label htmlFor="gpay" className="text-text-primary cursor-pointer font-semibold">Google Pay</Label>
              <p className="text-sm text-text-secondary mt-1">Instant payment with UPI - Most popular choice</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-green-500/10 px-2 py-1 rounded-full text-xs text-green-400 font-semibold mr-3">
              INSTANT
            </div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/1024px-Google_Pay_Logo_%282020%29.svg.png" 
              alt="Google Pay" 
              className="h-8 opacity-80" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 cursor-pointer p-4 rounded-xl glass-card-premium transition-all duration-300 hover:border-blue-500/50 border-blue-500/30 bg-blue-500/5">
          <RadioGroupItem value="cod" id="cod" className="text-blue-500 border-blue-500" />
          <div className="flex items-center flex-1">
            <Truck size={22} className="text-blue-500 mr-3" />
            <div className="flex-1">
              <Label htmlFor="cod" className="text-text-primary cursor-pointer font-semibold">Cash on Delivery</Label>
              <p className="text-sm text-text-secondary mt-1">Pay when your order arrives via Blue Dart Express</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-500/10 px-2 py-1 rounded-full text-xs text-blue-400 font-semibold mr-3">
              SECURE
            </div>
            <img 
              src="https://logowik.com/content/uploads/images/blue-dart-express4889.logowik.com.webp" 
              alt="Blue Dart" 
              className="h-7 object-contain opacity-80" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Blue_Dart_logo.svg/2560px-Blue_Dart_logo.svg.png";
              }}
            />
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
