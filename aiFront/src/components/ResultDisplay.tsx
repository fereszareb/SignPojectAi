import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const ResultPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  minHeight: "100px",
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[3],
}));

interface ResultDisplayProps {
  result: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom sx={{ color: "#d71240" }}>
        AI Processing Result:
      </Typography>
      <ResultPaper elevation={3}>
        {result ? (
          <Typography sx={{ color: "#333" }}>{result}</Typography>
        ) : (
          <Typography sx={{ color: "#666" }}>No result available. Please upload and submit an image.</Typography>
        )}
      </ResultPaper>
    </Box>
  );
};

export default ResultDisplay;
