import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Login } from "./Login";
import AdminLogin from "./AdminLogin";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import { Register } from "./Register";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setAdmin] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact>
          <Login setUser={setUser} />
        </Route>
        <Route path="/register" exact>
          <Register setUser={setUser} />
        </Route>
        <Route path="/admin/login" exact>
          <AdminLogin setAdmin={setAdmin} />
        </Route>
        {user && (
          <>
            {!isAdmin && (
              <Route path="/" exact>
                <UserDashboard />
              </Route>
            )}
          </>
        )}
        {isAdmin && (
          <Route path="/admin/" exact>
            <AdminDashboard setAdmin={setAdmin} />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
