"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Input,
  TextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { addPost } from "@/app/lib/postsSlice";
import { useDispatch } from "react-redux";

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.divider,
  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
  outline: "none",
  fontSize: "1rem",
  fontFamily: theme.typography.fontFamily,
  resize: "vertical",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(2),
}));

const ImagePreview = styled("img")({
  maxHeight: "200px",
  borderRadius: "8px",
  marginTop: "16px",
  width: "100%",
  objectFit: "cover",
});

export default function AddPost() {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  let dispatch = useDispatch<any>();

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formdata = new FormData();
    let body = postContent;
    let image = (e.target as HTMLFormElement).image.files[0];
    formdata.append("body", body);
    formdata.append("image", image);
    dispatch(addPost(formdata));
    setPostContent("");
    setSelectedImage(null);
  };

  return (
    <StyledBox>
      <Typography variant="h6" gutterBottom>
        Create a Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <StyledTextarea
          name="body"
          value={postContent}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
          maxRows={6}
          minRows={3}
          sx={{backgroundColor:"white",resize:"none",color:"black"}}
        />
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          name="image"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="image-upload">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            style={{ marginTop: "16px" }}
          >
            <PhotoCamera />
          </IconButton>
          <Typography variant="body2" display="inline">
            Choose Image
          </Typography>
        </label>
        {selectedImage && <ImagePreview src={selectedImage} alt="Selected" />}
        <StyledButton
          variant="contained"
          color="primary"
          type="submit"
          disabled={!postContent && !selectedImage}
        >
          Add Post
        </StyledButton>
      </form>
    </StyledBox>
  );
}
