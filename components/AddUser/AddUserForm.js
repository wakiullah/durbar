import Link from "next/link";
import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import classes from "./AddUserForm.module.css";
import { useRouter } from "next/router";

function AddUserForm({ users }) {
  const router = useRouter();
  const userCollectionRef = collection(db, "customers");
  const codeRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const gasNameRef = useRef();
  const mapLocationRef = useRef();
  const messageRef = useRef();

  const [laseUserCode, setLastUserCode] = useState(0);
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
    const createUser = async () => {
      await addDoc(userCollectionRef, userData);
    };
    createUser();
    router.push("/");
  };

  {
    users.map((user) => {
      if (Number(user.code) > laseUserCode) {
        setLastUserCode(Number(user.code));
      }
    });
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div>
          <h1 className={classes.title}>Add User</h1>
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
              />
              <p className={classes.red}>Last User Code Is : {laseUserCode}</p>
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
              ></textarea>
            </div>
          </div>
          <div className="field is-grouped">
            <div className={"control " + classes.width}>
              <button
                className={"button is-link " + classes.button}
                onClick={onSubmitHandler}
                disabled={number.length !== 11}
              >
                Submit{console.log(number.length)}
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
