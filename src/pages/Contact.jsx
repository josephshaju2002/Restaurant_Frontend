import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";

const BASE_URL = "https://restaurant-server-1-zihz.onrender.com"; // replace with your JSON server port

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/messages`, formData);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us.",
        showConfirmButton: true,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not send message. Please try again later.",
      });
      console.error("Error saving message:", error);
    }
  };

  return (
    <Box sx={{ py: 8, px: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Contact Us
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={5}
          sx={{ mb: 3 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#bc5f18ff", width: "100%" }}
        >
          Send Message
        </Button>
      </form>
    </Box>
  );
}

export default Contact;
