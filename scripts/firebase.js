// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  applyState,
  cacheState,
  disableAllInputsAndButtons,
  enableAllInputsAndButtons,
} from "./state.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPeutFwkbZkmkpQaINgc62BzUuXbpyyLo",
  authDomain: "dnd-character-de6e4.firebaseapp.com",
  projectId: "dnd-character-de6e4",
  storageBucket: "dnd-character-de6e4.appspot.com",
  messagingSenderId: "67117312859",
  appId: "1:67117312859:web:e54e2e43d4fc1eb0f8887e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const isEditor = (() => {
  const _isEditor = localStorage.getItem("isEditor");

  if (_isEditor === null) {
    const result = confirm("are you an editor?");
    localStorage.setItem("isEditor", result);
    return result;
  } else {
    return _isEditor === "true";
  }
})();

export async function writeState(state) {
  try {
    await setDoc(doc(db, "state", "exampleState"), state);
  } catch (error) {
    console.error("Error saving state:", error);
  }
}

export async function readState() {
  const docRef = doc(db, "state", "exampleState");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const state = docSnap.data();
      console.log(state);
      return state;
    } else {
    }
  } catch (error) {
    console.error("Error reading state:", error);
  }
}

export function watchDB() {
  if (isEditor) return;

  onSnapshot(doc(db, "state", "exampleState"), (doc) => {
    if (doc.exists()) {
      state._store = doc.data();
      applyState();
      cacheState();
    }
  });
}

export function watchForAuthChange() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      disableAllInputsAndButtons();
      if (isEditor) {
        const email = window.prompt("email");
        const password = window.prompt("password");

        if (email && password)
          await signInWithEmailAndPassword(auth, email, password);
      }
    } else {
      enableAllInputsAndButtons();
    }
  });
}
