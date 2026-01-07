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
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: "0 4px 12px rgba(2,6,23,0.24)",
          backdropFilter: "blur(6px)"
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "2px",
              fontSize: "1.5rem"
            }}
          >
            💳 BANK
          </Typography>

          {user && (
            <Typography variant="body2" sx={{ mr: 3, opacity: 0.9 }}>
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
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
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
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
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
              backgroundColor: "rgba(255,255,255,0.2)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
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
