import React, { useState } from "react";
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

import ImageUpload from "./ImageUpload";
import ResultDisplay from "./ResultDisplay";

const ContentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  maxWidth: "600px",
  width: "100%",
}));

const ImageProcession: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleResultReceived = (newResult: string) => {
    setResult(newResult);
  };
  return (
    <ContentPaper elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#d71240" }}>
        AI Image Processing
      </Typography>
      <ImageUpload onSubmit={() => {}} />
      <ResultDisplay result={result} />
    </ContentPaper>
  );
};

export default ImageProcession;
