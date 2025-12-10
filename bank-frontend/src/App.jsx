import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import KlientAddPage from "./pages/KlientAddPage";
import KlientListPage from "./pages/KlientListPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/add">Dodaj klienta</Link> | <Link to="/list">Lista klientów</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<KlientAddPage />} />
        <Route path="/list" element={<KlientListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
