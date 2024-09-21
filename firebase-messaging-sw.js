importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

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
//const isSupported = firebase.messaging.isSupported();
//if (isSupported) {
    const messaging = firebase.messaging();
    //messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
     messaging.onBackgroundMessage((payload) => {
      console.log('BG Message'+JSON.stringify(payload))  
      //self.registration.showNotification(title, { body, icon: image || 'https://shashanknigam01.github.io/favicon.ico' });
    });
//}
