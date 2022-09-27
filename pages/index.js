import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import Lists from "../components/Lists/Lists";
import { db } from "../firebase-config";
import { collection, getDocs, query } from "firebase/firestore";
import Login from "../components/Login/Login";

export default function Home() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = query(collection(db, "customers"));
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await getDocs(userCollectionRef);

      const allUsers = usersFromServer.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedUsers = allUsers.sort((a, b) => a.code - b.code);
      setUsers(sortedUsers);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("auth"));
    if (items) {
      setAuth(items);
    }
    console.log(items);
  }, []);

  function loginHandler() {
    localStorage.setItem("auth", JSON.stringify(true));
    setAuth(true);
  }
  if (!auth) {
    return <Login onClick={loginHandler} />;
  } else {
    return (
      <div>
        <Header />
        <Lists users={users} />
      </div>
    );
  }
}
