import { useRouter } from "next/router";
import { db } from "../firebase-config";
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import classes from "../styles/slug.module.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
function UserDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const docRef = doc(db, "customers", `${slug}`);
  const [isDelete, setIsDelete] = useState(0);
  const [color, setColor] = useState("rgb(122, 0, 0)");
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    gasName: "",
    mapLocation: "",
    message: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const userFromServer = await getDoc(docRef);
      const data = await userFromServer.data();
      console.log(data);
      if (data) {
        setUserDetails(data);
        console.log("j");
      }
    };
    getUsers();
  }, [docRef]);

  const UserDeleteHandler = () => {
    if (isDelete < 2) {
      if (isDelete === 0) {
        setColor("rgb(167, 0, 0)");
      } else if (isDelete === 1) {
        setColor("rgb(255, 0, 0)");
      }
      setIsDelete((prev) => prev + 1);
    } else {
      const deleteUser = async () => {
        await deleteDoc(docRef);
      };
      deleteUser();
      router.push("/");
    }
  };
 
  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.heading}>
          about {userDetails.name}(code-{userDetails.code}){" "}
        </h1>
      </div>
      <div>
        <hr />
        <table className="table is-fullwidth ">
          <thead>
            <tr>
              <th>Name</th>
              <th>{userDetails.name}</th>
            </tr>
            <tr>
              <th>Phone:</th>
              <th>{userDetails.phone}</th>
            </tr>
            <tr>
              <th>Address:</th>
              <th>{userDetails.address}</th>
            </tr>
            <tr>
              <th>Gas Name:</th>
              <th>{userDetails.gasName}</th>
            </tr>
            <tr>
              <th>Message:</th>
              <th>{userDetails.message}</th>
            </tr>
            <tr>
              <th>Google Location:</th>
              <th>
                <Link href={userDetails.mapLocation} passHref>
                  <a target="_blank" rel="">
                    Click here to get location
                  </a>
                </Link>
              </th>
            </tr>
          </thead>
        </table>
        <div className={classes.wrapper}>
          <button className={classes.backButton} onClick={() => router.back()}>
            Back
          </button>
          <div>
            <button
              className={classes.editButton}
              onClick={() => router.push(`/edit/${slug}`)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: color }}
              className={classes.deleteButton}
              onClick={UserDeleteHandler}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserDetails;
