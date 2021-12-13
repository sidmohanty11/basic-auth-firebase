import React, { useState } from "react";
import { Button, Card, TextInput } from "@mantine/core";
import { useHistory } from "react-router";

const AdminLogin = ({ setAdmin }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAdmin = () => {
    if (email === "admin@admin.com" && password === "admin") {
      setAdmin(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card shadow="sm" padding="xl" style={{ width: "400px" }}>
        <h3>
          <span style={{ color: "violet" }}>ADMIN</span> Login Form
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isAdmin();
            history.push("/admin");
          }}
        >
          <TextInput
            label="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            color="blue"
            variant="outline"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
