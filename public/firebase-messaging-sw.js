importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCQpRXx3zNwG0E2GBeK3KbKpvT7brifAqY",
  authDomain: "fasta-rides-457315.firebaseapp.com",
  projectId: "fasta-rides-457315",
  storageBucket: "fasta-rides-457315.firebasestorage.app",
  messagingSenderId: "833886382257",
  appId: "1:833886382257:web:4823e7d0334a723695da90",
  measurementId: "G-B8TYEPE09Z"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
