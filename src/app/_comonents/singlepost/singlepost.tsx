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
import Modal from '@mui/material/Modal';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../../lib/postsSlice';
import { createComment, updateComment, deleteComment } from '../../lib/commentSlice';
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
  position: 'relative', // Added for positioning update/delete controls
}));

const CommentActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(1),
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export default function SinglePost({ postdetails, currentUser }) {
  const [expanded, setExpanded] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');
  const [updatedPost, setUpdatedPost] = React.useState({ body: '', image: null });
  const [isUpdateFormVisible, setIsUpdateFormVisible] = React.useState(false);
  const [commentEdits, setCommentEdits] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (postdetails) {
      setUpdatedPost({ body: postdetails.body, image: postdetails.image });
    }
  }, [postdetails]);

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
      setNewComment('');
    }
  };

  const handleUpdatePost = async () => {
    setLoading(true); // Show loading indicator
    const { body, image } = updatedPost;
    try {
      const formData = new FormData();
      formData.append("body", body);
      formData.append("image", image instanceof File ? image : postdetails.image);
      await dispatch(updatePost({ postId: postdetails._id, formData }));
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error states as needed
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleDeletePost = async () => {
    setLoading(true); // Show loading indicator
    try {
      await dispatch(deletePost(postdetails._id));
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false); // Hide loading indicator
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
    setLoading(true); // Show loading indicator
    const updatedContent = commentEdits[commentId];
    if (updatedContent.trim()) {
      const commentData = {
        content: updatedContent,
      };
      dispatch(updateComment({ commentId, formData: commentData }));
      setCommentEdits({ ...commentEdits, [commentId]: '' });
    } else {
      window.alert("You haven't made any changes to the comment.");
    }
    setLoading(false); // Hide loading indicator
  };

  const handleDeleteComment = async (commentId) => {
    setLoading(true); // Show loading indicator
    try {
      await dispatch(deleteComment({ commentId }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const toggleUpdateFormVisibility = () => {
    setIsUpdateFormVisible(!isUpdateFormVisible);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // console.log(postdetails);
  
  return (
    <div>
      {postdetails && ( // Ensure postdetails is defined before rendering
        <StyledCard>
          <CardHeader
            avatar={<Avatar src={postdetails.user?.photo} sx={{ bgcolor: red[500] }} aria-label="recipe" />}
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
            title={postdetails.user?.name} // Use optional chaining to avoid errors if user is undefined
            subheader="September 14, 2016"
          />
          <CardMedia component="img" height="194" image={postdetails.image} alt="Post Image" onClick={handleOpenModal} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {postdetails.body}
            </Typography>
          </CardContent>
          {currentUser && currentUser.user._id === postdetails.user?._id && isUpdateFormVisible ? (
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
                  <CommentAvatar src={comment.commentCreator?.photo} />
                  <CommentActions>
                    {currentUser && currentUser.user._id === comment.commentCreator?._id && (
                      <>
                        <IconButton aria-label="edit" onClick={() => handleUpdateComment(comment._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDeleteComment(comment._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </CommentActions>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ display: 'block', margin: '5px 0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>{comment.commentCreator?.name}</p>
                    <div
                      style={{
                        display: 'block',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginLeft: '10px',
                        backgroundColor: '#f1f1f1',
                        width: '100%',
                        borderRadius: '5px',
                        padding: '10px',
                      }}
                    >
                      <p>{comment.content}</p>
                    </div>
                    <Box display="block" flexDirection="column" flexGrow={1}>
                      {currentUser && currentUser.user._id === comment.commentCreator?._id ? (
                        <TextField
                          label="Edit comment"
                          variant="outlined"
                          defaultValue={comment.content}
                          onChange={(e) => handleCommentChange(e, comment._id)}
                          size="small"
                          margin="normal"
                        />
                      ) : null}
                    </Box>
                  </div>
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
      )}

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <StyledCard>
            <CardHeader
              avatar={<Avatar src={postdetails?.user?.photo} sx={{ bgcolor: red[500] }} aria-label="recipe" />}
              title={postdetails?.user?.name}
              subheader="September 14, 2016"
            />
            <CardMedia component="img" height="194" image={postdetails?.image} alt="Post Image" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {postdetails?.body}
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>
      </Modal>
    </div>
  );
}
