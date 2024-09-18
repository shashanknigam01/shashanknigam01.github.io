importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app-compat.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyAqjqQRL7Tvsi4HzwJw-CHh6avJg6iPdUY",
  authDomain: "shashankproject2.firebaseapp.com",
  projectId: "shashankproject2",
  storageBucket: "shashankproject2.appspot.com",
  messagingSenderId: "729315975437",
  appId: "1:729315975437:web:d7d3c0acb10919f999d044"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
