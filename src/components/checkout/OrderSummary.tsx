
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';

interface OrderSummaryProps {
  freeShipping: boolean;
  shippingCost: number;
}

const OrderSummary = ({ freeShipping, shippingCost }: OrderSummaryProps) => {
  const { items, totalAmount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10 sticky top-6">
      <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items?.map(item => (
          <div key={item.id} className="flex justify-between">
            <div className="flex items-start">
              <span className="bg-white/20 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                {item.quantity}
              </span>
              <span className="text-white">{item.name}</span>
            </div>
            <span className="text-white font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-white/70">Subtotal</span>
          <span className="text-white">₹{totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-white/70">Shipping</span>
          <span className="text-white">{freeShipping ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
        </div>
        
        <div className="border-t border-white/10 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-white/70 font-medium">Total</span>
            <span className="text-[#F2A83B] font-bold">
              ₹{(freeShipping ? totalAmount : totalAmount + shippingCost).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {!user && (
        <div className="mt-4 p-3 bg-white/10 rounded-md">
          <p className="text-white/70 text-sm">
            Already have an account? 
            <button 
              type="button"
              onClick={() => navigate('/auth', { state: { from: '/checkout' } })}
              className="text-[#F2A83B] ml-2 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
