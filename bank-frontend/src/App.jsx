import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./layout/Layout";
import React, { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const KlientLoginPage = lazy(() => import("./pages/KlientLoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const KlientAddPage = lazy(() => import("./pages/KlientAddPage"));
const KlientHomePage = lazy(() => import("./pages/KlientHomePage"));
const KlientProfilePage = lazy(() => import("./pages/KlientProfilePage"));
const KlientListPage = lazy(() => import("./pages/KlientListPage"));
const KlientEditPage = lazy(() => import("./pages/KlientEditPage"));

function App() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/klient-login" element={<KlientLoginPage />} />

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
        <Route path="/klient-home" element={<KlientHomePage />} />
        <Route path="/klient/profile" element={<KlientProfilePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
