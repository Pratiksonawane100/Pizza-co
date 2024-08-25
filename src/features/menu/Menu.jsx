import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./Menuitem";
// import CartOverview from "../cart/CartOverview";

function Menu() {
  const username = useSelector((state) => state.user.username);
  const menu = useLoaderData();

  if (!username) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
          Please create a username before accessing the menu.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, <span className="text-blue-500">{username}</span>!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </div>
      {/* <CartOverview /> */}
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
