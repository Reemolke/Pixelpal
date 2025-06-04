import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase"; // ajusta la ruta según tu estructura

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
    return (
      <div>
        <p>Welcome {user.displayName}</p>
        <img src={user.photoURL} alt="profile" width="50" />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>
    );
  }
};

export default LoginComponent;
