// import React from "react";
import PropTypes from "prop-types";

function PriorityConfirmation({ order, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-white">
          Confirm Priority Upgrade
        </h2>
        <p className="text-lg text-white mb-4">
          Adding $10 for priority service to Order ID: {order.orderId}.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

PriorityConfirmation.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PriorityConfirmation;
