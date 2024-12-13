import { Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" fontWeight="600" gutterBottom>
        Welcome to KAYESNA AI Model
      </Typography>
      <Typography variant="h6" gutterBottom>
        Discover how our advanced AI can revolutionize your experience.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Link to="/image">
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Let's Get Started
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default LandingPage;
