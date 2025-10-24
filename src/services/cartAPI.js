import axios from "axios";

const BASE_URL = "https://restaurant-server-1-zihz.onrender.com";

// Fetch all cart items
export const getCartItems = async () => {
  return await axios.get(`${BASE_URL}/cart`);
};

// Add a new item to the cart
export const addToCart = async (item) => {
  return await axios.post(`${BASE_URL}/cart`, item);
};

// Update item quantity
export const updateCartItem = async (id, updatedItem) => {
  return await axios.put(`${BASE_URL}/cart/${id}`, updatedItem);
};

// Delete an item
export const deleteCartItem = async (id) => {
  return await axios.delete(`${BASE_URL}/cart/${id}`);
};

// Fetch all dishes
export const getAllDishes = async () => {
  return await axios.get(`${BASE_URL}/dishes`);
};