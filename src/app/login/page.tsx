"use client";

import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import TextFieldDefault from '../components/molecules/text-field/default';
import Image from 'next/image';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const methods = useForm<LoginFormData>();
  const { control, handleSubmit, formState: { errors } } = methods;
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 2
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        
        <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold">
          Login
        </Typography>
        <Image src={"/logo.svg"} alt="Logo" width={100} height={100} style={{ objectFit: 'contain', alignSelf: 'center' }} />
        
        {error && (
          <Box
            sx={{
              p: 2,
              bgcolor: 'error.light',
              color: 'error.main',
              borderRadius: 1
            }}
          >
            {error}
          </Box>
        )}
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <TextFieldDefault
              name="email"
              control={control}
              label="Email"
              errors={errors.email?.message}
              variant="outlined"
            />

            <TextFieldDefault
              name="password"
              control={control}
              label="Password"
              errors={errors.password?.message}
              variant="outlined"
              type="password"
            />

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="left"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() => router.push('/forgot-password')}
            >
              Forgot password?
            </Typography>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 'medium'
              }}
            >
              Login
            </Button>
          </Box>

          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <Link
                component="button"
                onClick={handleRegisterRedirect}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'medium'
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}