import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Typography, Box, Link, Alert, Container } from "@mui/material";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setApiError("");
    setLoading(true);
    try {
      await login(data);
      navigate("/");
    } catch {
      setApiError("Błędny login lub hasło");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff"
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#667eea",
                mb: 1,
                fontSize: "2.5rem"
              }}
            >
              💳 BANK
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontWeight: 400,
                fontSize: "1rem"
              }}
            >
              Panel pracownika
            </Typography>
          </Box>

          {/* Error */}
          {apiError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {apiError}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Login"
              margin="normal"
              variant="outlined"
              {...register("login", { required: "Login jest wymagany" })}
              error={!!errors.login}
              helperText={errors.login?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s ease"
                }
              }}
            />

            <TextField
              fullWidth
              label="Hasło"
              type="password"
              margin="normal"
              variant="outlined"
              {...register("password", { required: "Hasło jest wymagane" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s ease"
                }
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)"
                },
                "&:disabled": {
                  opacity: 0.7
                }
              }}
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </Box>

          {/* Divider */}
          <Box sx={{ textAlign: "center", my: 3, position: "relative" }}>
            <Box sx={{ borderTop: "1px solid #e5e7eb" }} />
          </Box>

          {/* Client Login Link */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Jesteś klientem?
            </Typography>
            <Link
              href="/klient-login"
              underline="none"
              sx={{
                fontSize: "0.95rem",
                color: "#667eea",
                fontWeight: 600,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  color: "#764ba2"
                }
              }}
            >
              Zaloguj się tutaj
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
