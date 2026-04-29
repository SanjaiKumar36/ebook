import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

// ✅ DIRECT CONFIG (NO JSON FILE)
const firebaseConfig = {
  apiKey: "AIzaSyDILPbgkMix2v2fXRPhMzm_S-7jp15UOoo",
  authDomain: "zippybooks-4f566.firebaseapp.com",
  projectId: "zippybooks-4f566",
  storageBucket: "zippybooks-4f566.appspot.com",
  messagingSenderId: "384983332062",
  appId: "1:384983332062:web:43ba38da5b3e0fa99d7e4f"
};

const app = initializeApp(firebaseConfig);

// ✅ SIMPLE & STABLE
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ SAFE ERROR HANDLER
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write"
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error("Firestore Error:", {
    error,
    operationType,
    path,
    user: auth.currentUser?.uid
  });
}

// ✅ EXPORTS
export {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  onSnapshot
};

export const isFirestoreOffline = false;