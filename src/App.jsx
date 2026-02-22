import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserView from "./pages/UserView";
import AdminView from "./pages/AdminView";
import Login from "./pages/Login";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const isAdmin = !!token;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/page`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 Public Route */}
        <Route
          path="/"
          element={<UserView data={data} />}
        />

        {/* 🔐 Admin Route */}
        <Route
          path="/admin"
          element={
            isAdmin
              ? <AdminView data={data} setData={setData} />
              : <Login />
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;