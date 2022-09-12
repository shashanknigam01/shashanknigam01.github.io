// Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAqjqQRL7Tvsi4HzwJw-CHh6avJg6iPdUY",
    authDomain: "shashankproject2.firebaseapp.com",
    projectId: "shashankproject2",
    storageBucket: "shashankproject2.appspot.com",
    messagingSenderId: "729315975437",
    appId: "1:729315975437:web:a237bd79874fa3aa99d044"
  };

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebase);
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
	  getToken(messaging,{vapidKey: 'BEaPLept_8NFE5xEeteLi6yWWRWuVBED-sptqLGmBeoxNxxyThy7BB52u2FE6WT4mj28a5OgvKujDnSP6Fv4xzQ'}).then((currentToken) => {
      if (currentToken) {
	    console.log(currentToken);
      } else {
        // Show permission request.
        console.log('No registration token available. Request permission to generate one.');
        // Show permission UI.

      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
	 }
	});

messaging.onMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
