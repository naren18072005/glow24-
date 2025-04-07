
import React from 'react';
import { motion } from 'framer-motion';

interface QRCodeDisplayProps {
  amount: number;
}

const QRCodeDisplay = ({ amount }: QRCodeDisplayProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-[#F2A83B] font-medium mb-4 text-lg">
        Amount: ₹{amount?.toFixed(2)}
      </p>
      
      <motion.div 
        className="bg-white p-4 rounded-lg mb-4 shadow-lg shadow-white/10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
      >
        <img 
          src="/lovable-uploads/3072898f-0ccc-4826-9143-24cea560e44c.png" 
          alt="QR Code" 
          className="w-64 h-64 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error('QR Code image failed to load');
            // Try to set a fallback or custom QR code here if needed
          }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="text-white/80 text-sm text-center">
          Scan to pay with any UPI app
        </p>
        <p className="text-white/60 text-xs mt-2 text-center">
          Note: Keep this page open until payment is confirmed
        </p>
      </motion.div>
    </motion.div>
  );
};

export default QRCodeDisplay;
