"use client";

import styles from "../../styles/createaccountmodal.module.scss";
import { useState } from "react";
import Icon from "../icons/Icon.tsx";

export default function CreateAccountModal() {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState({
    username: "",
    location: "",
    bio: "",
    pfp: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className={styles.overlay}>
        {step === 1 && (
          <div className={styles.container}>
            <p>Username</p>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={accountData.username}
                onChange={(e) =>
                  setAccountData({ ...accountData, username: e.target.value })
                }
              />
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={styles.container}>
            <p>Home Base</p>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={accountData.location}
                onChange={(e) =>
                  setAccountData({ ...accountData, location: e.target.value })
                }
              />
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={styles.container}>
            <p>Bio</p>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={accountData.bio}
                onChange={(e) =>
                  setAccountData({ ...accountData, bio: e.target.value })
                }
              />
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className={styles.container}>
            <p>Upload Profile Pic</p>
            <div
              className={`${styles.inputContainer} ${styles.uploadPFPContainer}`}
            >
              <label className={styles.uploadPFP} htmlFor="pfp-upload">
                <div className={styles.account}>
                  <Icon type="account" fill="#319fff" />
                </div>
              </label>
              <input type="file" id="pfp-upload" />
              <button onClick={handleSubmit}>Complete</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
