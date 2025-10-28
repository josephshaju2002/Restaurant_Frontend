import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaEnvelope, FaUtensils } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Grid } from "@mui/material";


const BASE_URL = "https://restaurant-server-1-zihz.onrender.com";

function Admin() {
  const [view, setView] = useState("home"); // home | messages | dishes
  const [messages, setMessages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", image: "" });

  const [editItem, setEditItem] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchMenu();
  }, []);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Fetch dishes
  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/dishes`);
      setMenuItems(res.data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  // Delete message
  const handleDeleteMessage = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/messages/${id}`);
        Swal.fire("Deleted!", "Message has been deleted.", "success");
        fetchMessages();
      } catch (err) {
        Swal.fire("Error", "Failed to delete message.", "error");
      }
    }
  };

  // Add new dish
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.image) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/dishes`, newItem);
      fetchMenu();
      setNewItem({ name: "", price: "", image: "" });
      Swal.fire("Success", "New dish added!", "success");
    } catch (err) {
      Swal.fire("Error", "Could not add item.", "error");
    }
  };

  // Delete dish
  const handleDeleteItem = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This dish will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/dishes/${id}`);
        fetchMenu();
        Swal.fire("Deleted!", "Dish has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete dish.", "error");
      }
    }
  };

  // Open edit modal
  const handleOpenEditModal = (item) => {
    setEditItem(item);
    setOpenEditModal(true);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setEditItem(null);
    setOpenEditModal(false);
  };

  // Save edit from modal
  const handleSaveEdit = async () => {
    if (!editItem.name || !editItem.price || !editItem.image) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.put(`${BASE_URL}/dishes/${editItem.id}`, editItem);
      fetchMenu();
      handleCloseEditModal();
      Swal.fire("Success", "Dish updated!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update dish.", "error");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Admin Title */}
      <Typography
        className="fw-bold"
        variant="h3"
        sx={{ textAlign: "center", mb: 4, mt: 5 }}
      >
        A<span style={{ color: "#bc5f18ff" }}>D</span>M
        <span style={{ color: "#bc5f18ff" }}>I</span>N{" "}
        <span style={{ color: "#bc5f18ff" }}>D</span>A
        <span style={{ color: "#bc5f18ff" }}>S</span>H
        <span style={{ color: "#bc5f18ff" }}>B</span>O
        <span style={{ color: "#bc5f18ff" }}>A</span>R
        <span style={{ color: "#bc5f18ff" }}>D</span>
      </Typography>

      {/* Home Page */}
      {view === "home" && (
  <Box sx={{ mt: 5, px: 2 }}>
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 5 }}
    >
      {/* Messages Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Box className="shadow rounded p-5 text-center">
          <FaEnvelope className="fs-1 mb-2 text-primary" />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            MESSAGES
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            View All The Messages From The Users.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#bc5f18ff",
              "&:hover": { backgroundColor: "#a34f13" },
            }}
            onClick={() => setView("messages")}
          >
            Go to Messages
          </Button>
        </Box>
      </Grid>

      {/* Dishes Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Box className="shadow rounded p-5 text-center">
          <FaUtensils className="fs-1 mb-2 text-success" />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Manage Dishes
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage All The Dishes.You can ADD,EDIT and DELETE dishes
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#bc5f18ff",
              "&:hover": { backgroundColor: "#a34f13" },
            }}
            onClick={() => setView("dishes")}
          >
            Go to Dishes
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
)}


      {/* Messages Section */}
      {view === "messages" && (
        <Box>
          <Button
            variant="contained"
            sx={{ mb: 3 }}
            onClick={() => setView("home")}
          >
            ← Back
          </Button>
          <Typography
            className="text-center fw-bold"
            variant="h4"
            sx={{ mb: 5 }}
          >
            Contact Messages
          </Typography>
          {messages.length === 0 && <Typography>No messages found.</Typography>}
          {messages.map((msg) => (
            <Card
              key={msg.id}
              sx={{
                mb: 2,
                p: 2,
                border: "2px solid #bc5f18ff",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">{msg.name}</Typography>
                    <Typography variant="body2">{msg.email}</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      {msg.subject}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {msg.message}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteMessage(msg.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Dishes Section */}
      {view === "dishes" && (
        <Box>
          <Button
            variant="contained"
            sx={{ mb: 3 }}
            onClick={() => setView("home")}
          >
            ← Back
          </Button>
          <Typography
            className="text-center fw-bold"
            variant="h4"
            sx={{ mb: 5 }}
          >
            Manage Dishes
          </Typography>

          {/* Add new dish */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
              <TextField
                label="Price"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
              />
              <TextField
                label="Image URL"
                value={newItem.image}
                onChange={(e) =>
                  setNewItem({ ...newItem, image: e.target.value })
                }
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "#bc5f18ff" }}
                onClick={handleAddItem}
              >
                Add
              </Button>
            </Box>
          </Box>

          {/* Dish cards */}
          <Box
            className="mt-5"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center",
            }}
          >
            {menuItems.map((item) => (
              <Box
                key={item.id}
                sx={{ flex: "0 0 23%", boxSizing: "border-box" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "15px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography>₹{item.price}</Typography>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginTop: "10px",
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, display: "flex", gap: 3 }}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ flex: 1 }}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ flex: 1 }}
                      onClick={() => handleOpenEditModal(item)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Edit Modal */}
          <Dialog
            open={openEditModal}
            onClose={handleCloseEditModal}
            scroll="paper"
          >
            <DialogTitle>Edit Dish</DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: { xs: 300, sm: 400 }, // responsive width
              }}
            >
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={editItem?.name || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />
              <TextField
                label="Price"
                fullWidth
                margin="normal"
                value={editItem?.price || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, price: e.target.value })
                }
              />
              <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                value={editItem?.image || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, image: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditModal}>Cancel</Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#bc5f18ff" }}
                onClick={handleSaveEdit}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}

export default Admin;
