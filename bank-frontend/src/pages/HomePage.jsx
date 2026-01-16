import { Box, Container, Typography, Grid, Paper, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useTheme } from "@mui/material/styles";

export default function HomePage() {
  const { user } = useAuth();
  const theme = useTheme();
  const [stats, setStats] = useState({ totalClients: 0, activeClients: 0, transactionsToday: 0 });

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get("/admin/stats");
        setStats(res.data || {});
      } catch (e) {
        console.error("Nie można pobrać statystyk", e);
      }
    })();
  }, []);

  const statsData = [
    { label: "Klienci (razem)", value: stats.totalClients, color: "#667eea" },
    { label: "Klienci aktywni", value: stats.activeClients, color: "#764ba2" },
    { label: "Transakcje dzisiaj", value: Math.ceil(stats.transactionsToday / 2), color: "#10b981" }
  ];

  const actions = [
    { title: "Nowy klient", desc: "Zarejestruj nowego klienta", link: "/klienci/nowy", icon: "👤" },
    { title: "Przegląd klientów", desc: "Lista wszystkich klientów", link: "/klienci", icon: "📊" }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1
          }}
        >
          Witaj, {user?.login || "Pracowniku"}! 👋
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 400 }}>
          Zarządzaj swoim bankiem z łatwością
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {statsData.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                border: `2px solid ${stat.color}30`,
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(135deg, ${stat.color}10 0%, ${stat.color}05 100%)`
                    : `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(0,0,0,0.5)"
                    : "0 4px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 12px 24px ${stat.color}20`
                }
              }}
            >
              <Typography variant="body2" sx={{ color: stat.color, fontWeight: 600, mb: 1 }}>
                {stat.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
          Szybkie akcje
        </Typography>
        <Grid container spacing={3}>
          {actions.map((action, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                component={Link}
                to={action.link}
                sx={{
                  height: "100%",
                  textDecoration: "none",
                  borderRadius: 3,
                  border: `2px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: theme.palette.background.paper,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 32px rgba(0,0,0,0.15)",
                    borderColor: "#667eea"
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {action.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.primary }}
                  >
                    {action.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {action.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Info Section */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          border: `2px solid ${theme.palette.mode === "dark" ? "#667eea40" : "#667eea30"}`,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #667eea10 0%, #764ba210 100%)"
              : "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 24px rgba(0,0,0,0.4)"
              : "0 4px 24px rgba(0,0,0,0.05)"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#667eea" }}>
          ℹ️ Informacja
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
          System zarządzania bankiem umożliwia efektywne zarządzanie kontami klientów, transakcjami
          i raportami. Korzystaj z menu nawigacyjnego aby przejść do poszczególnych modułów.
        </Typography>
      </Paper>
    </Container>
  );
}
