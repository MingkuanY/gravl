import SignUpButton from "@/components/landing/MapOutYourLife";
import styles from "../../styles/wrapped.module.scss";
import Header from "@/components/header/Header";

export default function WrappedPage() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>{currentYear} Travel Wrapped</h1>
        <h2>See where you&apos;ve been this year.</h2>
        <SignUpButton />
      </div>
    </>
  );
}
