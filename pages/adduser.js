import AddUserForm from "../components/AddUser/AddUserForm";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

function AddUser() {
  const [users, setUsers] = useState([]);
  const [lastUserCode, setLastUserCode] = useState(0);

  const userCollectionRef = collection(db, "customers");

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await getDocs(userCollectionRef);
      setUsers(
        usersFromServer.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getUsers();
  }, []);

//   users.map((user) => {
//     // console.log(Number(user.code) > 0);
//     if (Number(user.code) > lastUserCode) {
//       console.log(Number(user.code));
//       setLastUserCode("hello");
//       console.log(lastUserCode + "last");
//     }
//   });
// console.log(name);

  return <AddUserForm users={users}/>;
}

export default AddUser;
