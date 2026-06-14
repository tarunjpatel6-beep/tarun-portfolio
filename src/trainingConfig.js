// Central training visibility config — shared across the Finance Lab.
// Stores which tracks / capstone section / capstone scenarios are hidden,
// in a single Firestore doc so visibility is global for all visitors.
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxL5lDrrzJO_7L1zzbH37R6ArZuDiXHtU",
  authDomain: "finance-arena-ec4ff.firebaseapp.com",
  projectId: "finance-arena-ec4ff",
  storageBucket: "finance-arena-ec4ff.firebasestorage.app",
  messagingSenderId: "144073874887",
  appId: "1:144073874887:web:2a84bacbfb416261938de2",
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin passphrase — CHANGE THIS to your own secret before deploying.
// NOTE: light obscurity only (it lives in the site code), but it keeps the
// admin panel hidden from casual visitors. Firestore is open in test mode.
export const TRAINING_ADMIN_PASS = "tp-training-admin-2026";

// Read the hidden map: { "track:bca": true, "capstone:apex": true, ... }
export const loadVisibility = async () => {
  try {
    const snap = await getDoc(doc(db, "config", "visibility"));
    return snap.exists() ? (snap.data().hidden || {}) : {};
  } catch { return {}; }
};

export const saveVisibility = async (hidden) => {
  try { await setDoc(doc(db, "config", "visibility"), { hidden }); return true; } catch { return false; }
};

// Catalog of everything the admin can toggle. Keys must match how consumers read them.
export const TRAINING_CATALOG = {
  tracks: [
    { key: "track:defense", label: "EVMS — Defense Finance" },
    { key: "track:fpa", label: "FP&A Foundations" },
    { key: "track:bca", label: "Aircraft Contracts" },
  ],
  capstoneSection: { key: "section:capstone", label: "Capstone Projects (entire section)" },
  capstones: [
    { key: "capstone:raptor", label: "Raptor II Avionics — EVMS" },
    { key: "capstone:sentinel", label: "Sentinel Ground Station — EVMS" },
    { key: "capstone:meridian", label: "Meridian Cloud — FP&A" },
    { key: "capstone:apex", label: "Apex Industrial — FP&A" },
    { key: "capstone:paccrown", label: "Pacific Crown Airways — Aircraft" },
    { key: "capstone:skylease", label: "SkyLease Global — Aircraft" },
  ],
};
