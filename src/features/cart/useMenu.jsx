import { useEffect, useState } from "react";
import { getMenu } from "../../services/apiRestaurant";

function useMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await getMenu();
        setMenu(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return { menu, loading, error };
}

export default useMenu;
