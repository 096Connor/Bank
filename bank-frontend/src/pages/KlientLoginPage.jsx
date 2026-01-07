import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, TextField, Button, Typography, Paper, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosClient from "../api/axiosClient";

export default function KlientLoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      pesel: "",
      pin: ""
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/klienci/login", {
        pesel: data.pesel,
        pin: data.pin
      });
      localStorage.setItem("klient", JSON.stringify(response.data));
      enqueueSnackbar("Zalogowano pomyślnie!", { variant: "success" });
      navigate("/klient-home");
    } catch {
      enqueueSnackbar("Nieprawidłowe dane logowania", { variant: "error" });
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
              Panel klienta
            </Typography>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="PESEL"
              type="text"
              margin="normal"
              placeholder="00000000000"
              variant="outlined"
              {...register("pesel", {
                required: "PESEL jest wymagany",
                pattern: {
                  value: /^\d{11}$/,
                  message: "PESEL musi zawierać 11 cyfr"
                }
              })}
              error={!!errors.pesel}
              helperText={errors.pesel?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "& fieldset": {
                    borderColor: "#e5e7eb"
                  },
                  "&:hover fieldset": {
                    borderColor: "#667eea"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    borderWidth: 2
                  }
                },
                "& .MuiInputBase-input": {
                  color: "#333" // Dodano: Ustawia kolor tekstu na ciemny dla lepszej widoczności
                }
              }}
            />

            <TextField
              fullWidth
              label="PIN"
              type="password"
              margin="normal"
              placeholder="••••"
              variant="outlined"
              {...register("pin", {
                required: "PIN jest wymagany",
                minLength: { value: 4, message: "PIN musi mieć minimum 4 znaki" }
              })}
              error={!!errors.pin}
              helperText={errors.pin?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "& fieldset": {
                    borderColor: "#e5e7eb"
                  },
                  "&:hover fieldset": {
                    borderColor: "#667eea"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    borderWidth: 2
                  }
                },
                "& .MuiInputBase-input": {
                  color: "#333" // Dodano: Ustawia kolor tekstu na ciemny dla lepszej widoczności (nawet dla pól typu password)
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

          {/* Employee Login Link */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Jesteś pracownikiem?
            </Typography>
            <Link
              href="/login"
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

          {/* Footer */}
          <Typography
            variant="caption"
            display="block"
            sx={{
              color: "#999",
              textAlign: "center",
              mt: 3,
              pt: 2,
              borderTop: "1px solid #e5e7eb"
            }}
          >
            © 2025 BANK. Wszystkie prawa zastrzeżone.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
