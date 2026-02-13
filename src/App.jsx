import { useEffect, useState } from "react";
import UserView from "./pages/UserView";
import AdminView from "./pages/AdminView";
import Login from "./pages/Login";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/page`)
      .then((res) => res.json())
      .then((result) => {
        if (result === null) {
          console.log("No data yet in DB");
          setData(null);
        } else {
          setData(result);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  // If database empty
  if (!data) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>No Page Data Yet</h2>
        <p>Login as admin to create content.</p>
        <button onClick={() => setMode("admin")}>
          Go to Admin
        </button>

        {mode === "admin" && !isLoggedIn && (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}

        {mode === "admin" && isLoggedIn && (
          <AdminView
            data={{
              settings: {},
              sections: []
            }}
            setData={setData}
            closeAdmin={() => setMode("user")}
          />
        )}
      </div>
    );
  }

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
