import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

// Async thunk for creating a comment
export const createComment = createAsyncThunk('createComment', async (commentData) => {
  const headers = {
    token: getToken(),
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post('https://linked-posts.routemisr.com/comments', commentData, { headers });

    if (response.status !== 201) {
      throw new Error('Failed to create comment');
    }

    console.log(response);

    return response.data;

  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
});

// Async thunk for updating a comment
export const updateComment = createAsyncThunk('updateComment', async ({ commentId, formData }) => {
  const headers = {
    token: getToken(),
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, formData, { headers });

    if (response.status !== 200) {
      throw new Error('Failed to update comment');
    }

    return response.data;

  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
});

// Async thunk for deleting a comment
export const deleteComment = createAsyncThunk('deleteComment', async ({ commentId }) => {
  const headers = {
    token: getToken(),
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, { headers });

    if (response.status !== 200) {
      throw new Error('Failed to delete comment');
    }

    return commentId; // Return the commentId instead of response.data

  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
});

const initialState = {
  comments: [],
  userComment: null,
  isLoading: false,
  isError: null
};

const createCommentSlice = createSlice({
  name: "createComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload);
        state.userComment = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.comments.findIndex(comment => comment._id === action.payload._id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = state.comments.filter(comment => comment._id !== action.payload);
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const createCommentReducer = createCommentSlice.reducer;
