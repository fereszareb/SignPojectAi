import { Typography, Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "./backgound.jpg";
import { LinkedIn, WhatsApp, Twitter } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3D3D3D", // Red color for navbar
    },
  },
});

const ProviderTemple = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        className="landing-page"
        sx={{
          minHeight: "100vh",
          height: "100vh",
          //   display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(#d71240df, #ff5258df),url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box sx={{ flexGrow: 1, background: "#3D3D3D", height: "50px" }}>
          <Grid
            container
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Grid item>
              <Box sx={{ p: 2 }}>
                <LinkedIn sx={{ color: "#fff", marginRight: 1, fontSize: "1.2em" }} />
                <WhatsApp sx={{ color: "#fff", marginRight: 1, fontSize: "1.2em" }} />
                <Twitter sx={{ color: "#fff", fontSize: "1.2em" }} />
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight="600" display="flex" padding={2} gutterBottom>
                CONTACT US
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, height: "50px" }}>
          <Typography variant="h6" fontWeight="600" display="flex" padding={2} gutterBottom>
            KAYESNA AI
          </Typography>
        </Box>

        <Box
          sx={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProviderTemple;
