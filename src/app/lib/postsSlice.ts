

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Userpost from '../_comonents/userPost/page';

let headers = {
  token: localStorage.getItem("token"),
};
interface FormData {
  body: string;
  image: File | null;
}


export const getAllPosts = createAsyncThunk('postsSlice/getAllPosts', async () => {
  const response = await axios.get('https://linked-posts.routemisr.com/posts?limit=50', { headers });
  return response.data;
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (formData: PostFormData, thunkAPI) => {
    // Example async operation (replace with your API call)
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  }
);

export const updatePost = createAsyncThunk('postsSlice/updatePost', async ({ postId, formData }) => {
  try {
    const response = await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
      headers: { ...headers, 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error; // Ensure errors are properly handled
  }
});

export const deletePost = createAsyncThunk('postsSlice/deletePost', async (postId) => {
  await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, { headers });
  return postId;
});

// export const userofpost = createAsyncThunk('postsSlice/userofpost', async (postId) => {
//   await axios.get(`https://linked-posts.routemisr.com/users/${postId}/posts?limit=2`, { headers });
//   console.log(postId);
  
//   return postId;
// });

export const getUserPosts = createAsyncThunk('postsSlice/getUserPosts', async (userId) => {
  const response = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`, { headers });
 console.log(response.data);
 
  return response.data;
});

const initialState = { allPosts: [], isLoading: false, isError: null };

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
     
    .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPosts = action.payload.posts;
      })
      
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPosts = action.payload.posts;
      })

      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.allPosts.push(action.payload); // Add new post to the state
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload; // Assuming the backend sends back the updated post data
        const index = state.allPosts.findIndex(post => post._id === updatedPost._id);
        if (index !== -1) {
          state.allPosts[index] = updatedPost; // Update the post in the array
        }
        state.isLoading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.filter(post => post._id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
  reducers: {},
});

export const postsReducer = postsSlice.reducer;
export const {} = postsSlice.actions;
