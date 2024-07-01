'use client';

import Getuserdata from '../_comonents/getuserdata';
import { Container, Typography, Avatar, styled, Grid, Paper, Box, Button, Divider, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import AddPost from '../_comonents/addpost/addpost';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../app/_interface/state";
import Spiner from ".././_mediaSpinner/Spiner";  // Ensure the correct path
import SinglePost from ".././_comonents/singlepost/singlepost";
import { getAllPosts } from "../lib/postsSlice";

const HomeContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  justifyContent: "center",
}));

const PostsContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { allPosts, isLoading } = useSelector((state: State) => state.posts);

  const handleUserDataFetched = (data) => {
    setCurrentUser(data);
    console.log('Fetched user data:', data);
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleEditProfile = () => {
    router.push('/upload-profile-photo');
  };

  const filteredItems = allPosts.filter(post => post?.user?._id === currentUser?.user?._id);

  return (
    <>
      <div style={{ marginBottom: "4rem", display: "flex", justifyContent: "center" }}>
        <Container sx={{ margin: "10px" }}>
          <Getuserdata onDataFetched={handleUserDataFetched} />
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <div className='flex'>
                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} container justifyContent="center">
                      <Avatar src={currentUser?.user?.photo} alt={currentUser?.user?.name} sx={{ width: 150, height: 150 }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h4">{currentUser?.user?.name}</Typography>
                        <Typography variant="subtitle1">{currentUser?.user?.dateOfBirth}</Typography>
                        <Typography variant="subtitle1">{currentUser?.user?.gender}</Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ my: 3 }}>
                        <Typography variant="h5">About</Typography>
                        <Typography variant="body1">
                          Hi, I'm a frontend developer. I hope you like this website!
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ my: 3 }}>
                        <Typography variant="h5">Contact</Typography>
                        <Typography variant="body1">Email: {currentUser?.user?.email}</Typography>
                        <Typography variant="body1">Phone: {currentUser?.user?.phone}</Typography>
                      </Box>
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary" onClick={handleEditProfile}>
                          Edit Profile
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
                <AddPost />
              </div>
              <PostsContainer container spacing={3}>
                {filteredItems.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={4}>
                    <SinglePost postdetails={post} currentUser={currentUser} />
                  </Grid>
                ))}
              </PostsContainer>
            </>
          )}
        </Container>
      </div>
    </>
  );
}
