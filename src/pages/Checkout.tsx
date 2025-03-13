
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import { Check, ArrowLeft } from 'lucide-react';

interface CheckoutFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'qr' | 'cod';
}

const Checkout = () => {
  const { items, totalAmount } = useCart();
  const { user, profile } = useAuth();
  const { createOrder, isCreating } = useOrders();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<CheckoutFormValues>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'qr',
  });
  const [isCoimbatore, setIsCoimbatore] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState(100);
  
  useEffect(() => {
    // Redirect to home if cart is empty
    const storedItems = localStorage.getItem('cartItems');
    if (!storedItems || JSON.parse(storedItems).length === 0) {
      navigate('/');
    }
    
    // Populate form with user profile if available
    if (profile) {
      setFormValues(prev => ({
        ...prev,
        name: profile.full_name || '',
        email: user?.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
      }));
    }
  }, [navigate, profile, user]);
  
  useEffect(() => {
    const coimbatorePincodes = ['641001', '641002', '641003', '641004', '641005', '641006', '641007', '641008', '641009', '641010', '641011', '641012', '641013', '641014', '641015', '641016', '641017', '641018', '641019', '641020', '641021', '641022', '641023', '641024', '641025', '641026', '641027', '641028', '641029', '641030', '641031', '641032', '641033', '641034', '641035', '641036', '641037', '641038', '641039', '641040', '641041', '641042', '641043', '641044', '641045', '641046', '641047', '641048', '641049', '641050', '641061', '641062', '641063', '641064', '641065', '641101', '641102', '641103', '641104', '641105', '641106', '641107', '641108', '641109', '641110', '641111', '641112', '641113', '641114', '641201', '641202', '641301', '641302', '641303', '641304', '641305', '641401', '641402', '641403', '641404', '641405', '641406', '641407'];
    
    const isCoimbatorePin = coimbatorePincodes.includes(formValues.pincode);
    setIsCoimbatore(isCoimbatorePin);
    
    const qualifiesForFreeShipping = isCoimbatorePin && totalAmount >= 999;
    setFreeShipping(qualifiesForFreeShipping);
  }, [formValues.pincode, totalAmount]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    for (const [key, value] of Object.entries(formValues)) {
      if (!value) {
        toast({
          title: "Error",
          description: `Please fill in your ${key}`,
          variant: "destructive",
        });
        return;
      }
    }
    
    // Prepare shipping address
    const shippingAddress = `${formValues.address}, ${formValues.city}, ${formValues.state} - ${formValues.pincode}`;
    
    // Create order
    await createOrder({
      shippingAddress,
      paymentMethod: formValues.paymentMethod,
      shippingCost: freeShipping ? 0 : shippingCost,
      grandTotal: freeShipping ? totalAmount : totalAmount + shippingCost
    });
  };
  
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </button>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">Shipping Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white/70 mb-2 text-sm">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#F2A83B]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white/70 mb-2 text-sm">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#F2A83B]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-white/70 mb-2 text-sm">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#F2A83B]"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-white/70 mb-2 text-sm">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formValues.address}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#F2A83B]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-white/70 mb-2 text-sm">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formValues.city}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#F2A83B]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-white/70 mb-2 text-sm">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formValues.state}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#F2A83B]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pincode" className="block text-white/70 mb-2 text-sm">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formValues.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#F2A83B]"
                      required
                    />
                    {isCoimbatore && (
                      <p className="text-[#F2A83B] text-xs mt-2 flex items-center">
                        <Check size={12} className="mr-1" /> 
                        {totalAmount >= 999 
                          ? "You're eligible for free shipping on orders above ₹999!" 
                          : `Add ₹${(999 - totalAmount).toFixed(2)} more for free shipping!`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="qr"
                      checked={formValues.paymentMethod === 'qr'}
                      onChange={handleInputChange}
                      className="form-radio h-5 w-5 text-[#F2A83B]"
                    />
                    <span className="text-white">Pay via QR Code (UPI/Google Pay/PhonePe)</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formValues.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="form-radio h-5 w-5 text-[#F2A83B]"
                    />
                    <span className="text-white">Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isCreating}
                className="w-full py-3 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors disabled:opacity-70"
              >
                {isCreating 
                  ? 'Processing...' 
                  : formValues.paymentMethod === 'qr' 
                    ? 'Continue to Payment' 
                    : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="w-full md:w-96">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
