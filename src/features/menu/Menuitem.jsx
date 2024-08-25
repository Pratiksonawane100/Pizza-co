import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCart } from "../cart/cartSlice";

function Menuitem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // State to manage the success message
  const [isAdded, setIsAdded] = useState(false); // State to track if item is in cart
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  // Check if the item is already in the cart
  useEffect(() => {
    const itemInCart = cart.find((item) => item.pizzaId === id);
    setIsAdded(!!itemInCart);
  }, [cart, id]);

  // Handle image load event
  const handleImageLoad = () => {
    setLoading(false);
  };

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
      imageUrl,
    };
    dispatch(addItem(newItem));

    // Show success message
    setMessage(`${name} has been added to the cart!`);

    // Hide message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
    setIsAdded(true); // Mark item as added
  }

  return (
    <ul className="m-5 border border-gray-300 rounded-lg shadow-md p-4 relative">
      {loading && (
        <div className="flex justify-center items-center h-36">
          <FadeLoader color="#36d7b7" loading={loading} size={15} />
        </div>
      )}
      <img
        src={imageUrl}
        alt={name}
        className={`w-36 h-36 rounded-md ${loading ? "hidden" : "block"}`}
        onLoad={handleImageLoad}
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-gray-600">Ingredients: {ingredients.join(", ")}</p>
      <p className="text-gray-800 font-bold">Price: ${unitPrice.toFixed(2)}</p>
      {soldOut ? (
        <p className="text-red-500 mt-2">Sold Out</p>
      ) : (
        <>
          <button
            className={`mt-2 px-4 py-2 rounded ${
              isAdded
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleAddToCart}
            disabled={isAdded} // Disable button if item is added
          >
            {isAdded ? "Added" : "Add to Cart"}
          </button>
          {message && (
            <p className="mt-2 text-green-500 font-semibold">{message}</p>
          )}
        </>
      )}
    </ul>
  );
}

// Define prop types
Menuitem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Menuitem;
