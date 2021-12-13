import { Button, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const AdminDashboard = ({ setAdmin }) => {
  const history = useHistory();
  const [elements, setElements] = useState([]);
  const signOut = () => {
    setAdmin(false);
    history.push("/login");
  };
  useEffect(() => {
    const getUsers = async () => {
      let els = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        els.push(doc.data());
      });
      setElements(
        els.map((element) => (
          <tr key={element.uid}>
            <td>{element.uid}</td>
            <td>{element.displayName}</td>
            <td>{element.email}</td>
          </tr>
        ))
      );
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Welcome to Admin Dashboard!</h1>
      <Button>
        <Link to="/admin/login">Go to Login</Link>
      </Button>
      <Button color="red" onClick={signOut}>
        Logout
      </Button>
      <div
        style={{
          width: "400px",
          margin: "auto",
        }}
      >
        <Table striped>
          <thead>
            <tr>
              <th>uid</th>
              <th>displayName</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
