import { Button, Card, TextInput } from "@mantine/core";
import React from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

export const Register = ({ setUser }) => {
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
        <h3>Register Form</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email === "" || password === "") {
              return;
            }
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                addUser(user);
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
            Have an account?{" "}
            <Link style={{ color: "maroon" }} to="/login">
              Login.
            </Link>
          </p>
          <Button
            style={{ marginTop: "10px" }}
            color="blue"
            variant="outline"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};
