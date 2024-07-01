'use client'
import axios from "axios";
import { useFormik } from "formik";
import { Box, Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import { useRouter } from 'next/navigation';
export default function ChangePassword() {
    let headers = { token: localStorage.getItem('token') };
    let router=useRouter()

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
        },
        onSubmit: async (values) => {
            const response = await axios.patch(`https://linked-posts.routemisr.com/users/change-password`, values, { headers });

            if (response.data.message === 'success') {
                // Assuming the token is in response.data.token
                const token = response.data.token;
                // Store the token in localStorage
                localStorage.setItem('token', token);
                // Navigate to the home page or another route
                router.push('/'); // Replace '/home' with your target route
            }
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="newPassword"
                        type="newPassword"
                        id="newPassword"
                        autoComplete="current-newPassword"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
