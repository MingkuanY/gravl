"use client";

import styles from "../../styles/onboarding.module.scss";
import { useEffect, useState } from "react";
import Icon from "../icons/Icon.tsx";
import { useRouter } from "next/navigation";
import { uniqueUsername, updateUser } from "@/actions/actions.ts";

export default function Onboarding({ email }: { email: string }) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState({
    username: "",
    location: "",
    bio: "",
    pfp: "",
  });

  const wordLimit = 100;

  const [validUsername, setValidUsername] = useState(true);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step !== 1 || (await uniqueUsername(accountData.username))) {
          setValidUsername(true);
          setStep((step) => Math.min(step + 1, 4));
        } else {
          setValidUsername(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountData, step]);

  const handleSubmit = () => {
    //update user in prisma
    updateUser(
      email,
      accountData.username,
      accountData.location,
      accountData.bio
    );
    //redirect to user dashboard
    router.push(`/${accountData.username}`);
  };

  return (
    <>
      <div className={styles.overlay}>
        {step === 1 && (
          <div className={styles.container}>
            <p>Username</p>
            <div className={styles.inputContainer}>
              <div className={styles.returnContainer}>
                <p>Enter</p>
                <div className={styles.return_arrow}>
                  <Icon type="return_arrow" fill="#319fff" />
                </div>
              </div>
              <input
                type="text"
                value={accountData.username}
                required
                onChange={(e) =>
                  setAccountData({ ...accountData, username: e.target.value })
                }
              />
            </div>
            {!validUsername && (
              <p className={styles.warning}>Sorry, this username is taken.</p>
            )}
          </div>
        )}
        {step === 2 && (
          <div className={styles.container}>
            <div className={styles.headingContainer}>
              <p>Home Base</p>
              <div className={styles.pin}>
                <Icon type="pin" fill="#319fff" />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.returnContainer}>
                <p>Enter</p>
                <div className={styles.return_arrow}>
                  <Icon type="return_arrow" fill="#319fff" />
                </div>
              </div>
              <input
                type="text"
                value={accountData.location}
                placeholder="i.e. Atlanta, Georgia"
                onChange={(e) =>
                  setAccountData({ ...accountData, location: e.target.value })
                }
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={styles.container}>
            <p>Bio</p>
            <div className={styles.inputContainer}>
              <p className={styles.wordCount}>
                {accountData.bio.length}/{wordLimit}
              </p>
              <div className={styles.returnContainer}>
                <p>Enter</p>
                <div className={styles.return_arrow}>
                  <Icon type="return_arrow" fill="#319fff" />
                </div>
              </div>
              <textarea
                maxLength={100}
                value={accountData.bio}
                onChange={(e) =>
                  setAccountData({ ...accountData, bio: e.target.value })
                }
              />
            </div>
          </div>
        )}
        {step === 4 && (
          <div className={styles.container}>
            <p>You're all set!</p>
            <div
              className={`${styles.inputContainer} ${styles.uploadPFPContainer}`}
            >
              {/* <label className={styles.uploadPFP} htmlFor="pfp-upload">
                <div className={styles.account}>
                  <Icon type="account" fill="#319fff" />
                </div>
              </label>
              <input type="file" id="pfp-upload" /> */}
              <button onClick={handleSubmit}>Start Tracking</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
