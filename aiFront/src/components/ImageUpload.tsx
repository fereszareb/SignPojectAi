import React, { useState, useCallback } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDropzone } from "react-dropzone";

const DropzoneBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: "center",
  color: "#414141",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(215, 18, 64, 0.1)",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(2),
  "&:hover .image-overlay": {
    opacity: 1,
  },
}));

const ImagePreview = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  maxHeight: "300px",
  borderRadius: theme.shape.borderRadius,
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s",
  borderRadius: theme.shape.borderRadius,
}));

const OverlayIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  margin: theme.spacing(0, 1),
}));

interface ImageUploadProps {
  onSubmit: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: !!selectedImage,
  });

  const handleSubmit = () => {
    if (selectedImage) {
      onSubmit(selectedImage);
    }
  };

  const handleDelete = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  return (
    <Box>
      {!selectedImage ? (
        <DropzoneBox {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <Typography>Drop the image here...</Typography> : <Typography>Drag and drop an image here, or click to select a file</Typography>}
          <CloudUploadIcon sx={{ fontSize: 48, color: "#d71240", mt: 2 }} />
        </DropzoneBox>
      ) : (
        <ImageContainer>
          <ImagePreview src={previewUrl!} alt="Preview" />
          <ImageOverlay className="image-overlay">
            <OverlayIconButton onClick={handleDelete} aria-label="delete image">
              <DeleteIcon />
            </OverlayIconButton>
            <OverlayIconButton onClick={open} aria-label="update image">
              <EditIcon />
            </OverlayIconButton>
          </ImageOverlay>
        </ImageContainer>
      )}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedImage}
          startIcon={<SendIcon />}
          sx={{ backgroundColor: "#d71240", "&:hover": { backgroundColor: "#ff5258" } }}
        >
          Submit for AI Processing
        </Button>
      </Box>
    </Box>
  );
};

export default ImageUpload;
