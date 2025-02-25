import axios from "axios";
import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
  const [categories, setCategory] = useState([]);

  async function fetchCategory() {
    try {
      const response = await axios.get(
        "https://ecommerce-node4.onrender.com/categories/active?page=1&limit=9"
      );
      setCategory(response.data.categories);
      console.log(response.data.categories,'kkkkkkkk');
    } catch (error) {
      console.log(error,'category');
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategory }}
    >
        {children}
    </CategoryContext.Provider>
  );
};
export function useCategory() {
  const category = useContext(CategoryContext);
  return category;
}
