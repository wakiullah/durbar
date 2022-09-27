import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import classes from "./AddUserForm.module.css";
import { useRouter } from "next/router";

function AddUserForm({ users }) {
  const router = useRouter();
  const { slug } = router.query;
  const docRef = doc(db, "customers", `${slug}`);
  const userCollectionRef = collection(db, "customers");
  const codeRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const gasNameRef = useRef();
  const mapLocationRef = useRef();
  const messageRef = useRef();

  const [laseUserCode, setLastUserCode] = useState(0);

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

      if (data) {
        setUserDetails(data);
      }
    };
    getUsers();
  }, [docRef]);
  
 

  const [number, setNumber] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredCode = codeRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredGasName = gasNameRef.current.value;
    const enteredMapLocation = mapLocationRef.current.value;
    const enteredMessage = messageRef.current.value;

    const userData = {
      code: enteredCode,
      name: enteredName,
      phone: enteredPhone,
      address: enteredAddress,
      gasName: enteredGasName,
      mapLocation: enteredMapLocation,
      message: enteredMessage,
    };
    const updateUser = async () => {
      await updateDoc(docRef, userData);
    };
    updateUser();
    router.push("/");
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div>
          <h1 className={classes.title}>Edit User</h1>
        </div>
        <div>
          <div className="field">
            <label className="label">Code No.</label>
            <div className="control">
              <input
                className="input"
                ref={codeRef}
                type="number"
                placeholder="Code No."
                defaultValue={userDetails.code}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                ref={nameRef}
                type="text"
                placeholder="Name"
                defaultValue={userDetails.name}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control ">
              <input
                className="input"
                type="number"
                placeholder="Phone Number"
                ref={phoneRef}
                defaultValue={userDetails.phone}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Address</label>
            <div className="control ">
              <input
                className="input"
                type="text"
                placeholder="Address"
                ref={addressRef}
                defaultValue={userDetails.address}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">GAS Name</label>
            <div className="control ">
              <input
                className="input "
                type="text"
                placeholder="Gas Name"
                ref={gasNameRef}
                defaultValue={userDetails.gasName}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Google Map Location</label>
            <div className="control ">
              <input
                className="input"
                type="email"
                placeholder="text"
                ref={mapLocationRef}
                defaultValue={userDetails.mapLocation}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                className="textarea"
                ref={messageRef}
                placeholder="Textarea"
                defaultValue={userDetails.message}
              ></textarea>
            </div>
          </div>
          <div className="field is-grouped">
            <div className={"control " + classes.width}>
              <button
                className={"button is-link " + classes.button}
                onClick={onSubmitHandler}
                disabled={
                  number.length !== 11 && userDetails.phone.length !== 11
                }
              >
                Update Data
              </button>
            </div>
            <div className={"control " + classes.width1}>
              <Link href="/">
                <button
                  className={
                    "button is-link is-light is-light " + classes.button
                  }
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserForm;
