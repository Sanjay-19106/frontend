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
  fetch(`${import.meta.env.VITE_API_URL}/api/page`)
    .then(res => res.json())
    .then(data => {
      if (data) setData(data);
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
