import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCartItems, updateCartItem, deleteCartItem } from "../services/cartAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncrease = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      await updateCartItem(id, { ...item, quantity: item.quantity + 1 });
      fetchCart();
    }
  };

  const handleDecrease = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      await updateCartItem(id, { ...item, quantity: item.quantity - 1 });
      fetchCart();
    }
  };

 const ordered = () => {
    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      text: "Your delicious food is on its way!",
      confirmButtonText: "Go Back to Menu",
      confirmButtonColor: "#bc5f18ff",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/menu"); // navigates to menu page
      }
    });
  };
  const handleRemove = async (id) => {
    await deleteCartItem(id);
    fetchCart();
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>Your Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>Your cart is empty!</Typography>
      ) : (
        cartItems.map((item) => (
          <Box
  key={item.id}
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" }, // 🔹 column on mobile, row on larger
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
    gap: 2,
    mb: 2,
    p: 2,
    border: "1px solid #ccc",
    borderRadius: "10px",
  }}
>
  {/* Item Name */}
  <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
    {item.name}
  </Typography>

  {/* Quantity Controls */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap", // 🔹 allows wrapping if needed
      gap: 1,
      justifyContent: { xs: "flex-start", sm: "flex-end" },
      width: { xs: "100%", sm: "auto" }, // 🔹 full width on small screens
    }}
  >
    <Button variant="outlined" onClick={() => handleDecrease(item.id)}>
      -
    </Button>
    <TextField
      size="small"
      value={item.quantity}
      inputProps={{
        readOnly: true,
        style: { width: "40px", textAlign: "center" },
      }}
    />
    <Button variant="outlined" onClick={() => handleIncrease(item.id)}>
      +
    </Button>
    <Typography sx={{ width: "80px", textAlign: "right" }}>
      ₹{(item.price * item.quantity).toFixed(2)}
    </Typography>
    <IconButton color="error" onClick={() => handleRemove(item.id)}>
      <DeleteIcon />
    </IconButton>
  </Box>
</Box>

        ))
      )}

      {cartItems.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "right" }}>
          <Typography variant="h6">Total: ₹{totalPrice.toFixed(2)}</Typography>
          <Button onClick={ordered} variant="contained" sx={{ mt: 2, backgroundColor: "#bc5f18ff" }}>Checkout</Button>
        </Box>
      )}
    </Box>
  );
}

export default CartPage;
