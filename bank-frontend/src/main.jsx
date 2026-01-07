import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./auth/AuthProvider";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ColorModeContext from "./theme/ColorModeContext";

// export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Root() {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", next);
          return next;
        });
      }
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#1e3a8a" : "#90caf9" },
          background: { default: mode === "light" ? "#f5f7fa" : "#0f1724" }
        },
        typography: { fontFamily: "Inter, Roboto, Arial" }
      }),
    [mode]
  );

  return (
    <React.StrictMode>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
