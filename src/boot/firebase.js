import { initializeApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useUserStore } from "../stores/user.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzv-GoDv-gEUNWtiE7se67P-Ol8Zv0iJw",
  authDomain: "push-ff88e.firebaseapp.com",
  projectId: "push-ff88e",
  storageBucket: "push-ff88e.appspot.com",
  messagingSenderId: "865742759140",
  appId: "1:865742759140:web:b760238065e357ff75f8f1",
};

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);

// Authen
const auth = getAuth();
const userStore = useUserStore();
onAuthStateChanged(auth, (user) => {
  console.log("user:", user);
  if (user) {
    userStore.user = user;
  } else {
    console.log("clear user");
    userStore.user = {};
  }
});

// Cloud Message
const messaging = getMessaging();

getToken(messaging, {
  vapidKey:
    "BGFVkGRRVerW_yGqT50wJey25BwPdEeZaeMHN81I2HYkWko5UqSPq-7joGNxryTZZQx9JUKVn1Iwxzu3pyQ89Bo",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      fetch("https://subscribetotopic-tbv24iyd2a-as.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentToken,
        }),
      }).then((res) => {
        res.json().then((r) => console.log(r));
      });
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one.",
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

// handle foreground notification
// forward to service worker
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);

  // send payload to sw to trigger notification
  navigator.serviceWorker.register("firebase-messaging-sw.js");
  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage(payload);
  });
});
