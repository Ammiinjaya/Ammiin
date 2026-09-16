/* ============================================================
   AMMIIN — firebase-config.js
   ─────────────────────────────────────────────────────────
   CARA SETUP (sekali saja):

   1. Buka https://console.firebase.google.com
   2. Klik "Add project" → beri nama (misal: ammiin-app) → Create
   3. Di dashboard project, klik ikon Web (</>)
   4. Register app (nama bebas) → copy nilai firebaseConfig ke bawah
   5. Di sidebar kiri:
      - Build → Firestore Database → Create database → Start in test mode
      - Build → Storage → Get started → Start in test mode
   6. Setelah itu, replace semua nilai "PASTE_YOUR_..." di bawah

   FIRESTORE RULES (Rules tab di Firestore):
   ──────────────────────────────────────────
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }

   STORAGE RULES (Rules tab di Storage):
   ──────────────────────────────────────
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if true;
       }
     }
   }
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyBcb6AFdvSKpwFcRsXa_226qzXkp9RLmZM",
  authDomain: "ammiinjaya-75fe0.firebaseapp.com",
  projectId: "ammiinjaya-75fe0",
  storageBucket: "ammiinjaya-75fe0.firebasestorage.app",
  messagingSenderId: "496955964382",
  appId: "1:496955964382:web:17f69f4d65236d93d57b4f"
};

/* Inisialisasi Firebase — Firestore untuk data / teks */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ============================================================
   CLOUDINARY CONFIG — Tempat Foto & Video (100% Gratis 25 GB)
   Ganti nilai di bawah dengan Cloud Name dan Upload Preset kamu:
   ============================================================ */
const cloudinaryConfig = {
  cloudName: "ygrnpoz1",    // Contoh: "dx9k2la1"
  uploadPreset: "evcxhrai"  // Preset dengan signing mode: "Unsigned"
};

