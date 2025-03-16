
import React from 'react';

interface QRCodeDisplayProps {
  amount: number;
}

const QRCodeDisplay = ({ amount }: QRCodeDisplayProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <p className="text-[#F2A83B] font-medium mb-4">
        Amount: ₹{amount?.toFixed(2)}
      </p>
      
      <div className="bg-white p-4 rounded-lg mb-4">
        <img 
          src="/lovable-uploads/3072898f-0ccc-4826-9143-24cea560e44c.png" 
          alt="QR Code" 
          className="w-64 h-64 object-contain"
        />
      </div>
      
      <p className="text-white/60 text-sm">
        Scan to pay with any UPI app
      </p>
    </div>
  );
};

export default QRCodeDisplay;
