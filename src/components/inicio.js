import React from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase"; // ajusta la ruta según tu estructura

const LoginComponent = ({ setMenuEstancia, user, setUser }) => {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;

      await setDoc(doc(db, "users", loggedUser.uid), {
        uid: loggedUser.uid,
        name: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        lastLogin: new Date(),
      });

      setUser(loggedUser);
      setMenuEstancia("menu"); // aquí defines a qué vista cambiar tras el login
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="menu">
      
        <div
          className="card"
          style={{ justifyContent: "space-evenly", cursor: "pointer" }}
          onClick={loginWithGoogle}
        >
          <p>Iniciar sesión con</p>
          <img src="google.png" style={{ width: "2vw", height: "4vh" }} alt="Google" />
        </div>
      
    </div>
  );
};

export default LoginComponent;
