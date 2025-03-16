
import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

interface PaymentStatusProps {
  status: 'pending' | 'completed';
  countdown: number;
  onConfirmPayment: () => void;
}

const PaymentStatus = ({ status, countdown, onConfirmPayment }: PaymentStatusProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="mb-8 flex flex-col items-center">
      {status === 'pending' ? (
        <div className="flex items-center text-amber-400 mb-4">
          <Clock size={20} className="mr-2" />
          <p>Payment pending... {formatTime(countdown)}</p>
        </div>
      ) : (
        <div className="flex items-center text-green-500 mb-4">
          <CheckCircle size={20} className="mr-2" />
          <p>Payment completed!</p>
        </div>
      )}
      
      <button
        onClick={onConfirmPayment}
        className="py-3 px-6 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors"
      >
        I've Completed the Payment
      </button>
    </div>
  );
};

export default PaymentStatus;
