import { useRef } from "react";
import classes from "./Login.module.css";

function Login({ onClick }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    if (email === "durbar.service" && password === "durbar6") {
      onClick();
    }
  };

  return (
    <div className={classes.Login}>
      <div className={classes.background}>
        <div className={classes.shape}></div>
        <div className={classes.shape}></div>
      </div>
      <form className={classes.form}>
        <h3>Login Here</h3>

        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          ref={emailRef}
          type="text"
          className={classes.input}
          placeholder="Username"
          id="username"
        />

        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          ref={passwordRef}
          className={classes.input}
          type="text"
          placeholder="Password"
          id="password"
        />

        <button className={classes.button} onClick={onSubmitHandler}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
