"use client"
import React, { useState } from 'react';
import {  useRouter } from 'next/navigation'; 
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

export default function Signup() {
  
let router =useRouter()
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        dateOfBirth: '',
        gender: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const validate = () => {
        let errors = {};

        if (!formValues.name || formValues.name.length < 3 || formValues.name.length > 10) {
            errors.name = 'Name must be between 3 and 10 characters';
        }

        if (!formValues.email.includes('@')) {
            errors.email = 'Email is invalid';
        }

        if (!formValues.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
            errors.password =
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long';
        }

        if (formValues.password !== formValues.rePassword) {
            errors.rePassword = 'Passwords must match';
        }

        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-(\d{4})$/;
        if (!formValues.dateOfBirth.match(datePattern)) {
            errors.dateOfBirth = 'Date must be in format dd-MM-yyyy';
        } else {
            const [day, month, year] = formValues.dateOfBirth.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            if (isNaN(date) || date < new Date(1900, 0, 1) || date > new Date()) {
                errors.dateOfBirth = 'Date is invalid or out of range';
            }
        }

        if (!formValues.gender) {
            errors.gender = 'Gender is required';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const [day, month, year] = formValues.dateOfBirth.split('-').map(Number);
            const formattedDate = `${year}-${month}-${day}`;

            const dataToSubmit = {
                ...formValues,
                dateOfBirth: formattedDate,
            };

            console.log('Form values', dataToSubmit);
            axios
                .post(`https://linked-posts.routemisr.com/users/signup`, dataToSubmit)
                .then((apiResponse) => {
                    if (apiResponse?.data?.message === 'success') {
                        console.log('success');
                        router.push('/home'); // Redirect to home page upon successful signup
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box margin={3} mt={4}>
                <Typography variant="h4" gutterBottom>
                    Signup
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            name="name"
                            onChange={handleChange}
                            value={formValues.name}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            value={formValues.email}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={formValues.password}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Re-enter Password"
                            name="rePassword"
                            type="password"
                            onChange={handleChange}
                            value={formValues.rePassword}
                            error={!!formErrors.rePassword}
                            helperText={formErrors.rePassword}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Date of Birth"
                            name="dateOfBirth"
                            onChange={handleChange}
                            value={formValues.dateOfBirth}
                            error={!!formErrors.dateOfBirth}
                            helperText={formErrors.dateOfBirth}
                        />
                    </Box>

                    <Box mb={2}>
                        <FormControl fullWidth variant="outlined" error={!!formErrors.gender}>
                            <InputLabel>Gender</InputLabel>
                            <Select name="gender" value={formValues.gender} onChange={handleChange} label="Gender">
                                <MenuItem value="">
                                    <em>Select gender</em>
                                </MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                            {formErrors.gender && <FormHelperText>{formErrors.gender}</FormHelperText>}
                        </FormControl>
                    </Box>

                    <Button color="primary" variant="contained" type="submit" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
