"use client";

import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import TextFieldDefault from "../components/molecules/text-field/default";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ModalErrorUtil, ModalSuccessUtil } from "@/helpers/modal";

interface ForgotPasswordFormData {
  email: string;
  new_password: string;
  confirm_password: string;
}

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const methods = useForm<ForgotPasswordFormData>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [error, setError] = useState("");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (data.new_password !== data.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      await forgotPassword(data.email, data.new_password, data.confirm_password);
      ModalSuccessUtil.showModal(
        "Your password has been reset successfully.",
        () => {
          // Optionally redirect or perform another action
          window.location.href = "/login"; // Redirect to login page
        },
      )
    } catch (err) {
      console.error(err);
      ModalErrorUtil.showModal(
        "Failed to reset password. Please check your email and try again.",
        () => {
          // Optionally redirect or perform another action
        },
      )
    }
    setError("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Reset Password
        </Typography>
        <Image src={"/logo.svg"} alt="Logo" width={100} height={100} style={{ objectFit: 'contain', alignSelf: 'center', marginBottom: 20 }} />
        

        {error && (
          <Box
            sx={{
              p: 2,
              bgcolor: "error.light",
              color: "error.main",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            {error}
          </Box>
        )}

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextFieldDefault
              name="email"
              control={control}
              label="Email"
              errors={errors.email?.message}
              variant="outlined"
            />

            <TextFieldDefault
              name="new_password"
              control={control}
              label="Create New Password"
              type="password"
              errors={errors.new_password?.message}
              variant="outlined"
            />

            <TextFieldDefault
              name="confirm_password"
              control={control}
              label="Confirm New Password"
              type="password"
              errors={errors.confirm_password?.message}
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5, fontWeight: "medium" }}
            >
              Submit
            </Button>

            <Typography variant="body2" textAlign="center">
              Remembered your password?{" "}
              <Link
                href="/login"
                style={{ color: "#1976d2", textDecoration: "none" }}
                onMouseOver={e => (e.currentTarget.style.textDecoration = "underline")}
                onMouseOut={e => (e.currentTarget.style.textDecoration = "none")}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}
