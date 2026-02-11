import { useEffect, useState } from "react";
import UserView from "./pages/UserView";
import AdminView from "./pages/AdminView";
import Login from "./pages/Login";

function App() {
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/page")
      .then((res) => res.json())
      .then((dbData) => {
        if (dbData) setData(dbData);
      });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      {mode === "user" && (
        <UserView
          data={data}
          isAdmin={isLoggedIn}
          openAdmin={() => setMode("admin")}
        />
      )}

      {mode === "admin" && !isLoggedIn && (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}

      {mode === "admin" && isLoggedIn && (
        <AdminView
          data={data}
          setData={setData}
          closeAdmin={() => setMode("user")}
        />
      )}
    </>
  );
}

export default App;
