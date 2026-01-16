import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React, { useContext } from "react";
import ColorModeContext from "../theme/ColorModeContext";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: theme.palette.primary.contrastText,
          boxShadow: "0 4px 12px rgba(2,6,23,0.24)",
          backdropFilter: "blur(8px)"
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "2px",
              fontSize: "1.5rem",
              color: "#fff"
            }}
          >
            💳 BANK
          </Typography>

          {user && (
            <Typography variant="body2" sx={{ mr: 3, color: theme.palette.text.secondary }}>
              {user.login}
            </Typography>
          )}

          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              mx: 1,
              fontWeight: 600,
              borderRadius: 1,
              color: theme.palette.mode === "dark" ? "#e0e0e0" : "#fff",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.25)"
              }
            }}
          >
            Panel
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/klienci/nowy"
            sx={{
              mx: 1,
              fontWeight: 600,
              borderRadius: 1,
              color: theme.palette.mode === "dark" ? "#e0e0e0" : "#fff",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.25)"
              }
            }}
          >
            Nowy klient
          </Button>

          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              mx: 1,
              fontWeight: 600,
              borderRadius: 1,
              color: theme.palette.mode === "dark" ? "#fff" : "#fff",
              backgroundColor:
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.25)",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.35)"
              }
            }}
          >
            Wyloguj
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box>{children}</Box>
      </Container>
    </>
  );
}
