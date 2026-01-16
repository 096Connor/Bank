import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ColorModeContext from "../theme/ColorModeContext";

export default function KlientHeader({ handleLogout }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: "0 4px 12px rgba(2,6,23,0.24)"
      }}
    >
      <Toolbar sx={{ py: 1.5, px: { xs: 2, md: 4 } }}>
        {/* Logo / tytuł */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: "2px",
            fontSize: "1.5rem",
            flexGrow: 1,
            cursor: "pointer",
            "&:hover": { opacity: 0.85 }
          }}
          onClick={() => navigate("/klient-home")}
        >
          💳 BANK
        </Typography>

        {/* Ikona profilu */}
        <IconButton
          color="inherit"
          onClick={() => navigate("/klient/profile")}
          sx={{
            mr: 2,
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
            }
          }}
        >
          <AccountCircleIcon />
        </IconButton>

        {/* Wyloguj */}
        <Button
          onClick={handleLogout}
          sx={{
            fontWeight: 600,
            px: 2,
            py: 1,
            borderRadius: 1,
            mr: 1,
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.2)",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.1)"
            }
          }}
        >
          Wyloguj się
        </Button>

        {/* Toggle dark/light mode */}
        <IconButton
          sx={{
            ml: 1,
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
            }
          }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
