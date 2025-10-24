import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";



const popularDishes = [
  { id: 1, name: "Pizza", image: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg" },
  { id: 2, name: "Burger", image: "https://res.cloudinary.com/kraft-heinz-whats-cooking-ca/image/upload/f_auto/q_auto/c_limit,w_3840/f_auto/q_auto/v1/dxp-images/brands/Recipes/all-recipe-assets/heinz-inside-out-burger/43404e70e9314f1b9060dcf00bd7b878_okz0zb?_a=BAVAfVDW0" },
  { id: 3, name: "Pasta", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg" },
  { id: 4, name: "Biriyani", image: "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg" },
  { id: 5, name: "Fried Rice", image: "https://www.eatingonadime.com/wp-content/uploads/2022/01/eod-fried-rice-9-2.jpg" },
];

const testimonials = [
  { id: 1, name: "Tony Stark", feedback: "Amazing food and cozy atmosphere!" },
  { id: 2, name: "Steve Rogers", feedback: "Best restaurant in town, highly recommend!" },
];

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "80vh",
          backgroundImage: `url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Food Court
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Delicious food made with love
        </Typography>
        <Button component={Link} to="/menu" variant="contained" sx={{ backgroundColor: "#bc5f18ff" }}>
          Explore Menu
        </Button>
      </Box>

      {/* Popular Dishes */}
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Popular Dishes
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
          {popularDishes.map((dish) => (
            <Card key={dish.id} sx={{ width: 250 }}>
              <CardMedia component="img" height="140" image={dish.image} alt={dish.name} />
              <CardContent>
                <Typography variant="h6">{dish.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Special Offers */}
      <Box sx={{ py: 8, backgroundColor: "#f8f8f8", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Special Offers
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto" }}>
          Get 20% off on all Italian dishes every Friday! Limited time offer.
        </Typography>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          What Our Customers Say
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
          {testimonials.map((t) => (
            <Card key={t.id} sx={{ width: 300, p: 2 }}>
              <CardContent>
                <Typography variant="body1">"{t.feedback}"</Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "bold" }}>
                  - {t.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
