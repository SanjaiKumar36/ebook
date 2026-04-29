import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, onAuthStateChanged } from '../lib/firebase';
import { onSnapshot, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface UserContextType {
  user: any;
  profile: any;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfile: (data: any) => void;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      // ✅ IMPORTANT: stop global loading immediately
      setLoading(false);

      if (u) {
        try {
          const userRef = doc(db, 'users', u.uid);

          // Create user doc if not exists (non-blocking)
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists()) {
            const initial = {
              uid: u.uid,
              email: u.email,
              role: 'user',
              createdAt: serverTimestamp()
            };
            await setDoc(userRef, initial);
          }

          // Real-time listener (does NOT block UI)
          unsubscribeProfile = onSnapshot(
            userRef,
            (snapshot) => {
              if (snapshot.exists()) {
                setProfile(snapshot.data());
              }
            },
            (err) => {
              console.error("Firestore error:", err);
            }
          );

        } catch (err) {
          console.error("Profile setup error:", err);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  const updateProfile = (data: any) => {
    setProfile((prev: any) => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
};