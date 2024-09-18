 import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
 import {getMessaging} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js';
 
   const firebase = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebase);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = {
    messagingSenderId: "729315975437",
    apiKey: "AIzaSyAqjqQRL7Tvsi4HzwJw-CHh6avJg6iPdUY",
    projectId: "shashankproject2",
    appId: "1:729315975437:web:d7d3c0acb10919f999d044",
};

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

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
