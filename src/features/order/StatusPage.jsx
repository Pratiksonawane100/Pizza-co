import { useEffect, useState } from "react";

// Fetch pizza image URL based on pizza name
const fetchPizzaImageUrl = async (pizzaName) => {
  try {
    const response = await fetch(
      "https://react-fast-pizza-api.onrender.com/api/menu"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const pizza = data.find((pizza) => pizza.name === pizzaName);
    return pizza ? pizza.imageUrl : null;
  } catch (error) {
    console.error("Failed to fetch pizza image:", error);
    return null;
  }
};

function StatusPage() {
  const [orders, setOrders] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);

    const fetchImages = async () => {
      const newImages = {};
      for (const order of storedOrders) {
        for (const item of order.cart) {
          if (!newImages[item.name]) {
            const imageUrl = await fetchPizzaImageUrl(item.name);
            if (imageUrl) {
              newImages[item.name] = imageUrl;
            }
          }
        }
      }
      setImages(newImages);
    };

    fetchImages();
  }, []);

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  if (orders.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">
        No order details found.
      </p>
    );
  }

  return (
    <div className="p-6 m-10 max-w-full mx-auto bg-white text-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Order Status
      </h2>
      <div className="flex flex-wrap gap-6">
        {orders.map((order, index) => {
          const isNewOrder =
            new Date(order.timestamp) >
            new Date(new Date().setDate(new Date().getDate() - 1)); // New if created within the last 24 hours
          return (
            <div
              key={index}
              className={`w-full sm:w-1/2 lg:w-1/3 mb-6 p-4 rounded-md border ${
                isNewOrder
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              {order.isPriority && (
                <div className="bg-yellow-400 text-gray-900 inline-block px-3 py-1 rounded-md font-bold mb-2">
                  Priority
                </div>
              )}
              <p className="text-lg mb-2 font-medium">
                Order ID: {order.orderId}
              </p>
              <p className="text-lg mb-2">Customer Name: {order.name}</p>
              <p className="text-lg mb-2">Delivery Address: {order.address}</p>
              <p className="text-lg mb-2 font-medium">
                Total Amount: ${order.totalAmount.toFixed(2)}
              </p>
              <p className="text-lg mb-2">
                Estimated Delivery Time: {order.deliveryTime}
              </p>
              <p className="text-lg mb-2 text-gray-500">
                Created At: {new Date(order.timestamp).toLocaleString()}
              </p>
              <p className="text-lg mb-2 text-gray-500">
                Expected Delivery:{" "}
                {new Date(order.deliveryDate).toLocaleString()}
              </p>

              <h3 className="text-xl font-semibold mt-6">Order Items:</h3>
              <ul className="list-disc list-inside">
                {order.cart.map((item) => (
                  <li key={item.pizzaId} className="mb-1 flex items-center">
                    {images[item.name] && (
                      <img
                        src={images[item.name]}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-4 rounded-md border border-gray-300"
                      />
                    )}
                    {item.name} - Quantity: {item.quantity} - Total: $
                    {(item.quantity * item.unitPrice).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleCancelOrder(order.orderId)}
                  className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusPage;
