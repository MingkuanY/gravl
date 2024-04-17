import styles from "../styles/nopage.module.scss";
import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";

export default function NoPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.deadEndSign}>
          <p>Dead End</p>
        </div>
        <h1>Oops, it looks like this page doesn't exist!</h1>
        <button onClick={() => navigate("/dashboard")}>
          U-turn to Dashboard
        </button>
      </div>
    </>
  );
}
