import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

// Layouty i strony
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import KlientAddPage from "./pages/KlientAddPage";
import KlientLoginPage from "./pages/KlientLoginPage";
import KlientHomePage from "./pages/KlientHomePage";
import KlientProfilePage from "./pages/KlientProfilePage";
import KlientListPage from "./pages/KlientListPage";
import KlientEditPage from "./pages/KlientEditPage";

function App() {
  return (
    <Routes>
      {/* PRACOWNIK LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* KLIENT LOGIN */}
      <Route path="/klient-login" element={<KlientLoginPage />} />

      {/* PRACOWNIK HOME */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* DODAWANIE KLIENTA */}
      <Route
        path="/klienci/nowy"
        element={
          <ProtectedRoute>
            <Layout>
              <KlientAddPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* LISTA KLIENTÓW */}
      <Route
        path="/klienci"
        element={
          <ProtectedRoute>
            <Layout>
              <KlientListPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* EDYCJA KLIENTA */}
      <Route
        path="/klienci/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <KlientEditPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* KLIENT HOME */}
      <Route path="/klient-home" element={<KlientHomePage />} />

      {/* KLIENT PROFILE */}
      <Route path="/klient/profile" element={<KlientProfilePage />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
