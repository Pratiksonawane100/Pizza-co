import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../cart/cartSlice";
import useMenu from "./useMenu"; // Ensure the correct path

function Cartitem({ item }) {
  const dispatch = useDispatch();
  const { menu } = useMenu();

  // Find the image URL and unit price from the menu
  const pizza = menu.find((pizza) => pizza.name === item.name);
  const imageUrl = pizza ? pizza.imageUrl : "";
  const unitPrice = pizza ? pizza.unitPrice : 0;

  const handleDelete = () => {
    dispatch(deleteItem(item.pizzaId)); // Use pizzaId for deletion
  };

  const handleIncrease = () => {
    dispatch(increaseItemQuantity(item.pizzaId));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseItemQuantity(item.pizzaId));
    }
  };

  return (
    <li className="mb-6 p-4 border border-gray-300 rounded-lg flex flex-col md:flex-row items-center bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-md border border-gray-200 mb-4 md:mb-0 md:mr-6"
        />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md mb-4 md:mb-0 md:mr-6">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {item.name}
        </h3>
        <p className="text-gray-600">Unit Price: ${unitPrice.toFixed(2)}</p>
        <p className="text-gray-800 font-semibold">
          Total Price: ${(unitPrice * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center mt-2">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            onClick={handleIncrease}
          >
            +
          </button>
          <p className="mx-3 text-gray-800">Quantity: {item.quantity}</p>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <button
            className="ml-4 px-3 py-1 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

// Define prop types
Cartitem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    unitPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default Cartitem;
