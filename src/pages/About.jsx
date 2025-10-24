import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const teamMembers = [
  { id: 1, name: "Jon Snow", role: "Head Chef", image: "https://images.immediate.co.uk/production/volatile/sites/3/2024/01/kit-harington-cd61c14.jpg?quality=90&webp=true&resize=1500,1001" },
  { id: 2, name: "Tyrion Lannister", role: "Manager", image: "https://cdn.britannica.com/46/188646-050-BC193B7A/Peter-Dinklage-publicity-shot-2012.jpg" },
  { id: 3, name: "Arya Stark", role: "Head Chef", image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Maisie_Williams_by_Gage_Skidmore_2.jpg" },
];

function About() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: "50vh",
          backgroundImage: `url('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          flexDirection: "column",
          mb: 8,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          About Food Court
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Serving delicious meals with love and passion
        </Typography>
      </Box>

      {/* Our Story */}
      <Box sx={{ mb: 8, textAlign: "center", maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Our Story
        </Typography>
        <Typography variant="body1">
          <span style={{color:"#bc5f18ff",fontWeight: "bold"}}>Food Court</span> started with a simple mission: to bring delicious, high-quality food to our community. 
          Our chefs use the freshest ingredients to craft meals that are both tasty and comforting.
        </Typography>
      </Box>

      {/* Mission */}
      <Box sx={{ mb: 8, textAlign: "center", maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Our Mission
        </Typography>
        <Typography variant="body1">
          To provide a cozy, welcoming environment where people can enjoy their favorite dishes and create lasting memories.
        </Typography>
      </Box>

      {/* Team Members */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid item key={member.id}>
              <Card sx={{ width: 250, textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default About;
