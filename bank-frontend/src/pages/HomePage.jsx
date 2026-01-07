import { Box, Container, Typography, Grid, Paper, Button, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function HomePage() {
  const { user } = useAuth();
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
    { label: "Transakcje dzisiaj", value: stats.transactionsToday, color: "#10b981" }
  ];

  const actions = [
    { title: "Nowy klient", desc: "Zarejestruj nowego klienta", link: "/klienci/nowy", icon: "👤" },
    { title: "Przegląd klientów", desc: "Lista wszystkich klientów", link: "/klienci", icon: "📊" }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 5 }}>
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
        <Typography variant="h6" sx={{ color: "#666", fontWeight: 400 }}>
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
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                border: `2px solid ${stat.color}30`,
                borderRadius: 2,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 24px ${stat.color}20`
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
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1a1a1a" }}>
          Szybkie akcje
        </Typography>
        <Grid container spacing={3}>
          {actions.map((action, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "2px solid #e5e7eb",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                    borderColor: "#667eea"
                  }
                }}
                component={Link}
                to={action.link}
                style={{ textDecoration: "none" }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {action.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1a1a1a" }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
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
          background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
          border: "2px solid #667eea30",
          borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#667eea" }}>
          ℹ️ Informacja
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.8 }}>
          System zarządzania bankiem umożliwia efektywne zarządzanie kontami klientów, transakcjami
          i raportami. Korzystaj z menu nawigacyjnego aby przejść do poszczególnych modułów.
        </Typography>
      </Paper>
    </Container>
  );
}
