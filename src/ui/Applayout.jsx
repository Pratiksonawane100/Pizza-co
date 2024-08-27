import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./Sidebar";
import Error from "./Error";
import Home from "../ui/Home";
import Cart from "../features/cart/Cart";
import Menu, { loader as menuLoader } from "../features/menu/Menu";
import CreateOrder from "../features/order/CreateOrder"; // action as createOrderAction,
import StatusPage from "../features/order/StatusPage";
import UpdateOrder from "../features/order/UpdateOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/menu",
    element: <Menu />,
    loader: menuLoader,
  },
  {
    path: "/order/new",
    element: <CreateOrder />,
    // action: createOrderAction,
  },
  {
    path: "/update",
    element: <UpdateOrder />,
    // action: createOrderAction,
  },
  {
    path: "/status",
    element: <StatusPage />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function Applayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 lg:ml-64 p-4">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default Applayout;
