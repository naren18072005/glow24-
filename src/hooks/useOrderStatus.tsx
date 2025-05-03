
import { updateOrderStatus as updateOrderInDatabase } from '@/utils/orderDatabase';

export const useOrderStatus = () => {
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const updated = await updateOrderInDatabase(orderId, status);
      
      if (updated) {
        console.log(`Order ${orderId} status updated to ${status}`);
        return true;
      } else {
        console.error(`Failed to update order ${orderId} status`);
        return false;
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      return false;
    }
  };

  return {
    updateOrderStatus
  };
};
