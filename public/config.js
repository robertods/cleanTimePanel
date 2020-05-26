const firebaseConfig = {
    apiKey: "AIzaSyAhoHFd-2Zquuz6pqmQXSKY82zzBFE4aEI",
    authDomain: "cleantime-a4954.firebaseapp.com",
    databaseURL: "https://cleantime-a4954.firebaseio.com",
    projectId: "cleantime-a4954",
    storageBucket: "cleantime-a4954.appspot.com",
    messagingSenderId: "102738100289",
    appId: "1:102738100289:web:568eee17c0cfd36bb2c6c0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.enablePersistence()
  .catch(err => console.warn('ERROR', err) );

