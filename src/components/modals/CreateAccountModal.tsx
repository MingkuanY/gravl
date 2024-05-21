"use client";

import styles from "../../styles/createaccountmodal.module.scss";
import { useState } from "react";
import Icon from "../icons/Icon.tsx";

export default function CreateAccountModal() {
  const [accountData, setAccountData] = useState({
    username: "",
    location: "",
    bio: "",
    pfp: "",
  });

  const handleSubmit = () => {};

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <p>Get ready to explore the world.</p>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Username"
              value={accountData.username}
              onChange={(e) =>
                setAccountData({ ...accountData, username: e.target.value })
              }
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Home Base"
              value={accountData.location}
              onChange={(e) =>
                setAccountData({ ...accountData, location: e.target.value })
              }
            />
          </div>
          <div className={styles.inputContainer}>
            <textarea
              placeholder="Bio"
              rows={2}
              value={accountData.bio}
              onChange={(e) =>
                setAccountData({ ...accountData, bio: e.target.value })
              }
            />
          </div>
          <div
            className={`${styles.inputContainer} ${styles.uploadPFPContainer}`}
          >
            <label className={styles.uploadPFP} htmlFor="pfp-upload">
              <div className={styles.account}>
                <Icon type="account" fill="#989898" />
              </div>
              <p>Upload Profile Pic</p>
            </label>
            <input type="file" id="pfp-upload" />
            <button onClick={handleSubmit}>Start Tracking</button>
          </div>
        </div>
      </div>
    </>
  );
}
