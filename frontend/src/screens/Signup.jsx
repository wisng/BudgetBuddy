import React from "react";
import styles from "../stylesheets/Signup.module.css";

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.branding}>
        <h1 className={styles.logo}>BudgetBuddy</h1>
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Email</label>
          <input type="email" placeholder="Enter email" />

          <label>Username</label>
          <input type="text" placeholder="Enter username" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          <label>Confirmation Password</label>
          <input type="password" placeholder="Enter matching password" />

          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
          <div className={styles.googleSignIn}>
            <img src="google-icon.png" alt="Google Icon" className={styles.googleIcon} />
          </div>
          <p className={styles.signInText}>
            Have an account? <a href="#">Sign-in instead</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
