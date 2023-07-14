// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js",
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAzv-GoDv-gEUNWtiE7se67P-Ol8Zv0iJw",
  authDomain: "push-ff88e.firebaseapp.com",
  projectId: "push-ff88e",
  storageBucket: "push-ff88e.appspot.com",
  messagingSenderId: "865742759140",
  appId: "1:865742759140:web:b760238065e357ff75f8f1",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  showNotification(payload);
});

const showNotification = (payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
};

self.addEventListener("message", function (evt) {
  showNotification(evt.data);
});
