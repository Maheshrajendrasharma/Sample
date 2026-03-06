import { createContext, useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      try {

        if (currentUser) {

          setUser(currentUser);

          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            setRole("customer");
          }

        } else {

          setUser(null);
          setRole(null);

        }

      } catch (error) {

        console.error("AuthContext error:", error);
        setUser(null);
        setRole(null);

      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  return (

    <AuthContext.Provider value={{ user, role, loading }}>

      {!loading && children}

    </AuthContext.Provider>

  );

}

/* ---------- CUSTOM HOOK ---------- */

export function useAuth() {
  return useContext(AuthContext);
}