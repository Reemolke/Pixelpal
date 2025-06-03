import React, { useState } from "react";
import { auth, provider, signInWithPopup, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const LoginComponent = () => {
  const [user, setUser] = useState(null);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date(),
      });

      setUser(user);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  if (user) {
    return React.createElement(
      "div",
      null,
      React.createElement("p", null, "Welcome " + user.displayName),
      React.createElement("img", {
        src: user.photoURL,
        alt: "profile",
        width: "50",
      })
    );
  } else {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { onClick: loginWithGoogle },
        "Login with Google"
      )
    );
  }
};

export default LoginComponent;
