import { useSelector } from "react-redux";
import { getCart } from "./cartSlice";
import Cartitem from "./Cartitem";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector(getCart);
  const navigate = useNavigate();

  // Calculate the total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleOrderNow = () => {
    navigate("/order/new", { state: { cart, totalAmount } });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <Cartitem key={item.pizzaId} item={item} />
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center border-t pt-4">
            <span className="text-xl font-semibold">
              Total: ${totalAmount.toFixed(2)}
            </span>
            <button
              onClick={handleOrderNow}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Order Now
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
