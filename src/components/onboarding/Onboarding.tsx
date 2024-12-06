"use client";

import styles from "../../styles/onboarding.module.scss";
import { useEffect, useRef, useState } from "react";
import Icon from "../icons/Icon.tsx";
import { useRouter } from "next/navigation";
import { uniqueUsername, updateUser } from "@/actions/actions.ts";
import CloseBtn from "../log/CloseBtn.tsx";
import classnames from "classnames";
import { useScreenWidth } from "@/utils/hooks.ts";

type validity = "DEFAULT" | "TAKEN" | "INVALID";

export default function Onboarding({
  email,
  user,
  setClose,
}: {
  email: string;
  user?: any;
  setClose?: Function;
}) {
  const isMobile = useScreenWidth();

  const router = useRouter();

  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState({
    username: user ? user.username : "",
    location: user ? user.location : "",
    bio: user ? user.bio : "",
    pfp: "",
  });

  const characterLimit = 100;

  const [validUsername, setValidUsername] = useState<validity>("DEFAULT");

  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Validity test for proposed username.
   *
   * @param input proposed username
   * @returns values of validityTest (whether username already exists or is a keyword) and regexTest (if it doesn't contain the right characters)
   */
  const valid = async (input: string) => {
    // Validity check that username has no uppercase letters, spaces nor special characters except for underscores
    const validUsernameRegex = /^[a-z0-9_]+$/;
    const regexTest = validUsernameRegex.test(input) && input.length <= 15; // True means valid

    // Keywords that username cannot be
    const disallowedKeywords = [
      "wrapped"
    ]
    const keywordTest = !disallowedKeywords.includes(input.toLowerCase());

    // Ensure the inputted username passes unique, validity, and keyword checks
    const validityTest = (await uniqueUsername(input)) && regexTest && keywordTest; // True means valid
    return { validityTest, regexTest }
  }

  /**
   * Called when the user tries to move on to the next step, either through pressing Enter on desktop or clicking Next on mobile
   */
  const handleNext = async () => {
    console.log("triggered")
    const input = accountData.username;

    const { validityTest, regexTest } = await valid(input)

    if (step === 1) {
      // Username
      if (user) {
        console.log("Next step with existing user")
        // Editing profile - profile already exists
        if (user.username === input || validityTest) {
          // Not changing username or the new username passes validity test
          setValidUsername("DEFAULT");
          nextStep();
        } else {
          // Changing to a new, valid username
          setValidUsername(regexTest ? "TAKEN" : "INVALID");
        }
      } else {
        // Onboarding - profile does not exist yet
        if (validityTest) {
          setValidUsername("DEFAULT");
          nextStep();
        } else {
          setValidUsername(regexTest ? "TAKEN" : "INVALID");
        }
      }
    } else {
      // Non-username fields
      nextStep();
    }
  };

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (!setClose && e.key === "Enter") {
        await handleNext();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        setClose
      ) {
        setClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountData, step]);

  /**
   * Correctly guides the user to the next step if editing profile or skips to the end if onboarding
   */
  const nextStep = () => {
    if (user) {
      // Go to next step if editing profile
      setStep((step) => Math.min(step + 1, 4));
    } else {
      // Skip other profile info if new user
      handleSubmit();
    }
  };

  /**
   * Updates user with inputed info and redirects user to dashboard
   */
  const handleSubmit = async () => {
    if (
      user &&
      user.username === accountData.username &&
      user.location === accountData.location &&
      user.bio === accountData.bio
    ) {
    } else {
      const { validityTest, regexTest } = await valid(accountData.username)
      if (validityTest) {
        //update user in prisma
        await updateUser(
          email,
          accountData.username,
          accountData.location,
          accountData.bio
        );
      } else {
        setValidUsername(regexTest ? "TAKEN" : "INVALID");
        return;
      }
    }

    //redirect to user dashboard
    if (setClose) {
      setClose();
    }

    router.push(`/${accountData.username}`);
  };

  return (
    <>
      <div className={styles.overlay}>
        <div
          className={classnames(
            styles.container,
            setClose && styles.combinedModal
          )}
          ref={containerRef}
        >
          {(step === 1 || setClose) && (
            <>
              <p>Username</p>
              <div className={styles.inputContainer}>
                <div className={styles.returnContainer}>
                  {isMobile ? (
                    <button className={styles.nextBtn} onClick={handleNext}>
                      Next
                    </button>
                  ) : (
                    <>
                      <p>Enter</p>
                      <div className={styles.return_arrow}>
                        <Icon type="return_arrow" fill="#319fff" />
                      </div>
                    </>
                  )}
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
              {validUsername === "TAKEN" && (
                <p className={styles.warning}>Sorry, this username is taken.</p>
              )}
              {validUsername === "INVALID" && (
                <p className={styles.warning}>
                  Please only use lowercase letters and underscores.
                </p>
              )}
              {setClose && <CloseBtn setClose={setClose} />}
            </>
          )}
          {(step === 2 || setClose) && (
            <>
              <div className={styles.headingContainer}>
                <p>Home Base</p>
                <div className={styles.pin}>
                  <Icon type="pin" fill="#319fff" />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.returnContainer}>
                  {isMobile ? (
                    <button className={styles.nextBtn} onClick={handleNext}>
                      Next
                    </button>
                  ) : (
                    <>
                      <p>Enter</p>
                      <div className={styles.return_arrow}>
                        <Icon type="return_arrow" fill="#319fff" />
                      </div>
                    </>
                  )}
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
              {setClose && <CloseBtn setClose={setClose} />}
            </>
          )}
          {(step === 3 || setClose) && (
            <>
              <p className={styles.bioLabel}>Bio</p>
              <div className={styles.inputContainer}>
                <p className={styles.characterCount}>
                  {accountData.bio.length}/{characterLimit}
                </p>
                <div className={styles.returnContainer}>
                  {isMobile ? (
                    <button className={styles.nextBtn} onClick={handleNext}>
                      Next
                    </button>
                  ) : (
                    <>
                      <p>Enter</p>
                      <div className={styles.return_arrow}>
                        <Icon type="return_arrow" fill="#319fff" />
                      </div>
                    </>
                  )}
                </div>
                <textarea
                  maxLength={characterLimit}
                  value={accountData.bio}
                  onChange={(e) =>
                    setAccountData({ ...accountData, bio: e.target.value })
                  }
                />
              </div>
              {setClose && <CloseBtn setClose={setClose} />}
            </>
          )}
          {(step === 4 || setClose) && (
            <>
              {!setClose && <p>You&apos;re all set!</p>}
              <div
                className={classnames(
                  styles.inputContainer,
                  styles.uploadPFPContainer
                )}
              >
                {/* <label className={styles.uploadPFP} htmlFor="pfp-upload">
                <div className={styles.account}>
                  <Icon type="account" fill="#319fff" />
                </div>
              </label>
              <input type="file" id="pfp-upload" /> */}
                <button onClick={handleSubmit}>Save</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
