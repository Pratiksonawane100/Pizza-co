import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PriorityConfirmation from "./PriorityConfirmation"; // Import the new component

function UpdateOrder() {
  const [searchId, setSearchId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false); // State for modal visibility
  const [updatedOrder, setUpdatedOrder] = useState(null); // Store order to be updated
  const navigate = useNavigate(); // For navigation after confirmation

  useEffect(() => {
    if (searchId) {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const foundOrder = storedOrders.find((o) => o.orderId === searchId);
      if (foundOrder) {
        setOrder(foundOrder);
        setError("");
      } else {
        setOrder(null);
        setError("Order not found.");
      }
    }
  }, [searchId]);

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleMakePriority = () => {
    setUpdatedOrder(order);
    setShowConfirm(true); // Show the confirmation modal
  };

  const confirmPriorityUpgrade = () => {
    if (updatedOrder) {
      const updatedCart = updatedOrder.cart.map((item) => ({
        ...item,
        quantity: item.quantity, // Ensure quantity is correctly set
      }));

      const updatedOrderWithPriority = {
        ...updatedOrder,
        totalAmount: updatedOrder.totalAmount + 10, // Increase totalAmount by $10 for priority
        isPriority: true,
        cart: updatedCart,
      };

      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const updatedOrders = storedOrders.map((o) =>
        o.orderId === updatedOrder.orderId ? updatedOrderWithPriority : o
      );

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrder(updatedOrderWithPriority);
      setShowConfirm(false);
      navigate("/status"); // Navigate to status page
    }
  };

  const cancelPriorityUpgrade = () => {
    setShowConfirm(false);
  };

  const handleQuantityChange = (pizzaId, change) => {
    if (order) {
      const updatedCart = order.cart.map((item) =>
        item.pizzaId === pizzaId
          ? { ...item, quantity: item.quantity + change }
          : item
      );

      const updatedTotalAmount = updatedCart.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0
      );

      const updatedOrder = {
        ...order,
        cart: updatedCart,
        totalAmount: updatedTotalAmount,
      };
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const updatedOrders = storedOrders.map((o) =>
        o.orderId === order.orderId ? updatedOrder : o
      );
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrder(updatedOrder);
    }
  };

  return (
    <div className="p-6 m-10 max-w-xl mx-auto bg-white text-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Order</h2>
      <input
        type="text"
        placeholder="Search by Order ID"
        value={searchId}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-100 text-gray-900"
      />
      {error && <p className="text-red-500">{error}</p>}
      {order && (
        <>
          <div className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded-md">
            <p className="text-lg mb-2">Order ID: {order.orderId}</p>
            <p className="text-lg mb-2">Customer Name: {order.name}</p>
            <p className="text-lg mb-2">Delivery Address: {order.address}</p>
            <p className="text-lg mb-2">
              Total Amount: ${order.totalAmount.toFixed(2)}
            </p>
            <p className="text-lg mb-2">
              Estimated Delivery Time: {order.deliveryTime}
            </p>
            <h3 className="text-xl font-semibold mt-6">Order Items:</h3>
            <ul className="list-disc list-inside">
              {order.cart.map((item) => (
                <li key={item.pizzaId} className="mb-1 flex items-center">
                  {item.name} - Quantity: {item.quantity} - Total: $
                  {(item.quantity * item.unitPrice).toFixed(2)}
                  <div className="ml-4 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.pizzaId, -1)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.pizzaId, 1)}
                      className="px-2 py-1 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleMakePriority}
              className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Make priority
            </button>
          </div>
        </>
      )}

      {showConfirm && (
        <PriorityConfirmation
          order={updatedOrder}
          onConfirm={confirmPriorityUpgrade}
          onCancel={cancelPriorityUpgrade}
        />
      )}
    </div>
  );
}

export default UpdateOrder;
