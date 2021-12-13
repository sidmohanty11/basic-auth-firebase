import { Button, Card, TextInput } from "@mantine/core";
import React from "react";
import { auth, provider, db } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

export const Login = ({ setUser }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async ({ uid, displayName, email }) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid,
        displayName,
        email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
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
        <h3>Login Form</h3>
        <Button
          color="red"
          variant="outline"
          onClick={() =>
            signInWithPopup(auth, provider)
              .then((result) => {
                const user = result.user;
                setUser(user);
                addUser(user);
                history.push("/");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                console.log("error", errorCode, errorMessage, email);
              })
          }
        >
          LOGIN VIA GOOGLE
        </Button>
        <p>OR</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email === "" || password === "") {
              return;
            }
            signInWithEmailAndPassword(auth, email, password)
              .then((res) => {
                console.log(res);
                setUser(res.user);
                history.push("/");
              })
              .catch((error) => {
                console.log(error.message);
              });
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
          <p>
            Do not have an account yet?{" "}
            <Link style={{ color: "maroon" }} to="/register">
              Signup{" "}
            </Link>
            or{" "}
            <Link style={{ color: "maroon" }} to="/admin/login">
              Admin.
            </Link>
          </p>
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
