
import React from 'react';
import { useCart } from '@/hooks/useCart';

interface OrderSummaryProps {
  freeShipping: boolean;
  shippingCost: number;
}

const OrderSummary = ({ freeShipping, shippingCost }: OrderSummaryProps) => {
  const { items, totalAmount } = useCart();
  
  return (
    <div className="glass-card-premium rounded-xl p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items?.map(item => (
          <div key={item.id} className="flex justify-between items-start group">
            <div className="flex items-start flex-1">
              <div className="bg-gold/20 text-gold text-xs rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold">
                {item.quantity}
              </div>
              <div className="flex-1">
                <span className="text-text-primary font-medium">{item.name}</span>
                <div className="text-xs text-text-muted mt-1">₹{item.price} each</div>
              </div>
            </div>
            <span className="text-text-primary font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary font-medium">₹{totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-text-secondary">Shipping</span>
          <span className={`font-medium ${freeShipping ? 'text-green-400' : 'text-text-primary'}`}>
            {freeShipping ? (
              <span className="flex items-center">
                Free <span className="ml-1 text-xs bg-green-400/20 text-green-400 px-2 py-0.5 rounded-full">Save ₹{shippingCost}</span>
              </span>
            ) : (
              `₹${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="border-t border-border pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-text-primary font-semibold text-lg">Total</span>
            <span className="text-gold font-bold text-xl">
              ₹{(freeShipping ? totalAmount : totalAmount + shippingCost).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
