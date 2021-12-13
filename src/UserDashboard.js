import { Button } from "@mantine/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth } from "./firebase";

const UserDashboard = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome to User Dashboard!</h1>
      <Button>
        <Link to="/admin/login">Go to Admin Login</Link>
      </Button>
      <Button
        color="red"
        onClick={() => {
          signOut(auth);
          history.push("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserDashboard;
