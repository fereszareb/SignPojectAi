import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ContentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  maxWidth: "800px",
  width: "100%",
}));

const ResultBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffb2fb",
  color: theme.palette.primary.dark,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.primary.dark}`,
  textAlign: "center",
  height: "35px",
  display: "flex",
  // flexDirection: "column",
  justifyContent: "center",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "100%",
  overflow: "hidden",
}));

const ProcessedImage = styled("img")({
  maxWidth: "250px",
  maxHeight: "250px",
  objectFit: "contain",
  border: "3px solid #d71240",
  margin: "2px",
});

interface ResultData {
  processed_images: string[];
  label: string;
  confidence: number;
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = JSON.parse(location.state?.result) as ResultData | undefined;
  console.log(result);
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <ContentPaper elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#d71240", textAlign: "center" }}>
        AI Processing Result
      </Typography>
      {result ? (
        <>
          <ImageContainer>
            {result.processed_images &&
              result.processed_images.map((base64Image, index) => (
                <ProcessedImage key={index} src={`data:image/jpeg;base64,${base64Image}`} alt={`Processed image ${index + 1}`} />
              ))}
          </ImageContainer>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <ResultBox>
                <Typography variant="h5" marginRight={2} fontWeight="bold">
                  LABEL :
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {result.label && result.label.toUpperCase()}
                </Typography>
              </ResultBox>
            </Grid>
            <Grid item xs={6}>
              <ResultBox>
                <Typography variant="h5" marginRight={2} fontWeight="bold">
                  CONFIDENCE :
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {result.confidence && result.confidence.toFixed(2)}%
                </Typography>
              </ResultBox>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography sx={{ color: "#666", textAlign: "center" }}>No result available. Please upload and submit an image.</Typography>
      )}
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ backgroundColor: "#d71240", "&:hover": { backgroundColor: "#ff5258" } }}
        >
          Go Back
        </Button>
      </Box>
    </ContentPaper>
  );
};

export default ResultPage;
