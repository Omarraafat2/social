

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost } from "../../lib/postsSlice";
import { createComment, updateComment } from "../../lib/commentSlice";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const CommentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const CommentAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const CommentContent = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
}));

const AddCommentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const AddCommentInput = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(2),
}));

export default function UserPost({ postdetails, currentUser }) {
  const [expanded, setExpanded] = React.useState(false);
  const [newComment, setNewComment] = React.useState("");
  const [updatedPost, setUpdatedPost] = React.useState({ body: postdetails.body, image: postdetails.image });
  const [isUpdateFormVisible, setIsUpdateFormVisible] = React.useState(false);
  const [commentEdits, setCommentEdits] = React.useState({});
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentData = {
        content: newComment,
        post: postdetails._id,
      };
      dispatch(createComment(commentData));
      setNewComment("");
    }
  };

  const handleUpdatePost = async () => {
    const { body, image } = updatedPost; // Destructure body and image from updatedPost
    console.log("Updating post with:", { body, image }); // Log to check form data
    try {
      const formData = new FormData();
      formData.append("body", body);
      if (image instanceof File) {
        formData.append("image", image);
      } else {
        formData.append("image", image);
      }
      await dispatch(updatePost({ postId: postdetails._id, formData }));
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error states as needed
    }
  };

  const handleDeletePost = async () => {
    try {
      await dispatch(deletePost(postdetails._id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({ ...updatedPost, [name]: value });
  };

  const handleImageChange = (e) => {
    setUpdatedPost({ ...updatedPost, image: e.target.files[0] });
  };

  const handleCommentChange = (e, commentId) => {
    const { value } = e.target;
    setCommentEdits({ ...commentEdits, [commentId]: value });
  };

  const handleUpdateComment = (commentId) => {
    const updatedContent = commentEdits[commentId];
    if (updatedContent.trim()) {
      const commentData = {
        content: updatedContent,
      };
      dispatch(updateComment({ commentId, formData: commentData }));
      setCommentEdits({ ...commentEdits, [commentId]: "" });
    }
  };

  const toggleUpdateFormVisibility = () => {
    setIsUpdateFormVisible(!isUpdateFormVisible);
  };

  return (
    <StyledCard>
      <CardHeader
        avatar={<Avatar src={postdetails.user.photo} sx={{ bgcolor: red[500] }} aria-label="recipe" />}
        action={
          <React.Fragment>
            <IconButton aria-label="settings" onClick={toggleUpdateFormVisibility}>
              <MoreVertIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeletePost}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        }
        title={postdetails.user.name}
        subheader="September 14, 2016"
      />
      <CardMedia component="img" height="194" image={postdetails.image} alt="Post Image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postdetails.body}
        </Typography>
      </CardContent>
      {currentUser && currentUser.user._id === postdetails.user._id ? (
        <CardContent>
          <TextField
            label="Body"
            variant="outlined"
            name="body"
            value={updatedPost.body}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <input type="file" name="image" onChange={handleImageChange} />
          <Button variant="contained" color="primary" onClick={handleUpdatePost}>
            Update Post
          </Button>
        </CardContent>
      ) : null}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="show more"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          edge="end"
          size="large"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {postdetails?.comments?.map((comment) => (
            <CommentContainer key={comment._id}>
              <CommentAvatar src={comment.commentCreator.photo} />

              <div style={{ display: "block", justifyContent: "center", alignItems: "center", flexDirection: "column" ,marginLeft:"10px",backgroundColor:"#f1f1f1",width:"100%",borderRadius:"5px",padding:"10px"}}>

                <p style={{ display: "block", margin: "5px 0" }}>{comment.commentCreator.name}</p>

                <p>
                  {comment.content}
                </p>

              </div>
              <Box display="flex" flexDirection="column" flexGrow={1}>

                {currentUser && currentUser.user._id === comment.commentCreator._id ? (
                  <>
                    <TextField
                      label="Edit comment"
                      variant="outlined"
                      value={commentEdits[comment._id] || comment.content}
                      onChange={(e) => handleCommentChange(e, comment._id)}
                      size="small"
                      margin="normal"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateComment(comment._id)}
                    >
                      Update Comment
                    </Button>
                  </>
                ) : null}
              </Box>
            </CommentContainer>
          ))}
          <AddCommentContainer>
            <AddCommentInput
              label="Add a comment"
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="small"
            />
            <Button variant="contained" color="primary" onClick={handleAddComment}>
              Comment
            </Button>
          </AddCommentContainer>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}

