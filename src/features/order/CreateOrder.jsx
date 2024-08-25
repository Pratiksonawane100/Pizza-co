import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderId = Math.random().toString(36).substring(2).toUpperCase(); // Example random ID
    const deliveryTime = Math.random() < 0.5 ? "1 hour" : "40 minutes"; // Random delivery time
    const timestamp = new Date().toISOString(); // Current timestamp

    // Retrieve existing orders and append the new order
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      ...formData,
      orderId,
      deliveryTime,
      totalAmount: cart.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      ),
      cart,
      timestamp, // Add timestamp to order
    };
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    navigate("/status");
  };

  return (
    <div className="p-6 m-10 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700"
          >
            Number:
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="terms"
            required
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            Agree to terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
