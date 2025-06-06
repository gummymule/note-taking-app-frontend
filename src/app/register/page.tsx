"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TextFieldDefault from '../components/molecules/text-field/default';
import { Box, Modal, Typography, Alert, Button, Link } from '@mui/material';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const methods = useForm<RegisterFormData>();
  const { control, handleSubmit, watch, formState: { errors } } = methods;
  const [error, setError] = useState('');
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password, data.password_confirmation);
      setOpen(false);
      router.push('/');
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push('/'); // Redirect on modal close (optional)
  };

  const handleRegisterRedirect = () => {
    setOpen(false);
    router.push('/login');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Register
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <TextFieldDefault
              name="name"
              control={control}
              label="Name"
              errors={errors.name?.message}
              rules={{ required: 'Name is required' }}
            />

            <TextFieldDefault
              name="email"
              control={control}
              label="Email"
              errors={errors.email?.message}
              type="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
            />

            <TextFieldDefault
              name="password"
              control={control}
              label="Password"
              errors={errors.password?.message}
              type="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
            />

            <TextFieldDefault
              name="password_confirmation"
              control={control}
              label="Confirm Password"
              errors={errors.password_confirmation?.message}
              type="password"
              rules={{
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === watch('password') || 'Passwords do not match',
              }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
        </FormProvider>
        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{' '}
          <Link component="button" onClick={handleRegisterRedirect} fontWeight="medium">
            Login here
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
}
