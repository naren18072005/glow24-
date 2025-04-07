
import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="mb-8 flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {status === 'pending' ? (
        <motion.div 
          className="flex items-center text-amber-400 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock size={20} className="mr-2" />
          <p>Payment pending... {formatTime(countdown)}</p>
        </motion.div>
      ) : (
        <motion.div 
          className="flex items-center text-green-500 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
        >
          <CheckCircle size={20} className="mr-2" />
          <p>Payment completed!</p>
        </motion.div>
      )}
      
      <motion.button
        onClick={onConfirmPayment}
        className="py-3 px-6 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors shadow-lg hover:shadow-xl hover:shadow-[#F2A83B]/20 transform transition-transform duration-300"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        I've Completed the Payment
      </motion.button>
    </motion.div>
  );
};

export default PaymentStatus;
