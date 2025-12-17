import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import PageNav from "../Componens/PageNav";
import { UseAuth } from "../contexts/FakeAuthContex";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = UseAuth();
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  function handleLogin() {
    login({ email, password });
  }
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </main>
  );
}
