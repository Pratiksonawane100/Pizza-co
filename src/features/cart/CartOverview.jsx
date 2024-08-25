import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Use Link from react-router-dom

function CartOverview() {
  const totalCartQuantity = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const totalCartPrice = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
  );

  return (
    <div className="w-full bg-gray-800 text-white p-4 text-center fixed bottom-0 left-0 shadow-lg z-50">
      <div className="flex flex-col items-center space-y-2">
        <span className="text-lg font-bold">{totalCartQuantity}</span>
        <span className="text-md">items in cart</span>
        <span className="text-lg font-bold">${totalCartPrice.toFixed(2)}</span>
        <Link
          to="/cart"
          className="text-blue-400 hover:text-blue-300 font-semibold text-sm underline"
        >
          Open cart &rarr;
        </Link>
      </div>
    </div>
  );
}

export default CartOverview;
