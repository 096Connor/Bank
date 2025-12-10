import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            System bankowy
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/klienci">
            Klienci
          </Button>

          <Button color="inherit" component={Link} to="/klienci/nowy">
            Dodaj klienta
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>{children}</Container>
    </>
  );
}
