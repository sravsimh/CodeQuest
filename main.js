const firebaseConfig = {
    apiKey: "AIzaSyABBdpf71xtQ-wza5-exhOQ3kcODQxxFis",
    authDomain: "codequest-7ac27.firebaseapp.com",
    projectId: "codequest-7ac27",
    storageBucket: "codequest-7ac27.appspot.com",
    messagingSenderId: "344040899017",
    appId: "1:344040899017:web:a83aa934680f565a4c2818",
    measurementId: "G-KEHE7NSKM5"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });