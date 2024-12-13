import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import ImageUpload from "../components/ImageUpload";

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  maxWidth: "600px",
  width: "100%",
}));

const ImageUploadPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/process-image/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const result = await response.text();
      navigate("/result", { state: { result } });
    } catch (error) {
      console.error("Error processing image:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <ContentBox>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#d71240" }}>
        AI Image Processing
      </Typography>
      <ImageUpload onSubmit={handleSubmit} />
    </ContentBox>
  );
};

export default ImageUploadPage;
