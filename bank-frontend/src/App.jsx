import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import KlientAddPage from "./pages/KlientAddPage";
import KlientLoginPage from "./pages/KlientLoginPage";
import KlientHomePage from "./pages/KlientHomePage";
import KlientProfilePage from "./pages/KlientProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* EMPLOYEE LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* CLIENT LOGIN */}
        <Route path="/klient-login" element={<KlientLoginPage />} />

        {/* EMPLOYEE HOME */}
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

        {/* ADD CLIENT */}
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

        {/* CLIENT HOME */}
        <Route path="/klient-home" element={<KlientHomePage />} />
        <Route path="/klient/profile" element={<KlientProfilePage />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
