import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ColorModeContext from "../theme/ColorModeContext";
import { useContext } from "react";

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
      <Toolbar sx={{ py: 1.5 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, letterSpacing: "2px", fontSize: "1.5rem", flexGrow: 1 }}
        >
          💳 BANK
        </Typography>
        <IconButton color="inherit" onClick={() => navigate("/klient/profile")} sx={{ mr: 1 }}>
          <AccountCircleIcon />
        </IconButton>

        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{
            fontWeight: 600,
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: "8px 16px",
            borderRadius: 1,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
          }}
        >
          Wyloguj się
        </Button>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
