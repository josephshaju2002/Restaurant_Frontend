import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Swal from "sweetalert2";
import { getAllDishes, getCartItems, addToCart, updateCartItem } from "../services/cartAPI";

const categories = [
  "All",
  "Main Course",
  "Fast Food",
  "Italian",
  "Snacks",
  "Dessert",
  "Beverage",
];

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All"); //for category
  const [dishes, setDishes] = useState([]); //full dish
  const [cart, setCart] = useState([]); //cart data

  useEffect(() => {
    fetchDishes();
    fetchCart();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await getAllDishes();
      setDishes(response.data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await getCartItems();
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleAddToCart = async (dish) => {
    try {
      const { data: cartItems } = await getCartItems();
      const existingItem = cartItems.find((item) => item.dishId === dish.id);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        await updateCartItem(existingItem.id, updatedItem);
      } else {
        await addToCart({
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          quantity: 1,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Added to Basket",
        text: `${dish.name} added successfully!`,
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add item to cart!",
      });
    }
  };

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((d) => d.category === selectedCategory);

  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Our Menu
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 6, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 4,
        }}
      >
        {filteredDishes.map((dish) => (
          <Card key={dish.id} sx={{ width: 300, mx: "auto" }}>
            <CardMedia
              component="img"
              image={dish.image}
              alt={dish.name}
              sx={{ width: 300, height: 200, objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6">{dish.name}</Typography>
              <Typography>₹{dish.price}</Typography>
              <Button
                variant="contained"
                sx={{ mt: 1, backgroundColor: "#bc5f18ff" }}
                onClick={() => handleAddToCart(dish)}
              >
                Add to Basket
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default MenuPage;
