'use client';
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: "40px auto", // Increased margin for better spacing
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(2),
}));

const ImagePreview = styled("img")({
  maxHeight: "200px",
  borderRadius: "8px",
  marginTop: "16px", // Increased margin for better spacing
  marginBottom: "16px", // Added margin bottom for spacing between the image and button
  width: "100%",
  objectFit: "cover",
});

export default function UploadPhoto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null); // Track the file object
  const [isUploading, setIsUploading] = useState(false);

  const headers = {
    token: localStorage.getItem("token"),
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]); // Save the file object
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    let formdata = new FormData();
    formdata.append("photo", file); // Append the file object with the key 'photo'

    try {
      let response = await axios.patch(
        `https://linked-posts.routemisr.com/users/upload-photo`,
        formdata,
        { headers }
      );
      console.log("Upload successful:", response.data);
      // Optionally, update the UI to reflect the new profile photo
      // For example, update Redux store or local state in your application
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <StyledBox>
      <Typography sx={{color:'black'}} marginY={8} variant="h6" gutterBottom>
        Upload Photo
      </Typography>
      <label htmlFor="image-upload" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          style={{ marginRight: "8px" }}
        >
          <PhotoCamera />
        </IconButton>
        <Typography variant="body1" style={{ marginRight: "8px" }}>
          Choose Image
        </Typography>
        <Typography variant="body2" component="span" sx={{ display: "flex", alignItems: "center" }}>
          Change your profile photo <EmojiEmotionsIcon sx={{ ml: 1 }} />
        </Typography>
      </label>
      {selectedImage && (
        <ImagePreview src={selectedImage} alt="Selected" />
      )}
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={isUploading}
      >
        Upload
      </StyledButton>
      {isUploading && <LinearProgress style={{ marginTop: "16px" }} />}
    </StyledBox>
  );
}
